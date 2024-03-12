import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface GetTodoUseCases {
    execute(): Promise<TodoEntity[]>
}

export class GetTodo implements GetTodoUseCases {

    constructor(
        private readonly repository: TodoRepository,
    ){}

    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll()
    }

}