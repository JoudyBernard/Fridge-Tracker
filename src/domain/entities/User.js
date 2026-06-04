//Creates user entity with fields.
export class User {
  constructor({ user_id = null, first_name, last_name, email, password, city }) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name_name = last_name;
    this.email = email;
    this.password = password;
    this.city = city;
  }

}