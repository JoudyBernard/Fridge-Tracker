import {Router} from 'express'
import { ProductsRepository } from '../domain/repositories/ProductsRepository.js';
import { ProductsService } from '../services/ProductsService.js';
import { ProductsController } from '../controllers/ProductsController.js';

import{idParam, upsertProducts} from '../validators/productsValidators.js';

const repo = new ProductsRepository();
const service = new ProductsService(repo);
const controller = new ProductsController(service);

export const productsRoutes = Router();
//lists all products
productsRoutes.get('/', controller.list);
//get a single product by id(validated by idParam)
productsRoutes.get('/:id', idParam, controller.get);
//update a product by id 
productsRoutes.put('/:id', [...idParam, upsertProducts], controller.update);
//create a new product (validated with upsertProducts)
productsRoutes.post('/', upsertProducts, controller.create);
//delete a product by id (validated with idParam)
productsRoutes.delete('/:id', idParam, controller.delete);
