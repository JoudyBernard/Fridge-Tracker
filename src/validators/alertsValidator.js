
import {body, param} from 'express-validator';
/**
 * Validates the id route parameter.
 * Must be an integer greater than 0.
 * Error message: 'alert id must be an integer'.
 */
export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('alert id must be an integer')
];
//Validates the request body for creating or updating an alert.
export const upsertAlerts = [
    body('f_id').isInt({gt: 0}).withMessage('fridge id must be a positive integer.'),
    body('user_id').isInt({gt: 0}).withMessage('user id must be a positive integer.'),
    body('description').isString().isLength({min: 1, max: 255}).withMessage('description must be a string between 1-255 characters'),
    body('date').isDate().withMessage('date must be a valid date'),
]