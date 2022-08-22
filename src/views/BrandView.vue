<template>
  <div class="brand" id="BrandBack">
    <nav>
      <router-link to="/users" class="btn btn-success" id="ButtonA"
        >Users <i class="fa-solid fa-user-astronaut"></i
      ></router-link>
      |
      <router-link to="/markets" class="btn btn-success"
        >Markets <i class="fa-brands fa-shopify"></i></router-link>
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
        <h1 class="fw-bold mb-2 text-uppercase">Brands</h1>
      </div>
      <b-button @click="setFormBrand()" v-b-modal.CreateBrand id="ButtonB"
        >Create Brand <i class="fa-solid fa-circle-plus"></i
      ></b-button>
      <b-modal id="CreateBrand" title="Insert brand data">
        <p class="row">
          <b> Brand Name </b>
          <input type="text" v-model="formBrand.brandName" />
          <b> Details </b>
          <input type="text" v-model="formBrand.details" />
          />
        </p>
        <b-button class="btn btn-success" @click="createBrand()"
          >Add Brand</b-button
        >
      </b-modal>
    </nav>
    <!-- <pre>{{Brands}}</pre> -->
    <div
      class="card bg-light text-dark"
      style="width: 77rem; border-radius: 1rem"
      id="Table"
    >
      <table class="table bordered striped #e3f2fd blue lighten-5">
        <thead>
          <th>Brand Name</th>
          <th>Details</th>
        </thead>

        <tbody>
          <tr v-for="brand in brands" :key="brand.id">
            <td>{{ brand.brandName }}</td>
            <td>{{ brand.details }}</td>

            <td>
              <b-button variant="danger" @click="eraseBrand(brand.id)"
                >Delete <i class="fa-regular fa-trash-can"></i
              ></b-button>
              |
              <b-button
                variant="btn btn-primary"
                @click="setFormBrand(brand)"
                v-b-modal="'modal-' + brand.id"
                >Update <i class="fa-solid fa-pen"></i
              ></b-button>
              <b-modal :id="'modal-' + brand.id" title="Update user data">
                <p class="row">
                  <b> Brand Name </b>
                  <input type="text" v-model="formBrand.brandName" />
                  <b> Details </b>
                  <input type="text" v-model="formBrand.details" />
                </p>
                <b-button
                  class="btn btn-success"
                  @click="updateBrand(brand.id)"
                  >Update Brand</b-button
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
import BrandHelper from "../helpers/brand-helpers.js";
export default {
  name: "BrandView",
  mounted() {
    this.getBrand();
    this.formBrand = {};
  },
  data() {
    return {
      brands: [],
      formBrand: {
        brandName: "",
        details: "",
      },
    };
  },
  methods: {
    async getBrand() {
      const response = await BrandHelper.getAllBrands();
      this.brands = response.data;
      console.log(this.brands);
    },
    async eraseBrand(id) {
      try {
        const response = await BrandHelper.deleteBrands(id);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async createBrand() {
      try {
        const response = await BrandHelper.createBrand(this.formBrand);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async updateBrand(id) {
      try {
        const response = await BrandHelper.updateBrands(id, this.formBrand);
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
#BrandBack {
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