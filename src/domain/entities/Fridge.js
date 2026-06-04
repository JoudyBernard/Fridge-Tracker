//Creates fridge entity with fields.
export class Fridge{
    constructor({f_id = null,user_id,prod_id,quantity, restock_limit}){
        this.f_id = f_id;
        this.user_id = user_id;
        this.prod_id = prod_id;
        this.quantity = quantity;
        this.restock_limit = restock_limit;
    }


}