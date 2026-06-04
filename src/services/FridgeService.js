import {FridgeDTO} from '../domain/dto/FridgeDTO.js';
import {FridgeWithDetailsDTO} from '../domain/dto/FridgeWithDetailsDTO.js';

export class FridgeService{
    constructor(fridgeRepository){
        //Initializes the FridgeService with a repository that handles fridge data access.
        this.fridgeRepository = fridgeRepository;
       
    }

    /**
     * Retrieves a list of all fridges
     * Fetches all fridges from the repository and maps them to FridgeDTO objects.
     * @returns a list of fridge data transfer objects.
     * throws an error if fetching fridges fails.
     */
    async listFridges(){
        try{
            const fridge = await this.fridgeRepository.findAll();
            return fridge.map(fridge => FridgeDTO.fromEntity(fridge));

        }catch(error){
            throw new Error(`Failed to list fridge: ${error.message}`);
        }
    }

    /**
     * Retrieves a specific fridge by its ID.
     * Validates the fridge ID and returns the corresponding fridge as a FridgeDTO.
     * @returns the fridge data or null if not found.
     * throws an error if the ID is invalid or retrieval fails.
     */
    async getFridge(f_id){
        try{
            if(!f_id || isNaN(f_id)){
                throw new Error('Invalid fridge id');
            }
            const fridge = await this.fridgeRepository.findById(f_id);
            if(!fridge){
                return null;
            }
            return FridgeDTO.fromEntity(fridge);
        }catch(error){
            throw new Error(`Failed to get fridge: ${error.message}`);
        }
    }

    /**
     * Creates a new fridge record.
     * Sends the fridge data to the repository and returns the created fridge as a FridgeDTO.
     * @returns the newly created fridge.
     * throws an error if fridge creation fails.
     */
      async createFridge(data){
        try {
            const fridge = await this.fridgeRepository.create(data);
            return FridgeDTO.fromEntity(fridge);
        } catch (error) {
            throw new Error(`Failed to create fridge: ${error.message}`);
        }
    }

    /**
     * Updates an existing fridge record by ID.
     * Validates the ID and data, then updates the fridge in the repository.
     * @returns the updated fridge as a FridgeDTO or null if not found.
     * theows an error if validation or update fails.
     */
    async updateFridge(f_id, data){
        try {
            if (!f_id || isNaN(f_id)) {
                throw new Error('Invalid fridge ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const fridge = await this.fridgeRepository.update(f_id, data);
            return fridge ? FridgeDTO.fromEntity(fridge) : null;
        } catch (error) {
            throw new Error(`Failed to update fridge: ${error.message}`);
        }
    }

    /**
     * Deletes a fridge record by ID.
     * Validates the ID and removes the fridge from the repository.
     * @returns true if deletion was successful false otherwise.
     * throws an error if deletion fails or ID is invalid.
     */
     async deleteFridge(f_id){
        try {
            if (!f_id || isNaN(f_id)) {
                throw new Error('Invalid fridge ID');
            }
            const result = await this.fridgeRepository.delete(f_id);
            return result;
        } catch (error) {
            throw new Error(`Failed to delete fridge: ${error.message}`);
        }
    }

    /**
     * Retrieves all fridges along with their related details.
     * Combines data from multiple related tables or entities.
     * @returns list of fridges with details or null if none found.
     * throws an error if fetching fridge details fails.
     */
    async getFridgeWithDetails(){
        try{
            const fridgeWithDetailsDTO = await this.fridgeRepository.findAllWithDetails();
            return fridgeWithDetailsDTO ? fridgeWithDetailsDTO : null;
        }catch(e){
            throw new Error('Failed to load data');
        }
    }

    /**
     * Retrieves all fridges and converts them into FridgeWithDetailsDTO objects.
     * A simplified version of getFridgeWithDetails.
     * @returns list of fridges with details.
     */
     async getAllFridges() {
        const rows = await this.fridgeRepository.findAllFridges();
        return rows.map(r=> new FridgeWithDetailsDTO(r));
    }

    /**
     * Decrements a specific item count from a fridge.
     * alidates both fridge and product IDs, then updates the data accordingly.
     * @returns the updated fridge or null if the operation failed.
     * throws an error if IDs are invalid or the operation fails.
     */
    async decrementItem(f_id,prod_id){
        try{
            if(!f_id|| isNaN(f_id)){
                throw new Error('Invalid fridge id');
            }
            if(!prod_id || isNaN(prod_id)){
                throw new Error('Invalid product id');
            }
            const fridge = await this.fridgeRepository.decrementItem(f_id, prod_id);
            return fridge ? FridgeDTO.fromEntity(fridge) : null;


        }catch(error){
            throw new Error(`Failed to demcrement item: ${error.message}`);
        }
    }

    

}