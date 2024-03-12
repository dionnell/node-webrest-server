import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domian/dtos"
import { CreateTodo, CustomError, DeleteTodo, GetById, GetTodo, TodoRepository, UpdateTodo } from "../../domian"



export class TodosControllers {

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    private handleError = (res: Response, error: unknown) => {
        if( error instanceof CustomError ){
            res.status(error.statusCode).json({error: error.message})
            return
        }
        
        res.status(500).json({error: 'Internal Server Error'})

    }


    public getTodos =  ( req: Request, res: Response ) =>{
        new GetTodo( this.todoRepository )
            .execute()
            .then( todos => res.json(todos) )
            .catch( error => this.handleError(res, error) )
    }

    public getTodosById = ( req: Request, res: Response ) => {

        const id = +req.params.id

        new GetById( this.todoRepository )
            .execute( id )
            .then( todos => res.json(todos) )
            .catch( error => this.handleError(res, error) )

    }

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if( error ) res.status(400).json({error} )

        new CreateTodo( this.todoRepository )
            .execute( createTodoDto! )
            .then( todos => res.status(201).json(todos) )
            .catch( error => this.handleError(res, error) )
    }

    public updateTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id
        const [ error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id})
        if ( error ) return res.status(400).json({error})

        new UpdateTodo( this.todoRepository )
            .execute( updateTodoDto! )
            .then( todos => res.json(todos) )
            .catch( error => this.handleError(res, error) )
        
    }


    public deleteTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id

        new DeleteTodo( this.todoRepository )
            .execute( id )
            .then( todos => res.json(todos) )
            .catch( error => res.status(400).json({error}) )        

    }


}