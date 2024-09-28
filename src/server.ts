// src/server.ts
import express, {Request, Response} from 'express';
import {User} from "./entity/User";
import {AppDataSource} from "./data-source";

const app = express();
const port = 3000;
app.use(express.json());

AppDataSource.initialize().then(async (connection) => {
    console.log('Connected to Database');

    app.get('/', (req:Request, res:Response) => {
        // Send a response to the client
        res.send('Hello, TypeScript + Node.js + Express!');
    });

    app.get('/users', async (req:Request, res:Response) => {
        try {
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            res.json(users);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({message: 'Server error'});
        }
    });

    app.post('/users', async (req:Request, res:Response) => {
        const { username, password, email } = req.body;
        try {
            const userRepository = connection.getRepository(User);
            const user:User = userRepository.create({username, password, email});
            const result:User = await userRepository.save(user);
            res.json(result);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({message: 'Server error'});
        }
    });

    // Start the server and listen on the specified port
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((error) => console.log('Error during connection: ', error));

