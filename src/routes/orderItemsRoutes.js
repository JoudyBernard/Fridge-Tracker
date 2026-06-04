import {Router} from 'express'
import { OrderItemsRepository } from '../domain/repositories/OrderItemsRepository.js';
import { OrderItemsService } from '../services/OrderItemsService.js';
import { OrderItemsController } from '../controllers/OrderItemsController.js';

import{idParam, upsertOrderItems} from '../validators/orderItemsValidator.js';

const repo = new OrderItemsRepository();
const service = new OrderItemsService(repo);
const controller = new OrderItemsController(service);

export const orderItemsRoutes = Router();
//lists all orderItems
orderItemsRoutes.get('/', controller.list);
//list all orderItems with product and order details
orderItemsRoutes.get('/order-details', controller.getAllWithDetails);
//get a single oederItem by id(validated by idParam)
orderItemsRoutes.get('/:id', idParam, controller.get);
//update an orderItem by id 
orderItemsRoutes.put('/:id', [...idParam, upsertOrderItems], controller.update);
//create a new orderItem (validated with upsertOrderItems)
orderItemsRoutes.post('/', upsertOrderItems, controller.create);
//delete an orderItem by id (validated with idParam)
orderItemsRoutes.delete('/:id', idParam, controller.delete);