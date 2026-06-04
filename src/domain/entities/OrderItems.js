//Creates orderItems entity with fields.
export class OrderItems{
    consturctor({cart_id = null, order_no, prod_id, quantity}){
        this.cart_id = cart_id;
        this.order_no = order_no;
        this.prod_id = prod_id;
        this.quantity = quantity;
    }
}