//Data Transfer Object (DTO) for fridges including detailed information about related products and user data. Used for repository queries that return joined data.
export class FridgeWithDetailsDTO{
    constructor({f_id = null, user_id, prod_id, quantity, restock_limit, first_name, last_name, email, password, city, prod_name, prod_price}){
    //fridge table 
        this.f_id = f_id;   
        this.user_id = user_id;
        this.prod_id = prod_id;
        this.quantity = quantity;
        this.restock_limit = restock_limit;
    //user table
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.city = city;
    //products table
        this.prod_name = prod_name;
        this.prod_price = prod_price;
    }
//Creates an FridgeWithDetailsDTO instance from a raw entity containing fridge, product, and user information.
    static fromEntity(entity){
        return new FridgeWithDetailsDTO(entity);
    }
}