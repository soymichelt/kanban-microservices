import { container } from '@di/shared';
import { CreateCategoryUseCase } from '@services/categories/application/useCases/update/createCategoryUseCase';
import { CategoryRepository } from '@services/categories/domain/repositories/categoryRepository';
import { CreateCategoryController } from '@services/categories/infrastructure/functions/http/create/controller';
import { MongoCategoryRepository } from '@services/categories/infrastructure/persistence/mongodb/mongoCategoryRepository';

container
  .register<CategoryRepository>('CategoryRepository', MongoCategoryRepository)
  .register<CreateCategoryUseCase>('CreateCategoryUseCase', CreateCategoryUseCase)
  .register<CreateCategoryController>('CreateCategoryController', CreateCategoryController);

export { container };
