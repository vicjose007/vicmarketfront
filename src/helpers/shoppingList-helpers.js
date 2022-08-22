import http from "../http-commons";

class ShoppingListHelper {

    createShoppingList(data){
        return http.post("/ShoppingList", data);
    }
    getAllShoppingLists(){
        return http.get("/ShoppingList");
    }
    updateShoppingLists(id, data){
        return http.put(`/ShoppingList/${id}`, data);
    }
    deleteShoppingLists(id){
        return http.delete(`/ShoppingList/${id}`);
    }

}
export default new ShoppingListHelper 