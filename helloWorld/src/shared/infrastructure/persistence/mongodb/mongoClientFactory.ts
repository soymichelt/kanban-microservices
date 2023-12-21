import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { Db, MongoClient } from 'mongodb';
import { injectable } from 'tsyringe';

type MongoClientFactoryProps = {
  uri: string;
  databaseName: string;
};

@injectable()
export class MongoClientFactory {
  private static instance: MongoClientFactory;
  private static db: Db;

  private uri: string;
  private databaseName: string;

  constructor(props: MongoClientFactoryProps) {
    this.validateMongoClientProps(props);

    this.uri = props.uri;
    this.databaseName = props.databaseName;
  }

  public static build(props: MongoClientFactoryProps): MongoClientFactory {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new MongoClientFactory(props);
    return this.instance;
  }

  public async connect(): Promise<Db> {
    if (MongoClientFactory.db) {
      return MongoClientFactory.db;
    }

    const client = await MongoClient.connect(this.uri);
    MongoClientFactory.db = client.db(this.databaseName);
    return MongoClientFactory.db;
  }

  private validateMongoClientProps(props: MongoClientFactoryProps): void {
    if (!props.uri) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }
}
