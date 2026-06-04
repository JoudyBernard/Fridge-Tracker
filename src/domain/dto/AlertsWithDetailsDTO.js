//Data Transfer Object (DTO) for alerts including detailed information about related products and user data. Used for repository queries that return joined data.
export class AlertsWithDetailsDTO{
    constructor({alert_id = null, f_id, user_id, description, date, prod_id, quantity, first_name, last_name, email, city}){
    //alert table    
        this.alert_id = alert_id;
        this.f_id = f_id;
        this.user_id = user_id;
        this.description = description;
        this.date = date;

    //products table
        this.prod_id = prod_id;
        this.quantity = quantity;

    //users table
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.city = city;
    }
    //Creates an AlertsWithDetailsDTO instance from a raw entity containing alert, product, and user information.
    static fromEntity(entity){
        return new AlertsWithDetailsDTO(entity);
    }
}