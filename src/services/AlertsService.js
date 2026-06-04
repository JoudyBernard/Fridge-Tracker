import{AlertDTO }from "../domain/dto/AlertDTO.js";
import {AlertsWithDetailsDTO} from "../domain/dto/AlertsWithDetailsDTO.js";

export class AlertsService{
    constructor(alertsRepository){
        //Initialize the AlertsService with a repository that handles data access.
        this.alertsRepository = alertsRepository;
    }

    /**
     * Retrieves a list of all alerts.
     * Fetches all alerts from the repository and maps them to AlertDTO objects.
     * @returns a list of alerts or throws an error if fetching alerts fails
     */
    async listAlerts(){
        try {
            const alerts = await this.alertsRepository.findAll();
            return alerts.map(alerts => AlertDTO.fromEntity(alerts));
        } catch (error) {
            throw new Error(`Failed to list alerts: ${error.message}`);
        }
    }

    /**
     * Retrieves a specific alert by its ID.
     * Validates the alert ID and returns the corresponding alert data as an AlertDTO.
     * @returns the alert if found or null if not found.
     * throws an error if the id is invalid or fetching fails.
     */
     async getAlert(alert_id){
        try {
            if (!alert_id || isNaN(alert_id)) {
                throw new Error('Invalid alert ID');
            }
            const alerts = await this.alertsRepository.findById(alert_id);
            if (!alerts) {
                return null;
            }
            return AlertDTO.fromEntity(alerts);
        } catch (error) {
            throw new Error(`Failed to get alert: ${error.message}`);
        }
    }

    /**
     *  Creates a new alert.
     * Sends the alert data to the repository and returns the created alert as an AlertDTO.
     * @returns the newly created alert.
     * throws an error if creating the alert fails.
     */
    async createAlert(data){
        try {
            const alerts = await this.alertsRepository.create(data);
            return AlertDTO.fromEntity(alerts);
        } catch (error) {
            throw new Error(`Failed to create alert: ${error.message}`);
        }
    }

    /**
     * Updates an existing alert by ID.
     * Validates the ID and data, then updates the alert in the repository.
     * @returns the updated alert as an AlertDTO or null if not found.
     * throws an error if validation or update fails.
     */
    async updateAlert(alert_id, data){
        try {
            if (!alert_id || isNaN(alert_id)) {
                throw new Error('Invalid alert ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const alerts = await this.alertsRepository.update(alert_id, data);
            return alerts ? AlertDTO.fromEntity(alerts) : null;
        } catch (error) {
            throw new Error(`Failed to update alert: ${error.message}`);
        }
    }

    /**
     * Deletes an alert by ID.
     * Validates the alert ID and removes it from the repository.
     * @returns true if deletion was successful, false otherwise.
     * throws an error if deletion fails or ID is invalid.
     */
    async deleteAlert(alert_id){
        try {
            if (!alert_id || isNaN(alert_id)) {
                throw new Error('Invalid alert ID');
            }
            const result = await this.alertsRepository.delete(alert_id);
            return result;
        } catch (error) {
            throw new Error(`Failed to delete alert: ${error.message}`);
        }
    }

    /**
     * Retrieves all alerts along with their related details.
     * Combines data from multiple sources in the repository.
     * @returns list of alerts with details or null if none found.
     * throws an error if fetching data fails.
     */
    async getAlertWithDetails(){
        try{
            const alertsWithDetailsDTO = await this.alertsRepository.findAllWithDetails();
            return alertsWithDetailsDTO ? alertsWithDetailsDTO : null;
        }catch(e){
            throw new Error('Failed to load data');
        }
    }

    /**
     * Retrieves all alerts and converts them into AlertsWithDetailsDTO objects.
     * A simplified version of getAlertWithDetails.
     * @returns list of alerts with details.
     */
     async getAllAlerts() {
        const rows = await this.alertsRepository.findAllAlerts();
        return rows.map(r=> new AlertsWithDetailsDTO(r));
    }
}