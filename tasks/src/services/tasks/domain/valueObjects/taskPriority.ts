import { EnumValueObject } from '@shared/domain/valueObjects/enumValueObject';

export enum TaskPriorityEnum {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

const TASK_PRIORITY_ENUM_VALUES = Object.values(TaskPriorityEnum);

export class TaskPriority extends EnumValueObject<TaskPriorityEnum> {
  public static build(value: TaskPriorityEnum): TaskPriority {
    return new TaskPriority(value, TASK_PRIORITY_ENUM_VALUES);
  }

  public static low(): TaskPriority {
    return new TaskPriority(TaskPriorityEnum.low, TASK_PRIORITY_ENUM_VALUES);
  }

  public static medium(): TaskPriority {
    return new TaskPriority(TaskPriorityEnum.medium, TASK_PRIORITY_ENUM_VALUES);
  }

  public static high(): TaskPriority {
    return new TaskPriority(TaskPriorityEnum.high, TASK_PRIORITY_ENUM_VALUES);
  }
}
