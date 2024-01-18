/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
import { Task } from '@services/tasks/domain/task';
import { TaskId } from '@services/tasks/domain/valueObjects/taskId';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const TASK_COLLECTION = 'tasks';

@injectable()
export class MongoTaskRepository extends MongoRepository<Task> implements TaskRepository {
  constructor() {
    super({ collectionName: TASK_COLLECTION });
  }

  public async all(): Promise<Task[]> {
    const collection = await this.collection();
    const documents = await collection.find({}).toArray();
    if (!documents || !documents.length) return [];

    return documents.map((document) => this.mapToTask(document));
  }

  public async find(taskId: TaskId): Promise<Task> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: taskId.value });
    if (!document) return;

    return this.mapToTask(document);
  }

  public async update(task: Task): Promise<void> {
    await this.persist(task.taskId, task);
  }

  public async delete(userId: TaskId): Promise<void> {
    await super.delete(userId);
  }

  private mapToTask(document: any): Task {
    return Task.fromPrimitives({
      taskId: document.taskId,
      description: document.description,
      state: Number(document.state),
      userId: document.userId,
      priority: document.priority,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
