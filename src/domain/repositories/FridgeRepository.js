import {pool} from "../../config/db.js";
import { FridgeWithDetailsDTO } from "../dto/FridgeWithDetailsDTO.js";
import {Fridge} from "../entities/Fridge.js";
export class FridgeRepository{
    /**
     * Creates a new fridge item in the database
     * @returns the newly created Fridge item.
     */
    async create({user_id, prod_id, quantity, restock_limit}){
        const sql = `INSERT INTO fridges (user_id, prod_id, quantity, restock_limit, created_at, updated_at)
        VALUES ($1, $2, $3, $4, now(), now())
        RETURNING f_id, user_id, prod_id, quantity, restock_limit, created_at, updated_at;
        `;
        const{rows} = await pool.query (sql, [user_id, prod_id, quantity, restock_limit]);
        return new Fridge(rows[0]);
    }

    /**
     * Updates an exxisting fridge by its fridge id
     * @returns the updated Fridge object or null if not found.
     */
    async update(f_id, {user_id, prod_id,quantity, restock_limit}){
        const sql = `UDATE fridges SET user_id = $1, prod_id = $2, quantity = $3, restock_limit = $4
        WHERE f_id = $5
        RETURNING f_id, user_id,prod_id, quantity, restock_limit, created_at, updated_at;
        `;
        const {rows} = await pool.query(sql, [user_id, prod_id, quantity,restock_limit, f_id]);
        return rows[0]? new Fridge(rows[0]) : null;
    }

    /**
     * Retrieves all fridge records from the database ordered by newest fridges first
     * @returns a list of Fridge objects
     */
     async findAll(){
        const sql = `SELECT f_id, user_id, prod_id, quantity, restock_limit, created_at, updated_at
        FROM fridges ORDER BY f_id DESC;
        `;
        const {rows} = await pool.query(sql);
        return rows.map(r => new Fridge(r));
    }

    /**
     * Finds a fridge by its f_id(PK) 
     * @returns a fridge object or null if no fridge is found
     */
    async findById(f_id){
        const sql = `SELECT * FROM fridges WHERE f_id = $1 ORDER BY f_id DESC;
        `;
        const {rows} = await pool.query (sql, [f_id]);
        return rows[0] ? new Fridge (rows[0]) : null;
    }

    /**
     * Deletes a fridge by its id(f_id)
     * @returns true if its deleted and false oterwise
     */
    async delete(f_id){
        const sql = "DELETE FROM fridges WHERE f_id = $1";
        const {rowCount} = await pool.query(sql, [f_id]);
        return rowCount > 0;
    }

    /**
     * Retrieves all fridges with related user and product data
     * @returns raw rows joined from fridges, users, and products tables.
    */
     async findAllFridges(){
        const sql = `SELECT * FROM fridges
        INNER JOIN users ON fridge.user_id = user.id
        INNER JOIN products on fridge.prod_id = products.id
        ORDER BY fridge.f_id DESC;  
        `
        const {rows} = await pool.query(sql);
        return rows;
    }

    /**
     * Retrieves all fridges with detailed user and product information.
     * @returns a list of FridgeWithDetailsDTO objects.
    */
     async findAllWithDetails(){
        const sql = `SELECT * FROM fridges
        INNER JOIN users ON fridge.customer_id = user.id
        INNER JOIN products on fridge.prod_id = products.id
        ORDER BY fridge.f_id DESC;  
        `
        const {rows} = await pool.query(sql);
        return rows.map(r=> new FridgeWithDetailsDTO(r));
    }

    /**
     *Decreases the quantity of a specific roduct in a fridge by 1
     * @returns Returns the updated fridge object or null if not found.
     */
    async decrementItem(f_id, prod_id){
        const sql = `UPDATE fridges SET quantity = quantity -1
        WHERE f_id = $1 AND prod_id = $2
        RETURNING *;`;
        const {rows} = await pool.query(sql, [f_id,prod_id]);
        return rows[0] ? new Fridge (rows[0]) : null;
    }
}