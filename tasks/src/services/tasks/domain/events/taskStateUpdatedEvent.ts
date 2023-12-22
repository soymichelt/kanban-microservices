import { Task } from '@services/tasks/domain/task';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type TaskStateUpdatedEventPrimitives = BaseEventPrimitivesProps & {
  taskId: string;
  description: string;
  state: number;
  author: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export class TaskStateUpdatedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'task.updated.state';

  private readonly task: Task;

  private constructor(user: Task) {
    super({
      aggregateId: user.taskId.toString(),
      eventType: TaskStateUpdatedEvent.EVENT_NAME,
    });

    this.task = user;
  }

  public static build(task: Task): TaskStateUpdatedEvent {
    return new TaskStateUpdatedEvent(task);
  }

  public toPrimitives(): TaskStateUpdatedEventPrimitives {
    const taskPrimitives = this.task.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      userId: taskPrimitives.userId,
      taskId: taskPrimitives.taskId,
      description: taskPrimitives.description,
      state: taskPrimitives.state,
      author: taskPrimitives.author,
      createdAt: taskPrimitives.createdAt,
      updatedAt: taskPrimitives.updatedAt,
    };
  }
}
