import {Router} from 'express'
import { OrdersRepository } from '../domain/repositories/OrdersRepository.js';
import { OrdersService } from '../services/OrdersService.js';
import { OrdersController } from '../controllers/OrdersController.js';

import{idParam, upsertOrder} from '../validators/ordersValidator.js';


const repo = new OrdersRepository();
const service = new OrdersService(repo);
const controller = new OrdersController(service);

export const ordersRoutes = Router();

//lists all orders
ordersRoutes.get('/', controller.list);
//list all orders with product and user details
ordersRoutes.get('/order-details', controller.getAllWithDetails);
//get a single orders by id(validated by idParam)
ordersRoutes.get('/:id', idParam, controller.get);
//update an order by id 
ordersRoutes.put('/:id', [...idParam, upsertOrder], controller.update);
//create a new order (validated with upsertOrders)
ordersRoutes.post('/', upsertOrder, controller.create);
//delete an order by id (validated with idParam)
ordersRoutes.delete('/:id', idParam, controller.delete);

