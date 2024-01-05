import { CategoryResponse } from '@services/categories/application/responses/categoryResponse';
import { GetAllCategoriesUseCase } from '@services/categories/application/useCases/all/getAllCategoriesUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllCategoriesController extends BaseController<void, CategoryResponse[]> {
  constructor(@inject('GetAllCategoriesUseCase') private useCase: GetAllCategoriesUseCase) {
    super();
  }

  public async run(): Promise<CategoryResponse[]> {
    const result = await this.useCase.run();
    return result;
  }
}
