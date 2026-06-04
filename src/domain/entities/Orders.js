//Creates orders entity with fields.
export class Orders{
    constructor({order_no = null, user_id, date = null, status = 'pending' }){
        this.order_no = order_no;
        this.user_id = user_id;
        this.date = date;
    }
}