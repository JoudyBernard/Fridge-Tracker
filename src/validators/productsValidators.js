
import {body, param} from 'express-validator';
/**
 * Validates the id route parameter.
 * Must be an integer greater than 0.
 * Error message: 'id must be an integer'.
 */
export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('id must be an integer')
];
//Validates the request body for creating or updating a product.
export const upsertProducts = [
    body('prod_name').isString().isLength({min: 1, max: 255}).withMessage(' product name must be a string between 1-255 characters'),
    body('prod_price').isInt({gt: 0}).withMessage('product price must be a positive integer'),
]