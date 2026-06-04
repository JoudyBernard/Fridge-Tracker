//Data Transfer Object (DTO) for orderItems including detailed information about related products and user data. Used for repository queries that return joined data.
export class OrderItemsWithDetailsDTO{
    constructor({cart_id = null, order_no, prod_id, quantity, user_id, date, status, prod_name, prod_price}){
    //orderItems table  
        this.cart_id = cart_id;
        this.order_no = order_no;
        this.prod_id = prod_id;
        this.quantity = quantity;
    //user table
        this.user_id = user_id;
        this.date = date;
        this.status = status;

    //products table
        this.prod_name = prod_name;
        this.prod_price = prod_price;
    }
//Creates an OrderItemsWithDetailsDTO instance from a raw entity containing orderItems, product, and user information
    static fromEntity(entity){
        return new OrderItemsWithDetailsDTO(entity);
    }
}