<template>
  <div class="shoppingList" id="ShoppingListBack">
    <nav>
      <router-link to="/users" class="btn btn-success" id="ButtonA"
        >Users <i class="fa-solid fa-users"></i
      ></router-link>
      |
      <router-link to="/brands" class="btn btn-success"
        >Brands <i class="fa-regular fa-bookmark"></i></router-link>
      |
      <router-link to="/markets" class="btn btn-success"
        >Markets <i class="fa-brands fa-shopify"></i></router-link>
      |
      <router-link to="/products" class="btn btn-success"
        >Products <i class="fa-regular fa-lemon"></i></router-link>
      <div
        class="card bg-light text-dark"
        style="width: 20rem; border-radius: 1rem"
        id="Table"
      >
        <h1 class="fw-bold mb-2 text-uppercase">ShoppingList</h1>
      </div>
      <b-button
        @click="setFormShoppingList()"
        v-b-modal.CreateShoppingList
        id="ButtonB"
        >Create ShoppingList <i class="fa-solid fa-notes-medical"></i
      ></b-button>
      <b-modal id="CreateShoppingList" title="Insert shoppingList data">
        <p class="row">
          <b> User </b>
          <select v-model="selectedUser">
            <option selected value="">--all--</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <b> Brand </b>
          <select v-model="selectedBrand">
            <option selected value="">--all--</option>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.brandName }}
            </option>
          </select>
          <b> Product </b>
          <select v-model="selectedProduct">
            <option selected value="">--all--</option>
            <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
            >
              {{ product.productName }}
            </option>
          </select>
          <b> Market </b>
          <select v-model="selectedProduct">
            <option selected value="">--all--</option>
            <option
              v-for="market in markets"
              :key="market.id"
              :value="market.id"
            >
              {{ market.marketName }}
            </option>
          </select>
        </p>
        <b-button class="btn btn-success" @click="createShoppingList()"
          >Create ShoppingList</b-button
        >
      </b-modal>
    </nav>
    <!-- <pre>{{users}}</pre> -->
    <div
      class="card bg-light text-dark"
      style="width: 77rem; border-radius: 1rem"
      id="Table"
    >
      <table class="table bordered striped #e3f2fd blue lighten-5">
        <thead>
          <th>User</th>
          <th>Brand</th>
          <th>Product</th>
          <th>Market</th>
        </thead>

        <tbody>
          <tr v-for="shoppingList in shoppingLists" :key="shoppingList.id">
            <td>{{ shoppingList.user.name }}</td>
            <td>{{ shoppingList.brand.brandName }}</td>
            <td>{{ shoppingList.product.productName }}</td>
            <td>{{ shoppingList.market.marketName }}</td>
            <td>
              <b-button
                variant="danger"
                @click="eraseShoppingList(shoppingList.id)"
                >Delete <i class="fa-regular fa-trash-can"></i>
              </b-button>
              |
              <b-button
                variant="btn btn-primary"
                @click="setFormShoppingList(shoppingList)"
                v-b-modal="'modal-' + shoppingList.id"
                >Update <i class="fa-solid fa-pen"></i>
              </b-button>
              <b-modal
                :id="'modal-' + shoppingList.id"
                title="Update shoppingList data"
              >
                <p class="row">
                  <input type="date" v-model="formShoppingList.date" />
                  <b> User </b>
                  <select v-model="selectedUser">
                    <option selected value="">--all--</option>
                    <option
                      v-for="user in users"
                      :key="user.id"
                      :value="user.id"
                    >
                      {{ user.name }}
                    </option>
                  </select>
                  <b> Brand </b>
                  <select v-model="selectedBrand">
                    <option selected value="">--all--</option>
                    <option
                      v-for="brand in brands"
                      :key="brand.id"
                      :value="brand.id"
                    >
                      {{ brand.brandName }}
                    </option>
                  </select>
                  <b> Product </b>
                  <select v-model="selectedProduct">
                    <option selected value="">--all--</option>
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.id"
                    >
                      {{ product.productName }}
                    </option>
                  </select>
                  <b> Market </b>
                  <select v-model="selectedMarket">
                    <option selected value="">--all--</option>
                    <option
                      v-for="market in markets"
                      :key="market.id"
                      :value="market.id"
                    >
                      {{ market.marketName }}
                    </option>
                  </select>
                </p>
                <b-button
                  class="btn btn-success"
                  @click="updateShoppingList(shoppingList.id)"
                  >Update ShoppingList</b-button
                >
              </b-modal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ShoppingListHelper from "../helpers/shoppingList-helpers.js";
import BrandHelper from "../helpers/brand-helpers.js";
import UserHelper from "../helpers/users-helpers.js";
import ProductHelper from "../helpers/product-helpers.js";
import MarketHelper from "../helpers/market-helpers.js";

export default {
  name: "ShoppingListView",
  mounted() {
    this.getShoppingList();
    this.getUser();
    this.getBrand();
    this.getProduct();
    this.getMarket();
    this.formShoppingList = {};
  },
  data() {
    return {
      shoppingLists: [],
      users: [],
      selectedUser: "",
      selectedBrand: "",
      selectedProduct: "",
      selectedMarket: "",
      brands: [],
      products: [],
      markets: [],
      formShoppingList: {
        userId: 0,
        brandId: 0,
        productId: 0,
        marketId: 0,
      },
    };
  },
  methods: {
    onChange: function (e) {
      var id = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      console.log("id ", id);
      console.log("name ", name);
    },
    async getShoppingList() {
      const response = await ShoppingListHelper.getAllShoppingLists();
      this.shoppingLists = response.data;
      console.log(this.shoppingLists);
    },
    async createShoppingList() {
      this.formShoppingList.userId = this.selectedUser;
      this.formShoppingList.brandId = this.selectedBrand;
      this.formShoppingList.productId = this.selectedProduct;
      this.formShoppingList.marketId = this.selectedMarket;
      try {
        const response = await ShoppingListHelper.createShoppingList(
          this.formShoppingList
        );
        console.log(response);
        console.log(this.shoppingLists);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async eraseShoppingList(id) {
      try {
        const response = await ShoppingListHelper.deleteShoppingLists(id);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async updateShoppingList(id) {
      this.formShoppingList.userId = this.selectedUser;
      this.formShoppingList.brandId = this.selectedBrand;
      this.formShoppingList.productId = this.selectedProduct;
      this.formShoppingList.marketId = this.selectedMarket;
      try {
        const response = await ShoppingListHelper.updateShoppingLists(
          id,
          this.formShoppingList
        );
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    setFormShoppingList(formShoppingList = {}) {
      console.log(formShoppingList);
      this.formShoppingList = formShoppingList;
    },
    async getUser() {
      const response = await UserHelper.getAllUsers();
      this.users = response.data;
      console.log(this.users);
    },
    async getBrand() {
      const response = await BrandHelper.getAllBrands();
      this.brands = response.data;
      console.log(this.brands);
    },
    async getProduct() {
      const response = await ProductHelper.getAllProducts();
      this.products = response.data;
      console.log(this.products);
    },
    async getMarket() {
      const response = await MarketHelper.getAllMarkets();
      this.markets = response.data;
      console.log(this.markets);
    },
  },
};
</script>
<style>
#ShoppingListBack {
  background-image: url("@/assets/MarketPattern.png");
}
#ButtonA {
  margin-left: 30px;
  margin-top: 10px;
}
#ButtonB {
  margin-left: 30px;
  margin-bottom: 10px;
}
#Table {
  margin-left: 30px;
}
</style>
