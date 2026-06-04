//Converts orders entities into a consistent format for responses.
import moment from "moment";
export class OrdersDTO{
    constructor({order_no = null, user_id , date = null, status = 'pending' }){
        this.order_no = order_no;
        this.user_id = user_id;
        this.date = moment(date).format("YYYY-MM-DD");
    }
//Creates an OrdersDTO instance from a raw alert entity.
    static fromEntity(entity){
        return new OrdersDTO(entity);
    }
}