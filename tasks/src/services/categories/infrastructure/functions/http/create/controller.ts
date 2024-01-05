import { CategoryResponse } from '@services/categories/application/responses/categoryResponse';
import { CreateCategoryRequest } from '@services/categories/application/useCases/update/createCategoryRequest';
import { CreateCategoryUseCase } from '@services/categories/application/useCases/update/createCategoryUseCase';
import { CategoryPrimitives } from '@services/categories/domain/category';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCategoryController extends BaseController<CreateCategoryRequest, CategoryResponse> {
  constructor(@inject('CreateCategoryUseCase') private useCase: CreateCategoryUseCase) {
    super();
  }

  public async run(request: CreateCategoryRequest): Promise<CategoryPrimitives> {
    const result = await this.useCase.run(request);
    return result;
  }
}
