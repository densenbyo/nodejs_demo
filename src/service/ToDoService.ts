import {Repository} from "typeorm";
import {ToDo} from "../entity/ToDo";
import {UserService} from "./UserService";
import {AppDataSource} from "../data-source";

export class ToDoService {
    private toDoRepository: Repository<ToDo>;
    private userService: UserService;

    constructor() {
        this.toDoRepository = AppDataSource.getRepository(ToDo);
        this.userService = UserService;
    }

    public async createToDo(userId: number, title: string, description: string):Promise<ToDo> {
        const user = await this.userService.findUserById(userId);
        const todo = this.toDoRepository.create({
            title,
            description,
            user
        });
        return await this.toDoRepository.save(todo);
    }
}