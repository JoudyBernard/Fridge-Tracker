//Converts alert entities into a consistent format for responses.
import moment from 'moment';
export class AlertDTO{
    constructor({alert_id = null, f_id, user_id, description, date = null}){
        this.alert_id = alert_id;
        this.f_id = f_id;
        this.user_id = user_id;
        this.description = description;
        this.date = moment(date).format("YYYY-MM-DD");
    }
//Creates an AlertDTO instance from a raw alert entity.
    static fromEntity(entity){
        return new AlertDTO(entity);
    }


}