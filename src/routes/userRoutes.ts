import {UserController} from "../controller/UserController";
import {Router, Request, Response} from 'express';

const userController = new UserController();
const router: Router = Router();

router.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get('/users/id', (req: Request, res: Response) => userController.findUser(req, res));
router.post('/users', (req: Request, res: Response) => userController.createUser(req, res));

export default router;