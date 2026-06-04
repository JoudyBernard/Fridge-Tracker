import { pool } from "../../config/db.js";
import{ Products} from "../entities/Products.js"; 

export class ProductsRepository {
  /**
   * reates a new product in the database with the given name and price.
   * @returns the newly created Products object.
   */
   async create({prod_name, prod_price}){
    const sql = `INSERT INTO products (prod_name, prod_price)
    VALUES ($1, $2)
    RETURNING prod_id, prod_name, prod_price, created_at, updated_at;
    `;
    const {rows} = await pool.query(sql, [prod_name, prod_price]);
    return new Products(rows[0]);
   }

   /**
    * Updates an existing products name and price by its product ID.
    * @returns the updated Products object or null if the product was not found.
    */
   async update(prod_id , {prod_name, prod_price}){
    const sql = `UPDATE products SET prod_name = $1, prod_price = $2 , updated_at = NOW()
    WHERE prod_id = $3
    RETURNING prod_id, prod_name, prod_price, created_at, updated_at;
    `;
    const {rows} = await pool.query(sql, [prod_name,prod_price, prod_id]);
    return rows[0]? new Products(rows[0]): null;
   }

   /**
    * Retrieves all products from the database, ordered by newest first.
    * @returns a list of Products objects.
    */
   async findAll(){
    const sql = `SELECT prod_id, prod_name, prod_price, created_at, updated_at
    FROM products ORDER BY prod_id DESC; 
    `;
    const {rows} = await pool.query(sql);
    return rows.map(r => new Products(r));
   }

   /**
    * Finds a product by its product ID.
    * @returns a Products object if found or null if not found.
    */
   async findById(prod_id){
    const sql = `SELECT prod_id, prod_name, prod_price, created_at, updated_at
    FROM products
    WHERE prod_id = $1
    ORDER BY prod_id DESC;`;
    const {rows} = await pool.query(sql, [prod_id]);
    return rows[0]? new Products (rows[0]): null;
   }

   /**
    * Deletes a product from the database by its product ID.
    * @returns true if the product was deleted, false otherwise.
    */
   async delete(prod_id){
    const{rowCount} = await pool.query('DELETE from products WHERE prod_id = $1', [prod_id]);
    return rowCount> 0;
   }

   /**
    * Counts the total number of products in the database.
    * @returns an object containing the count.
    */
   async countProducts(){
    const{rows} = await pool.query('SELECT COUNT(*) FROM products');
    return rows[0];
   }

 }
   
