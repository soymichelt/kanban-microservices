import { CategoryResponse } from '@services/categories/application/responses/categoryResponse';
import { CreateCategoryRequest } from '@services/categories/application/useCases/update/createCategoryRequest';
import { Category } from '@services/categories/domain/category';
import { CategoryRepository } from '@services/categories/domain/repositories/categoryRepository';
import { CategoryId } from '@services/categories/domain/valueObjects/categoryId';
import { CategoryName } from '@services/categories/domain/valueObjects/categoryName';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCategoryUseCase extends UseCase<CreateCategoryRequest, CategoryResponse> {
  constructor(@inject('CategoryRepository') private repository: CategoryRepository) {
    super();
  }

  public async run(request: CreateCategoryRequest): Promise<CategoryResponse> {
    const name = CategoryName.build(request.name.trim());
    const categorySelected = await this.repository.findByName(name);
    if (categorySelected) {
      return;
    }

    const category = Category.build({
      categoryId: CategoryId.newId(),
      name,
    });

    await this.repository.update(category);

    return category.toPrimitives();
  }
}
