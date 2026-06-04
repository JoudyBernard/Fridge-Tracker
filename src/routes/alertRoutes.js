import {Router} from 'express'
import { AlertsRepository } from '../domain/repositories/AlertsRepository.js';
import { AlertsService } from '../services/AlertsService.js';
import { AlertsController } from '../controllers/AlertsController.js';

import{idParam, upsertAlerts} from '../validators/alertsValidator.js';

const repo = new AlertsRepository();
const service = new AlertsService(repo);
const controller = new AlertsController(service);

export const alertRoutes = Router();
//lists all alerts
alertRoutes.get('/', controller.list);
//list all alerts with product and user details
alertRoutes.get('/alerts-details', controller.getAllWithDetails);
//get a single alert by id(validated by idParam)
alertRoutes.get('/:id', idParam, controller.get);
//update an alert by id 
alertRoutes.put('/:id', [...idParam, upsertAlerts], controller.update);
//create a new alert (validated with upsertAlerts)
alertRoutes.post('/', upsertAlerts, controller.create);
//delete an alert by id (validated with idParam)
alertRoutes.delete('/:id', idParam, controller.delete);
