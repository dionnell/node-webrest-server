import { Request, Response } from "express"


const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy butter', completedAt: null },
    { id: 3, text: 'Buy pan', completedAt: new Date() },
]

export class TodosControllers {

    constructor(){

    }

    public getTodos =  ( req: Request, res: Response ) =>{
        return res.json(todos)
    }

    public getTodosById = ( req: Request, res: Response ) => {

        const id = +req.params.id

        if ( isNaN(id) ) return res.status(400).json({error: `ID argument is not a number`})

        const Todo = todos.find( Todo => Todo.id === id );

        ( Todo )
            ? res.json(Todo)
            : res.status(404).json( {error: `Todo with id ${id} not found`} )
    
    }

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body
        if(!text) res.status(400).json({error: `Text property is required`} )

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }
        todos.push(newTodo)

        res.json( newTodo )

    }

    public updateTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id
        if ( isNaN(id) ) return res.status(400).json({error: `ID argument is not a number`})

        const todo = todos.find( todo => todo.id === id )
        if ( !todo ) return res.status(404).json({error: `Todo argument is not a number`})

        const { text, completedAt } = req.body

        todo.text = text || todo.text;

        ( completedAt === 'null' )
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt )


        res.json( todo )
    }


    public deleteTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) return res.status(404).json({error: `Todo argument is not a number`})

        todos.splice( todos.indexOf(todo), 1 )

        res.json(todo)

    }


}