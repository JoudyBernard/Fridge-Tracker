//Creates alert entity with fields.
export class Alerts{
    constructor({alert_id = null,f_id, user_id, description, date = null}){
        this.alert_id = alert_id;
        this.f_id = f_id;
        this.user_id = user_id;
        this.description = description;
        this.date = date;
    }
}