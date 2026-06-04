import { pool } from "../../config/db.js";
import {Alerts} from "../entities/Alerts.js";
import {AlertsWithDetailsDTO} from "../dto/AlertsWithDetailsDTO.js";
import moment from "moment";
export class AlertsRepository{
   /**
    * Creates a new Alert item in the database
    * @returns the newly created Alert item.
    */
    async create({f_id,user_id, description}){
        const sql = `INSERT INTO alerts (f_id, user_id, description, created_at, updated_at , date)
        VALUES ($1, $2, $3, now(), now(), $4)
        RETURNING alert_id, f_id, user_id, description, created_at, updated_at;
        `;
        const d= new Date();
        let fromatedDate = moment(d).format("YYYY-MM-DD");
        const{rows} = await pool.query(sql, [f_id, user_id, description, fromatedDate]);
        return new Alerts(rows[0]);
    }

    /**
     * Updates an existing alert by its alert id
     * @returns the updated Alert object or null if not found.
     */
        async update(alert_id, {f_id ,user_id, description}){
        const sql = `UPDATE alerts SET f_id = $1, user_id = $2, description = $3,
        WHERE alert_id = $4
        RETURNING alert_id, f_id, user_id, order_date, created_at, updated_at;
        `;

        const {rows} = await pool.query(sql, [f_id, user_id, description, alert_id])
        return rows[0] ? new Alerts(rows[0]) : null;
        }

    /**
     * Deletes a alert by its id(alert_id)
     * @returns 
     */
        async delete(alert_id){
        const sql = "DELETE FROM alerts WHERE alert_id = $1";
        const {rowCount} = await pool.query(sql, [alert_id]);
        return rowCount > 0;
    }

    /**
     * Retrieves all alert records from the database ordered by date
     * @returns a list of Alert objects
     */
       async findAll(){
        const sql = `SELECT alert_id, f_id, user_id, description, date, 
         created_at, updated_at FROM alerts ORDER BY date DESC`;

        const {rows} = await pool.query(sql);
        return rows.map(r=> new Alerts(r));
    }

    /**
     * Finds a alert by its alert_id(PK) and returns it as a alert object
     * @returns a alert object or null if no alert is found
     */
    async findById(alert_id){
        const sql = "SELECT * FROM alerts WHERE alert_id = $1 ORDER BY date DESC";
        const {rows} = await pool.query(sql, [alert_id]);
        return rows[0] ? new Alerts(rows[0]) : null;
    }
    
    /**
     * Retrieves all alerts with related user and fridge data
     * @returns raw rows joined from alerts, users, and fridges tables.
     */
    async findAllAlerts(){
        const sql = `SELECT * FROM alerts
        INNER JOIN fridge ON alerts.f_id = fridges.id
        INNER JOIN users on alerts.user_id = user.id
        ORDER BY alerts.date DESC;  
        `;
        const {rows} = await pool.query(sql);
        return rows;
    }
    /**
     * Retrieves all alerts with detailed user and fridge information.
     * @returns a list of AlertsWithDetailsDTO objects.
     */
    async findAllWithDetails(){
        const sql = `SELECT * FROM alerts
        INNER JOIN fridge ON alerts.f_id = fridges.id
        INNER JOIN users on alerts.user_id = users.id
        ORDER BY alerts.date DESC;  
        `;
        const {rows} = await pool.query(sql);
        return rows.map(r=> new AlertsWithDetailsDTO(r));
    }

 }
