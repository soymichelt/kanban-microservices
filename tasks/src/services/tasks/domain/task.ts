import { TaskCreatedEvent } from '@services/tasks/domain/events/taskCreatedEvent';
import { TaskStateUpdatedEvent } from '@services/tasks/domain/events/taskStateUpdatedEvent';
import { TaskDescription } from '@services/tasks/domain/valueObjects/taskDescription';
import { TaskId } from '@services/tasks/domain/valueObjects/taskId';
import { TaskPriority, TaskPriorityEnum } from '@services/tasks/domain/valueObjects/taskPriority';
import { TaskState } from '@services/tasks/domain/valueObjects/taskState';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';
import { UserId } from '@shared/domain/valueObjects/userId';

export type TaskProps = {
  taskId: TaskId;
  description: TaskDescription;
  state: TaskState;
  userId: UserId;
  priority?: TaskPriority;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type TaskPrimitives = {
  taskId: string;
  description: string;
  state: number;
  userId: string;
  priority?: string;

  createdAt: string;
  updatedAt: string;
};

export class Task extends AggregateRoot {
  readonly taskId: TaskId;

  private _description: TaskDescription;
  private _userId: UserId;
  private _priority?: TaskPriority;
  private _state: TaskState;

  private constructor(props: TaskProps) {
    super();

    this.taskId = props.taskId;
    this._description = props.description;
    this._state = props.state;
    this._userId = props.userId;
    this._priority = props.priority ?? TaskPriority.low();

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get userId(): UserId {
    return this._userId;
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
      priority: props.priority ? TaskPriority.build(props.priority as TaskPriorityEnum) : undefined,

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public update(props: Partial<Omit<TaskProps, 'taskId' | 'createdAt' | 'updatedAt'>>): void {
    if (props.description) {
      this._description = props.description;
    }
    if (props.userId) {
      this._userId = props.userId;
    }
    if (props.priority) {
      this._priority = props.priority;
    }

    if (props.state) {
      this._state = props.state;
      const event = TaskStateUpdatedEvent.build(this);
      this.pushEvent(event);
    }

    this.updatedAt = DateValueObject.now();
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
      description: this._description.value,
      state: this._state.value,
      userId: this._userId.toString(),
      priority: this._priority?.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
