import {ToDoController} from "../controller/ToDoController";
import {Router, Request, Response} from 'express';

const todoController = new ToDoController();
const router: Router = Router();

router.get('/todo/active', (req: Request, res: Response) => todoController.findUsersActiveToDo(req, res));
router.get('/todo', (req: Request, res: Response) => todoController.findUsersToDo(req, res));
router.post('/todo', (req: Request, res: Response) => todoController.createToDo(req, res));
router.put('/todo', (req: Request, res: Response) => todoController.finishUsersToDo(req, res));

export default router;