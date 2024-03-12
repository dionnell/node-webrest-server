import { Router } from "express";
import { TodosControllers } from "./controllers";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router()
        const datasource = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImpl( datasource )

        const todoControllers = new TodosControllers( todoRepository )

        router.get('/:id', todoControllers.getTodosById)
        router.get('/', todoControllers.getTodos)

        router.post('/', todoControllers.createTodo)
        router.put('/:id', todoControllers.updateTodo)
        router.delete('/:id', todoControllers.deleteTodo)


        return router

    }


}