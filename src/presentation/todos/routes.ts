import { Router } from "express";
import { TodosControllers } from "./controllers";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router()
        const todoControllers = new TodosControllers()

        router.get('/:id', todoControllers.getTodosById)
        router.get('/', todoControllers.getTodos)

        router.post('/', todoControllers.createTodo)
        router.put('/:id', todoControllers.updateTodo)
        router.delete('/:id', todoControllers.deleteTodo)


        return router

    }


}