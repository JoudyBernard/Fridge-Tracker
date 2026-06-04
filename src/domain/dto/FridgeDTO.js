//Converts fridge entities into a consistent format for responses.
export class FridgeDTO{
    constructor({f_id,user_id,prod_id,quantity, restock_limit}){
        this.f_id = f_id;
        this.user_id = user_id;
        this.prod_id = prod_id;
        this.quantity = quantity;
        this.restock_limit = restock_limit;

    }
    ////Creates an FridgeDTO instance from a raw alert entity.
    static fromEntity(entity){
        return new FridgeDTO(entity);
    }
}