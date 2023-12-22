import { TaskCreatedEvent } from '@services/tasks/domain/events/taskCreatedEvent';
import { TaskAuthor } from '@services/tasks/domain/valueObjects/taskAuthor';
import { TaskDescription } from '@services/tasks/domain/valueObjects/taskDescription';
import { TaskId } from '@services/tasks/domain/valueObjects/taskId';
import { TaskState } from '@services/tasks/domain/valueObjects/taskState';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';
import { UserId } from '@shared/domain/valueObjects/userId';

export type TaskProps = {
  taskId: TaskId;
  description: TaskDescription;
  state: TaskState;
  author: TaskAuthor;
  userId: UserId;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type TaskPrimitives = {
  taskId: string;
  description: string;
  state: number;
  author: string;
  userId: string;

  createdAt: string;
  updatedAt: string;
};

export class Task extends AggregateRoot {
  readonly taskId: TaskId;
  readonly description: TaskDescription;
  readonly state: TaskState;
  readonly author: TaskAuthor;
  readonly userId: UserId;

  private constructor(props: TaskProps) {
    super();

    this.taskId = props.taskId;
    this.description = props.description;
    this.state = props.state;
    this.author = props.author;
    this.userId = props.userId;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public static build(props: TaskProps): Task {
    return new Task(props);
  }

  public static create(props: TaskProps): Task {
    const task = new Task(props);
    const event = TaskCreatedEvent.build(task);
    task.pushEvent(event);
    return task;
  }

  public static fromPrimitives(props: TaskPrimitives): Task {
    return new Task({
      taskId: TaskId.fromString(props.taskId),
      description: TaskDescription.build(props.description),
      state: TaskState.build(props.state),
      author: TaskAuthor.build(props.author),
      userId: UserId.fromString(props.userId),

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public toPrimitives(): TaskPrimitives {
    return {
      taskId: this.taskId.toString(),
      description: this.description.value,
      state: this.state.value,
      author: this.author.value,
      userId: this.userId.toString(),

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
