import {OrdersDTO} from '../domain/dto/OrdersDTO.js';
import{OrderWithDetailsDTO} from '../domain/dto/OrderWithDetailsDTO.js';

export class OrdersService{
    constructor(ordersRepository){
        //Initializes the OrdersService with a repository that handles order data access.
        this.ordersRepository = ordersRepository;
    }

    /**
     * Retrieves a list of all orders.
     * Fetches all orders from the repository and maps them into OrdersDTO objects.
     * @returns a list of order data transfer objects.
     * throws an error if fetching orders fails.
     */
    async listOrders(){
        try {
            const orders = await this.ordersRepository.findAll();
            return orders.map(order => OrdersDTO.fromEntity(order));
        } catch (error) {
            throw new Error(`Failed to list order: ${error.message}`);
        }
    }

    /**
     * Retrieves a specific order by its order number.
     * Validates the order number and returns the corresponding order as an OrdersDTO.
     * @returns the order data or null if not found.
     * throws an error ifn the order number is invalid or retrieval fails.
     */
    async getOrder(order_no){
        try {
            if (!order_no || isNaN(order_no)) {
                throw new Error('Invalid order number');
            }
            const orders = await this.ordersRepository.findById(order_no);
            if (!orders) {
                return null;
            }
            return OrdersDTO.fromEntity(orders);
        } catch (error) {
            throw new Error(`Failed to get order: ${error.message}`);
        }
    }

    /**
     * Creates a new order record.
     * Sends the provided order data to the repository and returns the created order as an OrdersDTO.
     * @returns the newly created order.
     * throws an error if order creation fails.
     */
    async createOrder(data){
        try {
            const orders = await this.ordersRepository.create(data);
            return OrdersDTO.fromEntity(orders);
        } catch (error) {
            throw new Error(`Failed to create cutomer: ${error.message}`);
        }
    }

    /**
     * Updates an existing order by its order number.
     * Validates the order number and provided data, then updates the order in the repository.
     * @returns the updated order as an OrdersDTO or null if not found.
     * throws an error if validation or update fails.
     */
    async updateOrder(order_no, data){
        try {
            if (!order_no || isNaN(order_no)) {
                throw new Error('Invalid order number');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const orders = await this.ordersRepository.update(order_no, data);
            return orders ? OrdersDTO.fromEntity(orders) : null;
        } catch (error) {
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }

    /**
     *  Deletes an existing order by its order number.
     * Validates the order number and removes the order from the repository.
     * @returns true if deletion was successful false otherwise.
     * throws an error if deletion fails or the order number is invalid.
     */
    async deleteOrder(order_no){
        try {
            if (!order_no || isNaN(order_no)) {
                throw new Error('Invalid order number');
            }
            const result = await this.ordersRepository.delete(order_no);
            return result;
        } catch (error) {
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    }

    /**
     * Retrieves all orders along with their related details.
     * Combines data from related entities
     * @returns list of orders with details or null if none found.
     * throws an error if fetching detailed order data fails.
     */
    async getOrderWithDetails(){
        try{
            const orderWithDetailsDTO = await this.ordersRepository.findAllWithDetails();
            return orderWithDetailsDTO ? orderWithDetailsDTO : null;
        }catch(e){
            throw new Error('Failed to load data');
        }
    }

    /**
     * Retrieves all orders and converts them into OrdersWithDetailsDTO objects.
     * A simplified version of getOrderWithDetails.
     * @returns list of orders with detailed information.
     */
    async getAllOrders() {
        const rows = await this.ordersRepository.findAllOrders();
        return rows.map(r=> new OrdersWithDetailsDTO(r));
    }
}