import { HealthCheckResponse } from '@services/ping/application/responses/healthCheckResponse';
import { GetHealthCheckRequest } from '@services/ping/application/useCases/getHealthCheckRequest';
import { UseCase } from '@shared/domain/useCases/useCase';
import { injectable } from 'tsyringe';

@injectable()
export class GetHealthCheckUseCase extends UseCase<GetHealthCheckRequest, HealthCheckResponse> {
  public async run(request: GetHealthCheckRequest): Promise<HealthCheckResponse> {
    const { requestId } = request;
    return { requestId };
  }
}
