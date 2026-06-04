import {UserDTO} from '../domain/dto/UserDTO.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';

export class UserService{
    constructor(userRepository){
        //Initializes the UserService with a repository that handles product data access.
        this.userRepository = userRepository;
    }

    /**
     * Retrieves a list of all users.
     * Maps each entity to a UserDTO for consistent data transfer.
     * @returns a list of all users.
     * throws an error if retrieval fails.
     */
    async listUser(){
        try{
            const users = await this.userRepository.findAll();
            return users.map(user => UserDTO.fromEntity(user));
        }catch(error){
            throw new Error(`Failed to list users: ${error.message}`);
        }
    }

    /**
     * Retrieves a specific user by ID.
     * Validates input and returns the corresponding user as a UserDTO.
     * @returns the user data or null if not found.
     * throws an error if validation fails or user retrieval fails.
     */
    async getUser(user_id){
        try{
            if(!user_id || isNaN(user_id)){
                throw new Error('Invalid user Id');
        }
        const user = await this.userRepository.findById(user_id);
        if(!user){
            return null;
        }
        return UserDTO.fromEntity(user);
    }catch(error){
        throw new Error(`Failed to get user: ${error.message}`);
    }

}

/**
 * Creates a new user record.
 * Validates all required fields before passing data to the repository.
 * @returns the newly created user.
 * throws an error if required fields are missing or creation fails.
 */
 async createUser(data){
        try {
            if (!data || !data.first_name || !data.last_name || !data.email || !data.city|| !data.password) {
                throw new Error('Missing required fields');
            }
            const user = await this.userRepository.create(data);
            return UserDTO.fromEntity(user);
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    /**
     * Updates an existing user record.
     * Validates the user ID and provided data, then updates the record in the repository.
     * @returns the updated user or null if not found.
     * throws an error if validation fails or update fails.
     */
    async updateUser(user_id, data){
        try {
            if (!user_id || isNaN(user_id)) {
                throw new Error('Invalid user ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const user = await this.userRepository.update(user_id, data);
            return user ? UserDTO.fromEntity(user) : null;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    /**
     * Deletes a user record by ID.
     * Validates the ID and removes the user from the repository.
     * @returns true if deletion succeeded, false otherwise.
     * throws an error if validation fails or deletion fails.
     */
    async deleteUser(user_id){
        try {
            if (!user_id || isNaN(user_id)) {
                throw new Error('Invalid user ID');
            }
            return await this.userRepository.delete(user_id);
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }

    /**
     * Authenticates a user by email and password.
     * Validates credentials and delegates authentication to the repository layer.
     * @returns the authenticated user if credentials are correct.
     * throws an error if authentication fails.
     */
    async authenticateUser(email,password){
        try{
            if(!email || !email.trim() ){
                throw new Error('Invalid email');
            }
            if(!password|| !password.trim()){
                throw new Error('Invalid password')
            }
            const user = await this.userRepository.authenticateUser(email,password);
            if(!user){
                throw new Error('Authentication failed incorrect email or password');
            }
            return UserDTO.fromEntity(user);
        }catch(error){
            throw new Error(`Failed to authenticate user: ${error.message}`);
        }
    }
}
