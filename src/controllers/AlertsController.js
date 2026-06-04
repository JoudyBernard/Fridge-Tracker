import {validationResult} from 'express-validator'
export class AlertsController{
    constructor(alertsService){
        //Initializes the controller with a service instance.
        this.alertsService = alertsService;
    }

    /**
     * Validates incoming request data using express-validator.
     * @returns null if valid or sends 400 and an error message if validation fails.
     */
     _validate(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        return null;
    }

    /**
     * Handles the request to list all alerts.
     * if it is successful send 200 OK with JSON array of alerts.
     */
     list = async (req, res, next) =>{
        try{
           // res.json(await this.alertsService.listAlerts());
           const alerts= await this.alertsService.listAlerts();
           res.status(200).render("alerts/list", {alerts, errors: null});
        }catch(e){
            next(e);
        }
    }

    /**
     * Retrieves a single alert by ID.
     * success response: 200 OK with alert data.
     * not found response: 404 with message 
     * validation failure 400 with errors
     */
     get = async (req, res, next) => {
        try{
            if(this._validate(req, res)){
                return;
            }
            const data = await this.alertsService.getAlert(req.params.id);
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Creates a new alert record.
     * success response: 201 Created with created alert data.
     * validation failure: 400 with errors
     */
     create = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }
        const data = await this.alertsService.createAlert(req.body);
        res.status(201).json(data);
        }catch(e){
            next(e);
        }
    }

    /**
     * Updates an existing alert record.
     * success response: 201 Created with updated alert data.
     * not found response: 404 with message
     * validation failure: 400 with error
     */
    update = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }

        const data = await this.alertsService.updateAlert(req.params.id, req.body);
        if(!data){
            return res.status(404).json({message: 'No alert found'});
        }
        res.status(201).json(data)
        }catch(e){
            next(e);
        }
    }

    /**
     * Deletes an alert record by ID.
     * succes response: 204 with "deleted successfully".
     * not Found Response: 404 with 'Not found'.
     * validation Failure: 400 with errors
     */
    delete = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
                return;
            }

            const ok = await this.alertsService.deleteAlert(req.params.id);
            if(!ok){
                return res.status(404).json('Not found');
            }
            res.status(204).json("deleted successfully");

        }catch(e){
            next(e);
        }
    }

    /**
     * Retrieves all alerts with their associated details (joined data).
     * succes response: 200 OK with detailed alert data.
     * not Found Response:404 with message 
     * validation Failure: 400 with errors
     */
    getAllWithDetails = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const data = await this.alertsService.getAlertsWithDetails();
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)

        } catch (e) {
            next(e);
        }
    }


}