import { UserTaskResponse } from '@services/tasks/application/responses/userTaskResponse';
import { TaskRepository } from '@services/tasks/domain/repositories/taskRepository';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AllTasksUseCase extends UseCase<void, UserTaskResponse[]> {
  constructor(
    @inject('TaskRepository') private repository: TaskRepository,
    @inject('UserRepository') private userRepository: UserRepository,
  ) {
    super();
  }

  public async run(): Promise<UserTaskResponse[]> {
    const tasks = await this.repository.all();
    if (tasks.length) {
      return [];
    }

    const usersForTasks = tasks.map(({ userId }) => userId);
    const users = await this.userRepository.findByIds(usersForTasks);

    return tasks.map((task) => {
      const user = users.find(({ userId }) => userId.equals(task.userId));
      return {
        ...task.toPrimitives(),
        username: user?.username.value,
      };
    });
  }
}
