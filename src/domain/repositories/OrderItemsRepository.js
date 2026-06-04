import { pool } from "../../config/db.js";
import {OrderItems} from "../entities/OrderItems.js";
import { OrderItemsWithDetailsDTO } from "../dto/OrderItemsWithDetailsDTO.js";
export class OrderItemsRepository{
    /**
     * Creates a new order item in the database.
     * @returns Returns the newly created OrderItems object.
     */
     async create({order_no, prod_id, quantity}){ 
        const sql = `INSERT INTO "orderItems" (order_no, prod_id, quantity, created_at, updated_at)
        VALUES ($1, $2, $3, now(), now())
        RETURNING cart_id, order_no, prod_id, quantity,created_at, updated_at;
        `;
        const {rows} = await pool.query(sql, [order_no, prod_id, quantity]);
        return new OrderItems(rows[0]);
    }

    /**
     * Updates an existing order item by its cart ID.
     * @returns the updated OrderItems object or null if not found.
     */
    async update(cart_id, {order_no, prod_id, quantity}){
        const sql = `UPDATE "orderItems" SET order_no = $1, prod_id = $2, quantity = $3
        WHERE cart_id = $4
        RETURNING cart_id, order_no, prod_id, quantity,created_at, updated_at;
        `;

        const {rows} = await pool.query(sql, [order_no, prod_id, quantity, cart_id])
        return rows[0] ? new OrderItems(rows[0]) : null;
    }

    /**
     * Deletes an order item by its cart ID
     * @returns true if the record was deleted false otherwise.
     */
     async delete(cart_id){
        const sql = `DELETE FROM "orderItems" WHERE cart_id = $1`;
        const {rowCount} = await pool.query(sql, [cart_id]);
        return rowCount > 0;
    }

    /**
     * Retrieves all order items from the database ordered by newest first.
     * @returns a list of OrderItems objects.
     */
    async findAll(){
        const sql = `SELECT cart_id, order_no, prod_id, created_at ,updated_at FROM "orderItems" ORDER BY cart_id DESC`;
        const {rows} = await pool.query(sql);
        return rows.map(r=> new OrderItems(r));
    }

    /**
     * Finds an order item by its cart ID.
     * @returns an Order object if found or null if not found.
     */
    async findById(cart_id){
        const sql = `SELECT * FROM "orderItems" WHERE cart_id = $1 ORDER BY cart_id DESC`;
        const {rows} = await pool.query(sql, [cart_id]);
        return rows[0] ? new Order(rows[0]) : null;
    }

    /**
     * Retrieves all order items with their associated orders and products.
     * @returns Returns the joined raw rows.
     */
    async findAllOrderItems(){
        const sql = `SELECT * FROM "orderItems"
        INNER JOIN orders ON orderItems.order_no = orders.order_no
        INNER JOIN products on orderItems.prod_id = products.prod_id
        ORDER BY orderItems.cart_id DESC;  
        `
        const {rows} = await pool.query(sql);
        return rows;
    }

    /**
     * Retrieves all order items with detailed order and product information.
     * @returns a list of OrderItemsWithDetailsDTO objects.
     */
    async findAllWithDetails(){
        const sql = `SELECT * FROM "orderItems"
        INNER JOIN orders ON orderItems.order_no = orders.order_no
        INNER JOIN products on orderItems.prod_id = products.prod_id
        ORDER BY orderItems.cart_id DESC;  
        `
        const {rows} = await pool.query(sql);
        return rows.map(r=> new OrderItemsWithDetailsDTO(r));
    }
}