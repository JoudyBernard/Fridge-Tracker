import {ProductsDTO} from '../domain/dto/ProductsDTO.js';
 export class ProductsService{
    constructor(productsRepository){
        //Initializes the ProductsService with a repository that handles product data access.
        this.productsRepository= productsRepository;
    }

    /**
     * Retrieves a list of all products.
     * Fetches all products from the repository and maps them into ProductsDTO objects.
     * @returns a list of product data transfer objects.
     * throws an error if fetching fails.
     */
    async listProducts(){
        try{
            const products = await this.productsRepository.findAll();
            return products.map(product => ProductsDTO.fromEntity(product));
        }catch(error){
            throw new Error(`Failed to list products: ${error.message}`);
        }
    }

    /**
     * Retrieves a specific product by its ID.
     * Validates the product ID and returns the corresponding product as a ProductsDTO.
     * @returns the product data or null if not found.
     * throws an error if the ID is invalid or retrieval fails.
     */
    async getProduct(prod_id){
        try{
            if(!prod_id || isNaN(prod_id)){
                throw new Error(`Invalid product id`);
            }
            const products = await this.productsRepository.findById(prod_id);
            if(!products){
                return null;
            }
            return ProductsDTO.fromEntity(products);
        }catch(error){
            throw new Error(`Failed to get product: ${error.message}`);
        }
    }

    /**
     * Creates a new product record.
     * alidates required fields and sends the data to the repository to create a new product.
     * @returns the newly created product.
     * throws an error if required fields are missing or creation fails.
     */
      async createProduct(data){
        try {
            if (!data || !data.prod_name || !data.prod_price ) {
                throw new Error('Missing required fields');
            }
            const products = await this.productsRepository.create(data);
            return ProductsDTO.fromEntity(products);
        } catch (error) {
            throw new Error(`Failed to create product: ${error.message}`);
        }
    }

    /**
     * Updates an existing product record by ID.
     * Validates the product ID and provided data, then updates the record in the repository.
     * @returns the updated product as a ProductsDTO or null if not found.
     * throws an errir if validation or update fails.
     */
     async updateProduct(prod_id, data){
        try {
            if (!prod_id || isNaN(prod_id)) {
                throw new Error('Invalid product ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const products = await this.productsRepository.update(prod_id, data);
            return products ? ProductsDTO.fromEntity(products) : null;
        } catch (error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    /**
     * Deletes a product record by ID.
     * Validates the product ID and removes it from the repository.
     * @returns true if deletion was successful false otherwise.
     * throws an error if deletion fails or ID is invalid.
     */
    async deleteProduct(prod_id){
        try {
            if (!prod_id || isNaN(prod_id)) {
                throw new Error('Invalid product ID');
            }
            return await this.productsRepository.delete(prod_id);
        } catch (error) {
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }
 }