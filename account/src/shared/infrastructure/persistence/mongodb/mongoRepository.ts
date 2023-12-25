import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { Id } from '@shared/domain/valueObjects/id';
import { MongoClientFactory } from '@shared/infrastructure/persistence/mongodb/mongoClientFactory';
import { Collection } from 'mongodb';
import { container } from 'tsyringe';

export type MongoRepositoryProps = {
  collectionName: string;
};

export class MongoRepository<T extends AggregateRoot> {
  private readonly factory: MongoClientFactory;
  private readonly collectionName: string;

  constructor(props: MongoRepositoryProps) {
    this.factory = container.resolve<MongoClientFactory>('MongoClientFactory');
    this.collectionName = props.collectionName;
  }

  public async persist(id: Id, entity: T, collectionName?: string): Promise<void> {
    const collection = await this.collection(collectionName);
    const changes = entity.toPrimitives();

    await collection.updateOne(
      { _id: id.value },
      {
        $set: {
          ...changes,
          _id: id.value,
          id: undefined,
        },
      },
      { upsert: true },
    );
  }

  public async delete(id: Id, collectionName?: string): Promise<void> {
    const collection = await this.collection(collectionName);

    await collection.deleteOne({ _id: id.value });
  }

  protected async collection(name?: string): Promise<Collection> {
    const db = await this.factory.connect();
    const collection = db.collection(name ?? this.collectionName);
    return collection;
  }
}
