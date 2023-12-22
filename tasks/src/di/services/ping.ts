import { container } from '@di/shared';
import { GetHealthCheckUseCase } from '@services/ping/application/useCases/getHealthCheckUseCase';
import { GetHealthCheckController } from '@services/ping/infrastructure/functions/http/get/controller';

container
  .register<GetHealthCheckController>('GetHealthCheckController', GetHealthCheckController)
  .register<GetHealthCheckUseCase>('GetHealthCheckUseCase', GetHealthCheckUseCase);

export { container };
