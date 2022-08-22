<template>
  <div class="market" id="MarketBack">
    <nav>
      <router-link to="/users" class="btn btn-success" id="ButtonA"
        >Users <i class="fa-solid fa-user-astronaut"></i
      ></router-link>
      |
      <router-link to="/brands" class="btn btn-success"
        >Brands <i class="fa-regular fa-bookmark"></i></router-link>
      |
      <router-link to="/products" class="btn btn-success"
        >Products <i class="fa-regular fa-lemon"></i></router-link>
      |
      <router-link to="/shoppingList" class="btn btn-success"
        >ShoppingList <i class="fa-regular fa-pen-to-square"></i></router-link>
      <div
        class="card bg-light text-dark"
        style="width: 12rem; border-radius: 1rem"
        id="Table"
      >
        <h1 class="fw-bold mb-2 text-uppercase">Markets</h1>
      </div>
      <b-button @click="setFormMarket()" v-b-modal.CreateMarket id="ButtonB"
        >Create Market <i class="fa-solid fa-circle-plus"></i
      ></b-button>
      <b-modal id="CreateMarket" title="Insert market data">
        <p class="row">
          <b> Market Name </b>
          <input type="text" v-model="formMarket.marketName" />
          <b> Location </b>
          <input type="text" v-model="formMarket.location" />
          />
        </p>
        <b-button class="btn btn-success" @click="createMarket()"
          >Add Market</b-button
        >
      </b-modal>
    </nav>
    <!-- <pre>{{Markets}}</pre> -->
    <div
      class="card bg-light text-dark"
      style="width: 77rem; border-radius: 1rem"
      id="Table"
    >
      <table class="table bordered striped #e3f2fd blue lighten-5">
        <thead>
          <th>Market Name</th>
          <th>Location</th>
        </thead>

        <tbody>
          <tr v-for="market in markets" :key="market.id">
            <td>{{ market.marketName }}</td>
            <td>{{ market.location }}</td>

            <td>
              <b-button variant="danger" @click="eraseMarket(market.id)"
                >Delete <i class="fa-regular fa-trash-can"></i
              ></b-button>
              |
              <b-button
                variant="btn btn-primary"
                @click="setFormMarket(market)"
                v-b-modal="'modal-' + market.id"
                >Update <i class="fa-solid fa-pen"></i
              ></b-button>
              <b-modal :id="'modal-' + market.id" title="Update user data">
                <p class="row">
                  <b> Market Name </b>
                  <input type="text" v-model="formMarket.marketName" />
                  <b> Location </b>
                  <input type="text" v-model="formMarket.experience" />
                </p>
                <b-button
                  class="btn btn-success"
                  @click="updateMarket(market.id)"
                  >Update Market</b-button
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
import MarketHelper from "../helpers/market-helpers.js";
export default {
  name: "MarketView",
  mounted() {
    this.getMarket();
    this.formMarket = {};
  },
  data() {
    return {
      markets: [],
      formMarket: {
        marketName: "",
        location: "",
      },
    };
  },
  methods: {
    async getMarket() {
      const response = await MarketHelper.getAllMarkets();
      this.markets = response.data;
      console.log(this.markets);
    },
    async eraseMarket(id) {
      try {
        const response = await MarketHelper.deleteMarkets(id);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async createMarket() {
      try {
        const response = await MarketHelper.createMarket(this.formMarket);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async updateMarket(id) {
      try {
        const response = await MarketHelper.updateMarkets(id, this.formMarket);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
#MarketBack {
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
