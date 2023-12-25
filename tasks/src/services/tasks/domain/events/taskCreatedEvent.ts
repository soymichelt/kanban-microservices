import { Task } from '@services/tasks/domain/task';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type TaskCreatedEventPrimitives = BaseEventPrimitivesProps & {
  taskId: string;
  description: string;
  state: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export class TaskCreatedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'task.created';

  private readonly task: Task;

  private constructor(user: Task) {
    super({
      aggregateId: user.taskId.toString(),
      eventType: TaskCreatedEvent.EVENT_NAME,
    });

    this.task = user;
  }

  public static build(task: Task): TaskCreatedEvent {
    return new TaskCreatedEvent(task);
  }

  public toPrimitives(): TaskCreatedEventPrimitives {
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
      createdAt: taskPrimitives.createdAt,
      updatedAt: taskPrimitives.updatedAt,
    };
  }
}
