import { HealthCheckResponse } from '@services/ping/application/responses/healthCheckResponse';
import { GetHealthCheckRequest } from '@services/ping/application/useCases/getHealthCheckRequest';
import { GetHealthCheckUseCase } from '@services/ping/application/useCases/getHealthCheckUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { Context } from 'aws-lambda';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetHealthCheckController extends BaseController<void, HealthCheckResponse> {
  constructor(@inject('GetHealthCheckUseCase') private useCase: GetHealthCheckUseCase) {
    super();
  }

  public async run(_: void, context: Context): Promise<HealthCheckResponse> {
    const request = { requestId: context.awsRequestId } as GetHealthCheckRequest;
    return await this.useCase.run(request);
  }
}
