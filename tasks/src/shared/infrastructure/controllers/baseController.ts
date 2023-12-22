/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainException } from '@shared/domain/exceptions/baseException';
import { Logger } from '@shared/domain/loggers/logger';
import { ManagerRequestParsersController } from '@shared/infrastructure/controllers/managerRequestParsersController';
import { BaseResponseType } from '@shared/infrastructure/controllers/responses/baseResponseType';
import { Context } from 'aws-lambda';
import { container } from 'tsyringe';

export abstract class BaseController<RequestType, ResponseType> {
  protected logger: Logger;
  private managerRequestParser: ManagerRequestParsersController;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.managerRequestParser = container.resolve<ManagerRequestParsersController>('ManagerRequestParsersController');
  }

  public async execute(event: any, context: Context): Promise<BaseResponseType> {
    try {
      const request = this.parseEventToRequest(event, context);
      const result = await this.run(request, context, event);

      return this.generateSuccessResult(result);
    } catch (error) {
      return this.generateErrorResult(error);
    }
  }

  protected getSuccessStatusCode(response: ResponseType): number {
    if (!response) {
      return 204;
    }

    return 200;
  }

  protected generateSuccessResult(response: ResponseType): BaseResponseType {
    return {
      statusCode: this.getSuccessStatusCode(response),
      body: response ? JSON.stringify(response) : undefined,
    };
  }

  protected generateErrorResult(error: DomainException): BaseResponseType {
    this.logger.error({
      ...(error.toPrimitives ? error.toPrimitives() : error),
      stack: error.stack,
      message: error.message,
    });

    return {
      statusCode: error.status || 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }

  private parseEventToRequest(event: any, context: Context): RequestType {
    const parser = this.managerRequestParser.getParser(event, context);
    const request = parser.parseRequest<RequestType>(event, context);
    return request;
  }

  public abstract run(request: RequestType, context: Context, event: any): Promise<ResponseType>;
}
