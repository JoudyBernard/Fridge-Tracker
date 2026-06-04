////Converts user entities into a consistent format for responses.
export class UserDTO {
    constructor({ user_id, first_name, last_name, email, city}) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.city = city;
    }
//Creates a UserDTO instance from a raw alert entity.
    static fromEntity(entity){
        return new UserDTO(entity);
    }
}