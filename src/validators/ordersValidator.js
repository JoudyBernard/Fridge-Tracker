
import {body, param} from 'express-validator';
/**
 * Validates the id route parameter.
 * Must be an integer greater than 0.
 * Error message: 'order number must be an integer'.
 */
export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('order number must be an integer')
];
//Validates the request body for creating or updating an order.
export const upsertOrder = [
    body('user_id').isInt({gt: 0}).withMessage('customer id must be a positive integer.'),
    body('status').isString().withMessage('status must be a string.'),
    body('date').isDate().withMessage('date must be a valid date.'),
]