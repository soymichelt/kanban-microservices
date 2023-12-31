import { TaskCreatedEvent } from '@services/tasks/domain/events/taskCreatedEvent';
import { TaskStateUpdatedEvent } from '@services/tasks/domain/events/taskStateUpdatedEvent';
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
  userId: UserId;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type TaskPrimitives = {
  taskId: string;
  description: string;
  state: number;
  userId: string;

  createdAt: string;
  updatedAt: string;
};

export class Task extends AggregateRoot {
  readonly taskId: TaskId;
  readonly description: TaskDescription;
  readonly userId: UserId;

  private _state: TaskState;

  private constructor(props: TaskProps) {
    super();

    this.taskId = props.taskId;
    this.description = props.description;
    this._state = props.state;
    this.userId = props.userId;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get state(): TaskState {
    return this._state;
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
      userId: UserId.fromString(props.userId),

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public updateState(state: TaskState): void {
    this._state = state;
    this.updatedAt = DateValueObject.now();

    const event = TaskStateUpdatedEvent.build(this);
    this.pushEvent(event);
  }

  public toPrimitives(): TaskPrimitives {
    return {
      taskId: this.taskId.toString(),
      description: this.description.value,
      state: this._state.value,
      userId: this.userId.toString(),

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
