import { envs } from '../src/config/envs'
import { Server } from '../src/presentation/server'


jest.mock('../src/presentation/server')


describe('Test en App.ts', () => {
    

    test('should work', async() => {

        await import ('../src/app')

        expect(Server).toHaveBeenCalledTimes(1)
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            public_path: envs.PUBLIC_PATH,
            routes: expect.any(Function)
        })

        
     })


})