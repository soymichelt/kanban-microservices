import { CategoryId } from '@services/categories/domain/valueObjects/categoryId';
import { CategoryName } from '@services/categories/domain/valueObjects/categoryName';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';

export type CategoryProps = {
  categoryId: CategoryId;
  name: CategoryName;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type CategoryPrimitives = {
  categoryId: string;
  name: string;

  createdAt: string;
  updatedAt: string;
};

export class Category extends AggregateRoot {
  readonly categoryId: CategoryId;
  readonly name: CategoryName;

  private constructor(props: CategoryProps) {
    super();

    this.categoryId = props.categoryId;
    this.name = props.name;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public static build(props: CategoryProps): Category {
    return new Category(props);
  }

  public static fromPrimitives(props: CategoryPrimitives): Category {
    return new Category({
      categoryId: CategoryId.fromString(props.categoryId),
      name: CategoryName.build(props.name),

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public toPrimitives(): CategoryPrimitives {
    return {
      categoryId: this.categoryId.toString(),
      name: this.name.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
