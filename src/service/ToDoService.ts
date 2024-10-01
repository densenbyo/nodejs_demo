import {Repository} from "typeorm";
import {ToDo} from "../entity/ToDo";
import {UserService} from "./UserService";
import {AppDataSource} from "../data-source";
import {User} from "../entity/User";

export class ToDoService {
    private toDoRepository: Repository<ToDo>;
    private userService: UserService;

    constructor() {
        this.toDoRepository = AppDataSource.getRepository(ToDo);
        this.userService = new UserService();
    }

    public async createToDo(userId: number, title: string, description: string): Promise<ToDo> {
        const user = await this.userService.findUserById(userId);
        const todo = this.toDoRepository.create({
            title,
            description,
            user
        });
        return await this.toDoRepository.save(todo);
    }

    public async findUsersToDo(userId: number): Promise<ToDo[]> {
        const foundUser = await this.userService.findUserById(userId);
        return  await this.toDoRepository.findBy({user: foundUser});
    }

    public async findUsersActiveToDo(userId: number): Promise<ToDo[]> {
        const foundUser = await this.userService.findUserById(userId);
        return  await this.toDoRepository.findBy({user: foundUser, finished: false});
    }

    public async findToDoById(todoId: number, user: User): Promise<ToDo> {
        const todo = await this.toDoRepository.findOneBy({ id: todoId, user: user });
        if (!todo) {
            throw new Error(`ToDo with id: ${todo} is not found`);
        }

        return todo;
    }

    public async finishUsersToDo(userId: number, todoId: number): Promise<ToDo> {
        const foundUser = await this.userService.findUserById(userId);
        const foundToDo = await this.findToDoById(todoId, foundUser);

        foundToDo.finished = true;
        return await this.toDoRepository.save(foundToDo);
    }
}