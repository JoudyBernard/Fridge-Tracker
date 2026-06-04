import { pool } from "../../config/db.js";
import { User } from "../entities/User.js";

export class UserRepository {
    /**
     * Creates a new user in the database with the provided details.
     * @returns the newly created User object.
     */
    async create ({first_name, last_name, email, password, city}){
        const sql = `INSERT INTO users (first_name,last_name, email, password, city)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING user_id,first_name,last_name,email,city, created_at,updated_at;
        `;
        
        const {rows} = await pool.query (sql, [first_name, last_name, email, password, city]);
        
        return new User(rows[0]);
    
    }

    /**
     * Updates an existing user's information by their user ID.
     * @returns the updated User object or null if the user was not found.
     */
    async update(user_id, {first_name, last_name, email, password, city}){
        const sql = `UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, city = $5, update_at = NOW()
        WHERE user_id = $6
        RETURNING user_id, first_name, last_name, email, password, city ,created_at, updated_at;
        `;
       
        const   {rows} = await pool.query (sql , [first_name, last_name, email, password, city, user_id]);
       
        return rows[0]?  new User(rows[0]): null;
    }

    /**
     * Deletes a user from the database by their user ID.
     * @returns true if the user was deleted false otherwise.
     */
    async delete(user_id){
        const {rowCount} = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
       
        return rowCount > 0;

    }

    /**
     * Counts the total number of users in the database.
     * @returns an object containing the user count.
     */
    async count(){
        const {rows} = await pool.query('SELECT COUNT(*) FROM users');
       
        return rows[0];
    }

    /**
     * Retrieves all users from the database, ordered by newest first.
     * @returns a list of User objects.
     */
     async findAll(){
        const sql = `SELECT user_id, first_name, last_name, email, password, city, created_at, updated_at
        FROM users ORDER BY user_id DESC;`
       
        const {rows} = await pool.query(sql);

        return rows.map(r => new User(r));
    }

    /**
     * Finds a specific user by their user ID.
     * @returns a User object if found or null if not found.
     */
    async findById(user_id){
        const sql = `SELECT user_id, first_name, last_name, email, password, city, created_at, updated_at
        FROM users 
        WHERE user_id = $1
        ORDER BY user_id DESC;`;

        const {rows} = await pool.query(sql, [user_id]);
        
        return rows[0] ? new User(rows[0]) : null;
    }

    /**
     * Authenticates a user by checking their email and password.
     * @returns a User object if credentials match or null if authentication fails.
     */
    async authenticateUser(email,password){
        const sql = `SELECT * FROM users WHERE email = $1 AND password = $2;`;
        
        const {rows} = await pool.query(sql, [email,password]);
        
        return rows[0]? new User(rows[0]): null;
    }



    }
    