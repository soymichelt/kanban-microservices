import { container } from '@di/shared';
import { GetAllCategoriesUseCase } from '@services/categories/application/useCases/all/getAllCategoriesUseCase';
import { CreateCategoryUseCase } from '@services/categories/application/useCases/update/createCategoryUseCase';
import { CategoryRepository } from '@services/categories/domain/repositories/categoryRepository';
import { GetAllCategoriesController } from '@services/categories/infrastructure/functions/http/all/controller';
import { CreateCategoryController } from '@services/categories/infrastructure/functions/http/create/controller';
import { MongoCategoryRepository } from '@services/categories/infrastructure/persistence/mongodb/mongoCategoryRepository';

container
  .register<CategoryRepository>('CategoryRepository', MongoCategoryRepository)
  .register<CreateCategoryUseCase>('CreateCategoryUseCase', CreateCategoryUseCase)
  .register<CreateCategoryController>('CreateCategoryController', CreateCategoryController)
  .register<GetAllCategoriesUseCase>('GetAllCategoriesUseCase', GetAllCategoriesUseCase)
  .register<GetAllCategoriesController>('GetAllCategoriesController', GetAllCategoriesController);

export { container };
