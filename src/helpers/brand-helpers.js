import http from "../http-commons";

class BrandHelper {

    createBrand(data){
        return http.post("/Brand", data);
    }
    getAllBrands(){
        return http.get("/Brand");
    }
    updateBrands(id, data){
        return http.put(`/Brand/${id}`, data);
    }
    deleteBrands(id){
        return http.delete(`/Brand/${id}`);
    }

}
export default new BrandHelper 