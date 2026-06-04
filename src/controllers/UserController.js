import { validationResult } from "express-validator";   
export class UserController{
    constructor(userService){
        //Initializes the UserController with an instance of userService.
        this.userService = userService;
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
     * Retrieves and returns all users.
     * success response: 200 OK with JSON array of users.
    */
    list = async (req, res, next) =>{
        try{
            res.json(await this.userService.listUser());
        }catch(e){
            next(e);
        }
    }

     /**
     * Retrieves a single user by its ID.
     * success response: 200 OK with order data
     * not found response: 404 with message
     * vaidation failure: 400 with errors
     */
     get = async (req, res, next) => {
        try{
            if(this._validate(req, res)){
                return;
            }
            const data = await this.userService.getUser(req.params.id);
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Creates a new user.
     * success response: 201 created with created user data
     * vaidation failure: 400 with errors
     */
      create = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }
        const data = await this.userService.createUser(req.body);
        res.status(201).json(data);
        }catch(e){
            next(e);
        }
    }

    /**
     * Updates an existing user by ID.
     * success response: 201 created with updated user data
     * not found response: 404 with message
     * vaidation failure: 400 with errors
     */
    update = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }

        const data = await this.userService.updateUser(req.params.id, req.body);
        if(!data){
            return res.status(404).json({message: 'No data found'});
        }
        res.status(201).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Deletes a user by its ID.
     * success response: 204 with "deleted successfully"
     * not found response: 404 with 'Not found'
     * vaidation failure: 400 with errors
     */
      delete = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
                return;
            }

            const ok = await this.userService.deleteUser(req.params.id);
            if(!ok){
                return res.status(404).json('Not found');
            }
            
            res.status(204).send();

        }catch(e){
            next(e);
        }
    }

    
}