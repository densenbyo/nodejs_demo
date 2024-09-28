"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const User_1 = require("./entity/User");
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to Database');
    app.get('/', (req, res) => {
        // Send a response to the client
        res.send('Hello, TypeScript + Node.js + Express!');
    });
    app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userRepository = connection.getRepository(User_1.User);
            const users = yield userRepository.find();
            res.json(users);
        }
        catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'Server error' });
        }
    }));
    app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        try {
            const userRepository = connection.getRepository(User_1.User);
            const user = userRepository.create({ username, password, email });
            const result = yield userRepository.save(user);
            res.json(result);
        }
        catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'Server error' });
        }
    }));
    // Start the server and listen on the specified port
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})).catch((error) => console.log('Error during connection: ', error));
