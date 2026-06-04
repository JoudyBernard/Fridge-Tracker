import { pool } from "../../config/db.js";
import {Orders} from '../entities/Orders.js';
import { OrderWithDetailsDTO } from "../dto/OrderWithDetailsDTO.js";
import moment from "moment";

export class OrdersRepository{
    /**
     * Creates a new order with the given user ID and status (default: 'pending').
     * Automatically sets the creation and update timestamps and assigns a formatted date.
     * @returns the newly created Order object.
     */
    async create({user_id, status = 'pending'}){
        const sql = `INSERT INTO orders (user_id , status, created_at, updated_at, date)
        VALUES($1, $2, now(), now(), $3)
        RETURNING order_no, user_id, status, date, created_at, updated_at;
        `;
        let d = new Date();
        let formattedDate = moment(d).format("YYYY-MM-DD");
        const {rows} = await pool.query(sql, [user_id, status, formattedDate]);
        return new Orders(rows[0]);
    }

    /**
     * Updates an existing order identified by its order number.
     * @returns the updated Order object or null if the order was not found.
     */
    async update(order_no, {user_id, status}){
        const sql = `UPDATE orders SET user_id = $1, status = $2
         WHERE order_no = $3
        RETURNING order_no, user_id, status, date, created_at, updated_at;
        `;

        const {rows} = await pool.query(sql, [user_id, status, order_no])
        return rows[0] ? new Orders(rows[0]) : null;
    }

    /**
     * Retrieves all orders from the database ordered by most recent date.
     * @returns a list of Order objects
     */
     async findAll(){
        const sql = `SELECT order_no, status, date, 
        updated_at, created_at FROM orders ORDER BY date DESC`;

        const {rows} = await pool.query(sql);
        return rows.map(r=> new Orders(r));
    }

    /**
     * Finds a specific order by its order number(PK).
     * @returns an Order object if found or null if not found.
     */
    async findById(order_no){
        const sql = "SELECT * FROM orders WHERE order_no= $1 ORDER BY date DESC";
        const {rows} = await pool.query(sql, [order_no]);
        return rows[0] ? new Orders(rows[0]) : null;
    }

    /**
     * Deletes an order from the database by its order number.
     * @returns true if the order was deleted false otherwise.
     */
     async delete(order_no){
        const sql = "DELETE FROM orders WHERE order_no = $1";
        const {rowCount} = await pool.query(sql, [order_no]);
        return rowCount > 0;
    }

    /**
     * Retrieves all orders along with their associated user information.
     * @returns raw joined rows from the orders and users tables.
     */
    async findAllOrders(){
        const sql = `SELECT * FROM orders
        INNER JOIN users ON orders.user_id = users.id
        ORDER BY orders.date DESC;  
        `;
        const {rows} = await pool.query(sql);
        return rows;
    }

    /**
     * Retrieves all orders with detailed user information.
     * @returns a list of OrderWithDetailsDTO objects.
     */
    async findAllWithDetails(){
        const sql = `SELECT * FROM orders
        INNER JOIN users ON orders.user_id = users.id
        ORDER BY orders.date DESC;  
        `
        const {rows} = await pool.query(sql);
        return rows.map(r => new OrderWithDetailsDTO(r));
    }
}
