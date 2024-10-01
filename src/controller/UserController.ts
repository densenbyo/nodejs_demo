import {UserService} from "../service/UserService";
import e, {Response, Request} from 'express';
import {User} from "../entity/User";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error during user get all users.', error);
            res.status(500).json({message: 'Server error'});
        }
    }

    public async findUser(req: Request, res: Response): Promise<void> {
        const {userId} = req.body;
        try {
            const user = await this.userService.findUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            console.error(`Error during get user by id: ${userId}.`, error);
            res.status(500).json({message: 'Server error'});
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const {username, password, email} = req.body;
        try {
            const user:User = await this.userService.createUser(username, password, email);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error during user creation.', error);
            res.status(500).json({message: 'Server error'});
        }
    }
}