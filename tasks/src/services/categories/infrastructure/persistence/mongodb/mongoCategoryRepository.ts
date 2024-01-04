/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '@services/categories/domain/category';
import { CategoryRepository } from '@services/categories/domain/repositories/categoryRepository';
import { CategoryName } from '@services/categories/domain/valueObjects/categoryName';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const CATEGORY_COLLECTION = 'categories';

@injectable()
export class MongoCategoryRepository extends MongoRepository<Category> implements CategoryRepository {
  constructor() {
    super({ collectionName: CATEGORY_COLLECTION });
  }

  public async all(): Promise<Category[]> {
    const collection = await this.collection();
    const documents = await collection.find({}).toArray();
    if (!documents || !documents.length) return [];

    return documents.map((document) => this.mapToCategory(document));
  }

  public async findByName(name: CategoryName): Promise<Category> {
    const collection = await this.collection();
    const document = await collection.findOne({ name: name.value });
    if (!document) return;

    return this.mapToCategory(document);
  }

  public async update(category: Category): Promise<void> {
    await this.persist(category.categoryId, category);
  }

  private mapToCategory(document: any): Category {
    return Category.fromPrimitives({
      categoryId: document.categoryId,
      name: document.name,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
