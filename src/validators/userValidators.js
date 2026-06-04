import {body, param} from 'express-validator';
/**
 * Validates the id route parameter.
 * Must be an integer greater than 0.
 * Error message: 'user id must be an integer'.
 */
export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('user id must be an integer')
];
//Validates the request body for creating or updating a user.
export const upsertUser = [
    body('first_name').isString().isLength({min: 1, max: 255}).withMessage('first name must be a string between 1-255 characters'),
    body('last_name').isString().isLength({min: 1, max: 255}).withMessage('last name must be a string between 1-255 characters'),
    body('email').isEmail().isString().isLength({min: 1, max: 255}).withMessage('email must be a string between 1-255 characters'),
    body('city').isString().isLength({min: 1, max: 255}).withMessage('address must be a string between 1-255 characters'),
    body('password').isString().isLength({min: 1, max: 255}).withMessage('password must be a string between 1-255 characters'),
]