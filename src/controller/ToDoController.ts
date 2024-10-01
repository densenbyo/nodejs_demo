import {Request, Response} from "express";
import {ToDoService} from "../service/ToDoService";
import {ToDo} from "../entity/ToDo";

export class ToDoController {
    private todoService: ToDoService;

    constructor() {
        this.todoService = new ToDoService();
    }

    public async findUsersToDo(req: Request, res: Response): Promise<void> {
        const {userId} = req.body;
        try {
            const todos = await this.todoService.findUsersToDo(userId);
            res.status(200).json(todos);
        } catch (error) {
            console.error(`Error during get todos for user id: ${userId}.`, error);
            res.status(500).json({message: 'Server error'});
        }
    }

    public async findUsersActiveToDo(req: Request, res: Response): Promise<void> {
        const {userId} = req.body;
        try {
            const todos = await this.todoService.findUsersActiveToDo(userId);
            res.status(200).json(todos);
        } catch (error) {
            console.error(`Error during get active todos for user id: ${userId}.`, error);
            res.status(500).json({message: 'Server error'});
        }
    }

    public async createToDo(req: Request, res: Response): Promise<void> {
        const {title, description, userId} = req.body;
        try {
            const todo:ToDo = await this.todoService.createToDo(userId, title, description);
            res.status(200).json(todo);
        } catch (error) {
            console.error('Error during todo creation.', error);
            res.status(500).json({message: 'Server error'});
        }
    }

    public async finishUsersToDo(req: Request, res: Response): Promise<void> {
        const {userId, todoId} = req.body;
        try {
            const todo:ToDo = await this.todoService.finishUsersToDo(userId, todoId);
            res.status(200).json(todo);
        } catch (error) {
            console.error('Error during todo finishing.', error);
            res.status(500).json({message: 'Server error'});
        }
    }
}