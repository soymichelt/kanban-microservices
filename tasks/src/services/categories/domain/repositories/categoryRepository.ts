import { Category } from '@services/categories/domain/category';
import { CategoryName } from '@services/categories/domain/valueObjects/categoryName';

export interface CategoryRepository {
  all(): Promise<Category[]>;
  findByName(name: CategoryName): Promise<Category>;
  update(category: Category): Promise<void>;
}
