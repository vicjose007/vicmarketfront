import http from "../http-commons";

class MarketHelper {

    createMarket(data){
        return http.post("/Market", data);
    }
    getAllMarkets(){
        return http.get("/Market");
    }
    updateMarkets(id, data){
        return http.put(`/Market/${id}`, data);
    }
    deleteMarkets(id){
        return http.delete(`/Market/${id}`);
    }

}
export default new MarketHelper 