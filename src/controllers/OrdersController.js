import {validationResult} from 'express-validator'
export class OrdersController{
    constructor(ordersService){
        //Initializes the OrdersController with an instance of ordersService.
        this.ordersService = ordersService;
    }


    /**
     * Validates incoming request data using express-validator.
     * @returns null if valid or 400 with errors if validation fails
     */
    _validate(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        return null;
    }

/**
 * Retrieves and returns all orders.
 * success response: 200 OK with JSON array of orders
 */
     list = async (req, res, next) =>{
        try{
            res.json(await this.ordersService.listOrders());
        }catch(e){
            next(e);
        }
    }

    /**
     * Retrieves a single order by its ID.
     * success response: 200 OK with order data
     * not found response: 404 with message
     * vaidation failure: 400 with errors
     */
     get = async (req, res, next) => {
        try{
            if(this._validate(req, res)){
                return;
            }
            const data = await this.ordersService.getOrder(req.params.id);
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Creates a new order.
     * success response: 201 created with created order data
     * vaidation failure: 400 with errors
     */
     create = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }
        const data = await this.ordersService.createOrder(req.body);
        res.status(201).json(data);
        }catch(e){
            next(e);
        }
    }

    /**
     * Updates an existing order by ID.
     * success response: 201 created with updated order data
     * not found response: 404 with message
     * vaidation failure: 400 with errors
     */
     update = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }

        const data = await this.ordersService.updateOrder(req.params.id, req.body);
        if(!data){
            return res.status(404).json({message: 'No order found'});
        }
        res.status(201).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Deletes an order by its ID.
     * success response: 204 with "deleted successfully"
     * not found response: 404 with 'Not found'
     * vaidation failure: 400 with errors
     */
      delete = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
                return;
            }

            const ok = await this.ordersService.deleteOrder(req.params.id);
            if(!ok){
                return res.status(404).json('Not found');
            }
            res.status(204).json("deleted successfully");

        }catch(e){
            next(e);
        }
    }

    /**
     * Retrieves all orders along with details.
     * success response: 200 OK with detailed order data
     * not found response: 404 with message 
     * vaidation failure: 400 with errors
     */
    getAllWithDetails = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const data = await this.ordersService.getOrderWithDetails();
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)

        } catch (e) {
            next(e);
        }
    }
     

}