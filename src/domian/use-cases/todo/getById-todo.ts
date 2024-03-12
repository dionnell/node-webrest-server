import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface GetByIdTodoUseCases {
    execute(id: number ): Promise<TodoEntity>
}

export class GetById implements GetByIdTodoUseCases {

    constructor(
        private readonly repository: TodoRepository,
    ){}

    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id)
    }

}