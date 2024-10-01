import {User} from "../entity/User";
import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async createUser(username: string, password: string, email: string):Promise<User> {
        const user:User = this.userRepository.create({
            username,
            password,
            email
        });
        return await this.userRepository.save(user);
    }

    public async findAllUsers():Promise<User[]> {
        return await this.userRepository.find({relations: ['todos']});
    }

    public async findUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(`User with id: ${userId} is not found`);
        }

        return user;
    }
}