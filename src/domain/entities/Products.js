//Creates products entity with fields.
export class Products{
    constructor({ prod_id = null, prod_name, prod_price}) {
        this.prod_id = prod_id;
        this.prod_name = prod_name;
        this.prod_price = prod_price;
    }
}