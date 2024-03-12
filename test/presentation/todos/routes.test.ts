import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'


describe('routes test', () => {
    
    beforeAll( async() => {
        await testServer.start()
    } )

    afterAll( () => {
        testServer.close()
    } )

    beforeEach( async() => {
        await prisma.todo.deleteMany()
    } )

    const todo1 = { text: 'hola mundo 1' }
    const todo2 = { text: 'hola mundo 2' }


    test('should return todos', async() => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        })

        const {body} = await request( testServer.app )
            .get('/api/todos')
            .expect(200)
        
        expect(body).toBeInstanceOf(Array)
        expect(body.length).toBe(2)
        expect(body[0].text).toBe( todo1.text )
        expect(body[1].text).toBe( todo2.text )

    })

    test('should return a todo api/todos/:id', async() => {
        
        const todo =  await prisma.todo.create({
            data: todo1
        })

        const {body} = await request( testServer.app )
            .get(`/api/todos/${todo.id}`)
            .expect(200)

        expect( body ).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt
        })

    })

    test('should return a 404 notfound api/todos/:id', async() => {
        
        const {body} = await request( testServer.app )
        .get(`/api/todos/999`)
        .expect(404)

        expect( body ).toEqual({
            error: 'Todo with id 999 not found'
        })
    })

    test('should return a new Todo api/todos/', async() => {
        
        const {body} = await request( testServer.app )
        .get(`/api/todos`)
        .send( todo1 )
        .expect(201)

        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })


    })

    test('should return a error if text not valid api/todos/', async() => {
        
        const {body} = await request( testServer.app )
        .get(`/api/todos`)
        .send( { } )
        .expect(400)

        expect( body ).toEqual({
            error: 'Text propety is required'
        })
        

    })

    test('should return an updated todo api/todos/', async() => {
        
        const todo = await prisma.todo.create({data: todo1})


        const {body} = await request( testServer.app )
        .put(`/api/todos/${todo.id}`)
        .send( {text: 'hola world', completedAt: '2024-03-01' } )
        .expect(200)

        expect( body ).toEqual({
            id: expect.any(Number),
            text: 'hola world', 
            completedAt: '2024-03-01T00:00:00.000Z'
        })
        
    })

    test('should return an updated todo only the date ', async() => {
         
        const todo = await prisma.todo.create({data: todo1})

        const {body} = await request( testServer.app )
        .put(`/api/todos/${todo.id}`)
        .send( {completedAt: '2024-03-01' } )
        .expect(200)

        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo1.text, 
            completedAt: '2024-03-01T00:00:00.000Z'
        })
        
    })

    test('should delete a todo api/todos/ ', async() => {
         
        const todo = await prisma.todo.create({data: todo1})

        const {body} = await request( testServer.app )
        .delete(`/api/todos/${todo.id}`)
        .expect(200)

        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo1.text, 
            completedAt: null
        })
        
    })


})