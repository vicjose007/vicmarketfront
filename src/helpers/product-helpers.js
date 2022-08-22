import http from "../http-commons";

class ProductHelper {

    createProduct(data){
        return http.post("/Product", data);
    }
    getAllProducts(){
        return http.get("/Product");
    }
    updateProducts(id, data){
        return http.put(`/Product/${id}`, data);
    }
    deleteProducts(id){
        return http.delete(`/Product/${id}`);
    }

}
export default new ProductHelper 