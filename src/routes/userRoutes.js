import {Router} from 'express';
import {UserRepository} from '../domain/repositories/UserRepository.js';
import { UserService} from '../services/UserService.js';
import { UserController} from '../controllers/UserController.js';
import { idParam, upsertUser } from '../validators/userValidators.js';


const repo = new UserRepository();
const service = new UserService(repo);
const controller = new UserController(service);

export const userRoutes = Router();
//lists all users
userRoutes.get('/', controller.list);
//get a single user by id(validated by idParam)
userRoutes.get('/:id', idParam, controller.get);
//update a user by id 
userRoutes.put('/:id', [...idParam, upsertUser], controller.update);
//create a new user (validated with upsertUser)
userRoutes.post('/', upsertUser, controller.create);
//delete a user by id (validated with idParam)
userRoutes.delete('/:id', idParam, controller.delete);