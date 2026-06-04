//Data Transfer Object (DTO) for orders including detailed information about related user data. Used for repository queries that return joined data.
export class OrderWithDetailsDTO{
    constructor({order_no = null, user_id, date, status = 'pending', first_name, last_name, email, city}){
    //orders table
        this.order_no = order_no;
        this.user_id = user_id;
        this.date = date;
        this.status = status;
    //user table
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.city = city;
    }
//Creates an OrderWithDetailsDTO instance from a raw entity containing order and user information.
    static fromEntity(entity){
        return new OrderWithDetailsDTO(entity);
    }
}