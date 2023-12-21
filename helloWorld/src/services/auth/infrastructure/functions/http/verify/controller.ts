/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerifyIfAuthorizedUseCase } from '@services/auth/application/useCases/verify/verifyIfAuthorizedUseCase';
import { UserRoleVerificationTypeEnum } from '@services/auth/domain/valueObjects/userRoleVerification';
import { DomainException } from '@shared/domain/exceptions/baseException';
import { UnauthorizedException } from '@shared/domain/exceptions/unauthorizedException';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { BaseResponseType } from '@shared/infrastructure/controllers/responses/baseResponseType';
import { Context } from 'aws-lambda';
import { inject, injectable } from 'tsyringe';

type VerifyIfAuthorizedControllerRequest = {
  routeArn: string;
  headers: {
    'x-user-id': string;
    'x-auth-token': string;
  };
};

type Statement = {
  Action: string;
  Effect: string;
  Resource: string;
};

type PolicyDocument = {
  Version: string;
  Statement: Statement[];
};

type AuthorizerLambdaIamResponse = {
  principalId?: string;
  policyDocument?: PolicyDocument;
  context?: Record<string, string | number | boolean>;
};

@injectable()
export class VerifyIfAuthorizedController extends BaseController<
  VerifyIfAuthorizedControllerRequest,
  AuthorizerLambdaIamResponse
> {
  constructor(@inject('VerifyIfAuthorizedUseCase') private useCase: VerifyIfAuthorizedUseCase) {
    super();
  }

  public async run(
    request: VerifyIfAuthorizedControllerRequest,
    context: Context,
  ): Promise<AuthorizerLambdaIamResponse> {
    const { 'x-user-id': userId, 'x-auth-token': token } = request.headers;
    const response = await this.useCase.run({
      userId,
      token,
      role: context.functionName,
    });

    if (response.verificationType === UserRoleVerificationTypeEnum.unauthorized) {
      throw new UnauthorizedException(userId);
    }

    return this.generatePolicyDocument(userId, response.verificationType, request.routeArn, response.auth);
  }

  protected override generateSuccessResult(response: AuthorizerLambdaIamResponse): BaseResponseType {
    this.logger.info({
      message: 'generateSuccessResult >>>> ',
      response,
    });

    return response;
  }

  protected override generateErrorResult(error: DomainException): BaseResponseType {
    this.logger.error({
      ...(error.toPrimitives ? error.toPrimitives() : error),
      stack: error.stack,
      message: error.message,
    });

    return {
      statusCode: 401,
      body: 'Unauthorized',
    };
  }

  private generatePolicyDocument(
    principalId: string,
    effect: string,
    resource: string,
    context: Record<string, any> = {},
  ): AuthorizerLambdaIamResponse {
    const response: AuthorizerLambdaIamResponse = {
      principalId,
      context,
    };

    if (effect && resource) {
      response.policyDocument = {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource,
          },
        ],
      };
    }

    return response;
  }
}
