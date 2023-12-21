/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { User } from '@services/users/domain/user';
import { UserEmail } from '@services/users/domain/valueObjects/userEmail';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { Id } from '@shared/domain/valueObjects/id';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const USER_COLLECTION = 'users';

@injectable()
export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  constructor() {
    super({ collectionName: USER_COLLECTION });
  }

  public async all(): Promise<User[]> {
    const collection = await this.collection();
    const documents = await collection.find({}).toArray();
    if (!documents || !documents.length) return [];

    return documents.map((document) => this.mapToUser(document));
  }

  public async find(userId: Id): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: userId.value });
    if (!document) return;

    return this.mapToUser(document);
  }

  public async findByEmail(email: UserEmail): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ email: email.value });
    if (!document) return;

    return this.mapToUser(document);
  }

  public async findByUsername(username: UserName): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ username: username.value });
    if (!document) return;

    return this.mapToUser(document);
  }

  public async delete(userId: Id): Promise<void> {
    await super.delete(userId);
  }

  public async update(user: User): Promise<void> {
    await this.persist(user.userId, user);
  }

  private mapToUser(document: any): User {
    return User.fromPrimitives({
      userId: document.userId,
      username: document.username,
      email: document.email,
      password: document.password,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
