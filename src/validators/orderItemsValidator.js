import {body, param} from 'express-validator';
/**
 * Validates the id route parameter.
 * Must be an integer greater than 0.
 * Error message: 'cart id must be an integer'.
 */
export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('cart id must be an integer')
];
//Validates the request body for creating or updating an order item.
export const upsertOrderItems = [
    body('order_no').isInt({gt: 0}).withMessage('order number must be a positive integer.'),
    body('prod_id').isInt({gt: 0}).withMessage('product id must be a positive integer.'),
    body('quantity').isInt().withMessage('quantity id must be a positive integer.'),
]