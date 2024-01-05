import { CategoryResponse } from '@services/categories/application/responses/categoryResponse';
import { CategoryRepository } from '@services/categories/domain/repositories/categoryRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllCategoriesUseCase extends UseCase<void, CategoryResponse[]> {
  constructor(@inject('CategoryRepository') private repository: CategoryRepository) {
    super();
  }

  public async run(): Promise<CategoryResponse[]> {
    const categories = await this.repository.all();

    return categories.map((category) => category.toPrimitives());
  }
}
