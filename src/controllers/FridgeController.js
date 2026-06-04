import {validationResult} from 'express-validator'
export class FridgeController{
    constructor(fridgeService){
        //Initializes the controller with a service instance.
        this.fridgeService = fridgeService;
    }

    /**
     * Validates the incoming request using express-validator.
     * @returns null if valid or 404 with errors if validation fails
     */
      _validate(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        return null;
    }

    /**
     * Retrieves and returns a list of all fridges.
     * success response: 200 Ok with JSON array of fridges.
     */
     list = async (req, res, next) =>{
        try{
            res.json(await this.fridgeService.listFridges());
        }catch(e){
            next(e);
        }
    }


    /**
     * Retrieves a single fridge by its ID.
     * success response: 200 OK with fridge data
     * not found response: 404 with message
     * vaidation failure: 400 with errors
     */
     get = async (req, res, next) => {
        try{
            if(this._validate(req, res)){
                return;
            }
            const data = await this.fridgeService.getFridge(req.params.id);
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Creates a new fridge record.
     * success response: 201 Created 
     * vaidation failure: 400 with errors
     */
      create = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }
        const data = await this.fridgeService.createFridge(req.body);
        res.status(201).json(data);
        }catch(e){
            next(e);
        }
    }

    /**
     * Updates an existing fridge record.
     * success response: 201 Created 
     * not found response: 404 with message
     * vaidation failure: 400 with erros
     */
     update = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }

        const data = await this.fridgeService.updateFridge(req.params.id, req.body);
        if(!data){
            return res.status(404).json({message: 'No fridge found'});
        }
        res.status(201).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Deletes a fridge record by ID.
     * success response: 204 with deleted successfully
     * not found response: 404 with not found
     * vaidation failure: 400 with errors
     */
      delete = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
                return;
            }

            const ok = await this.fridgeService.deleteFridge(req.params.id);
            if(!ok){
                return res.status(404).json('Not found');
            }
            res.status(204).json("deleted successfully");

        }catch(e){
            next(e);
        }
    }

    /**
     * Retrieves all fridges along with their related details.
     * success response: 200 OK with detailed fridge data
     * not found response: 404 with message 
     * vaidation failure: 400 with errors
     */
     getAllWithDetails = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const data = await this.fridgeService.getFridgeWithDetails();
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)

        } catch (e) {
            next(e);
        }
    }
}