//Converts products entities into a consistent format for responses
export class ProductsDTO {
    constructor({ prod_id, prod_name, prod_price }) {
        this.prod_id = prod_id;
        this.prod_name = prod_name;
        this.prod_price = prod_price;
    }
//Creates a ProductsDTO instance from a raw alert entity.
    static fromEntity(entity){
        return new ProductsDTO(entity);
    }
}