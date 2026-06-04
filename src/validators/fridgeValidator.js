import {body, param} from 'express-validator';
/**
 * Validates the id route parameter.
 * Must be an integer greater than 0.
 * Error message: 'id must be an integer'.
 */
export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('id must be an integer')
];
//Validates the request body for creating or updating a fridge.
export const upsertFridge = [
    body('user_id').isInt({gt: 0}).withMessage('user id must be a positive integer.'),
    body('prod_id').isInt({gt: 0}).withMessage('product id must be a positive integer.'),
    body('quantity').isInt().withMessage('quantity must be a positive integer.'),
    body('restock_limit').isInt().withMessage('restock limit must be a positive integer.'),
]