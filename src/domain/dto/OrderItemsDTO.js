//Converts orderItems entities into a consistent format for responses.
export class OrderItemsDTO{
    constructor({cart_id = null, order_no, prod_id, quantity}){
        this.cart_id = cart_id;
        this.order_no = order_no;
        this.prod_id  = prod_id;
        this.quantity = quantity;

    }
    //Creates an OrderItemsDTO instance from a raw alert entity.
    static fromEntity(entity){
        return new OrderItemsDTO(entity);
    }
}