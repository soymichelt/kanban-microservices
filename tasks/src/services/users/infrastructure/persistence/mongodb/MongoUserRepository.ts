/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { User } from '@services/users/domain/user';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { UserId } from '@shared/domain/valueObjects/userId';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const USER_COLLECTION = 'users';

@injectable()
export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  constructor() {
    super({ collectionName: USER_COLLECTION });
  }

  public async find(userId: UserId): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: userId.value });
    if (!document) return;

    return this.mapToUser(document);
  }

  public async findByIds(userIds: UserId[]): Promise<User[]> {
    const collection = await this.collection();
    const documents = await collection.find({ _id: { $in: userIds.map((userId) => userId.value) } }).toArray();
    if (!documents) return;

    return documents.map((document) => this.mapToUser(document));
  }

  public async findByUsername(username: UserName): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ username: username.value });
    if (!document) return;

    return this.mapToUser(document);
  }

  public async update(user: User): Promise<void> {
    await this.persist(user.userId, user);
  }

  public async delete(userId: UserId): Promise<void> {
    await super.delete(userId);
  }

  private mapToUser(document: any): User {
    return User.fromPrimitives({
      userId: document.userId,
      username: document.username,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
