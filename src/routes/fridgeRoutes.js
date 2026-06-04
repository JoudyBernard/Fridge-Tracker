import {Router} from 'express'
import { FridgeRepository } from '../domain/repositories/FridgeRepository.js';
import { FridgeService } from '../services/FridgeService.js';
import { FridgeController } from '../controllers/FridgeController.js';

import{idParam, upsertFridge} from '../validators/fridgeValidator.js';

const repo = new FridgeRepository();
const service = new FridgeService(repo);
const controller = new FridgeController(service);

export const fridgeRoutes = Router();
//lists all fridges
fridgeRoutes.get('/', controller.list);
//list all fridges with product and user details
fridgeRoutes.get('/fridge-details', controller.getAllWithDetails);
//get a single fridge by id(validated by idParam)
fridgeRoutes.get('/:id', idParam, controller.get);
//update an fridge by id
fridgeRoutes.put('/:id', [...idParam, upsertFridge], controller.update);
//create a new fridge (validated with upsertFridge)
fridgeRoutes.post('/', upsertFridge, controller.create);
//delete a fridge by id (validated with idParam)
fridgeRoutes.delete('/:id', idParam, controller.delete);