import {validationResult} from 'express-validator'
export class OrderItemsController{
    constructor(orderItemsService){
        //Initializes the controller with a service instance.
        this.orderItemsService = orderItemsService;
    }

    /**
     * Validates incoming request data using express-validator.
     * @returns null if valid or 400 with errors ifvalidation fails
     */
     _validate(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        return null;
    }

    /**
     * Retrieves and returns all order items.
     * success response: 200 OK with JSON array of order items
     */
    list = async (req, res, next) =>{
        try{
            res.json(await this.orderItemsService.listOrderItems());
        }catch(e){
            next(e);
        }
    }

    /**
     * Retrieves a single order item by its ID.
     * success response: 200 OK with order item data
     * not found response: 404 with message
     * vaidation failure: 400 with errors
     */
       get = async (req, res, next) => {
        try{
            if(this._validate(req, res)){
                return;
            }
            const data = await this.orderItemsService.getOrderItems(req.params.id);
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Creates a new order item.
     * success response: 201 created with created order item data
     * vaidation failure: 400 with errors
     */
     create = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }
        const data = await this.orderItemsService.createOrderItems(req.body);
        res.status(201).json(data);
        }catch(e){
            next(e);
        }
    }

    /**
     * Updates an existing order item by ID.
     * success response: 201 created with updated order item data
     * not found response: 404 with message
     * vaidation failure: 400 with errors
     */
     update = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }

        const data = await this.orderItemsService.updateOrderItems(req.params.id, req.body);
        if(!data){
            return res.status(404).json({message: 'No order items found'});
        }
        res.status(201).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Deletes an order item by its ID.
     * success response: 204 with "deleted successfully"
     * not found response: 404 with 'Not found'
     * vaidation failure: 400 with errors
     */
    delete = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
                return;
            }

            const ok = await this.orderItemsService.deleteOrderItems(req.params.id);
            if(!ok){
                return res.status(404).json('Not found');
            }
            res.status(204).json("deleted successfully");

        }catch(e){
            next(e);
        }
    }

    /**
     * Retrieves all order items along with their related details.
     * success response: 200 OK with detailed order item data
     * not found response: 404 ith message 
     * vaidation failure: 400 with erros
     */
    getAllWithDetails = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const data = await this.orderItemsService.getOrderItemsWithDetails();
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)

        } catch (e) {
            next(e);
        }
    }
}