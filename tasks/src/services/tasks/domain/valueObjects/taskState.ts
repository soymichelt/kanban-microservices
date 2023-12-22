import { EnumValueObject } from '@shared/domain/valueObjects/enumValueObject';

export enum TaskStateEnum {
  todo = 0,
  workInProgress = 1,
  blocked = 2,
  qa = 3,
  done = 4,
}

const TASK_STATE_ENUM_VALUES = Object.values(TaskStateEnum).map((state) => Number(state));

export class TaskState extends EnumValueObject<TaskStateEnum> {
  public static build(value: TaskStateEnum): TaskState {
    return new TaskState(value, TASK_STATE_ENUM_VALUES);
  }

  public static todo(): TaskState {
    return new TaskState(TaskStateEnum.todo, TASK_STATE_ENUM_VALUES);
  }

  public static workInProgress(): TaskState {
    return new TaskState(TaskStateEnum.workInProgress, TASK_STATE_ENUM_VALUES);
  }

  public static blocked(): TaskState {
    return new TaskState(TaskStateEnum.blocked, TASK_STATE_ENUM_VALUES);
  }

  public static qa(): TaskState {
    return new TaskState(TaskStateEnum.qa, TASK_STATE_ENUM_VALUES);
  }

  public static done(): TaskState {
    return new TaskState(TaskStateEnum.done, TASK_STATE_ENUM_VALUES);
  }
}
