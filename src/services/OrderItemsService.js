import {OrderItemsDTO} from "../domain/dto/OrderItemsDTO.js";
import {OrderItemsWithDetailsDTO} from "../domain/dto/OrderItemsWithDetailsDTO.js";
export class OrderItemsService{
    constructor(orderItemsRepository){
        //Initializes the OrderItemsService with a repository for handling order items data access.
        this.orderItemsRepository = orderItemsRepository;
    }

    /**
     * Retrieves a list of all order items.
     * Fetches all order items from the repository and maps them into OrderItemsDTO objects.
     * @returns a list of order item data transfer objects.
     * throws an error if fetching order items fails.
     */
    async listOrderItems(){
        try {
            const orderItems = await this.orderItemsRepository.findAll();
            return orderItems.map(orderItems => OrderItemsDTO.fromEntity(orderItems));
        } catch (error) {
            throw new Error(`Failed to list order items : ${error.message}`);
        }
    }

    /**
     * Retrieves specific order items by cart ID.
     * Validates the cart ID and returns the corresponding order items as an OrderItemsDTO.
     * @returns the order items data or null if not found.
     * throws an error if the cart ID is invalid or retrieval fails
     */
     async getOrderItems(cart_id){
        try {
            if (!cart_id || isNaN(cart_id)) {
                throw new Error('Invalid cart ID');
            }
            const orderItems = await this.orderItemsRepository.findById(cart_id);
            if (!orderItems) {
                return null;
            }
            return OrderItemsDTO.fromEntity(orderItems);
        } catch (error) {
            throw new Error(`Failed to get order items: ${error.message}`);
        }
    }

    /**
     * Creates new order items.
     * Sends the order items data to the repository and returns the created order items as an OrderItemsDTO.
     * @returns the newly created order items.
     * throws an error if  creation fails.
     */
    async createOrderItems(data){
        try {
            const orderItems = await this.orderItemsRepository.create(data);
            return OrderItemsDTO.fromEntity(orderItems);
        } catch (error) {
            throw new Error(`Failed to create order Items: ${error.message}`);
        }
    }

    /**
     * Updates existing order items by cart ID.
     * Validates the ID and data, then updates the order items in the repository.
     * @returns the updated order items as an OrderItemsDTO or null if not found.
     * throws an error if validation or update fails.
     */
    async updateOrderItems(cart_id, data){
        try {
            if (!cart_id || isNaN(cart_id)) {
                throw new Error('Invalid cart ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const orderItems = await this.orderItemsRepository.update(cart_id, data);
            return orderItems ? OrderItemsDTO.fromEntity(orderItems) : null;
        } catch (error) {
            throw new Error(`Failed to update order items: ${error.message}`);
        }
    }

    /**
     * Deletes order items by cart ID.
     * Validates the ID and removes the corresponding record from the repository.
     * @returns true if deletion was successful false otherwise.
     * throws an error if deletion fails or ID is invalid.
     */
     async deleteOrderItems(cart_id){
        try {
            if (!cart_id || isNaN(cart_id)) {
                throw new Error('Invalid cart ID');
            }
            const result = await this.orderItemsRepository.delete(cart_id);
            return result;
        } catch (error) {
            throw new Error(`Failed to delete order items: ${error.message}`);
        }
    }

    /**
     * Retrieves all order items along with their related details.
     * Combines order item data with associated entities like products or orders.
     * @returns list of order items with details or null if none found.
     * throws an error if fetching data fails.
     */
    async getOrderItemsWithDetails(){
        try{
            const orderItemsWithDetailsDTO = await this.orderItemsRepository.findAllWithDetails();
            return orderItemsWithDetailsDTO ? orderItemsWithDetailsDTO : null;
        }catch(e){
            throw new Error('Failed to load data');
        }
    }

    /**
     * Retrieves all order items and converts them into OrderItemsWithDetailsDTO objects.
     * A simplified version of getOrderItemsWithDetails.
     * @returns list of order items with details.
     */
     async getAllOrderItems() {
        const rows = await this.orderItemsRepository.findAllOrders();
        return rows.map(r=> new OrderItemsWithDetailsDTO(r));
    }
}