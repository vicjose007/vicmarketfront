<template>
  <div class="product" id="ProductBack">
    <nav>
      <router-link to="/users" class="btn btn-success" id="ButtonA"
        >Users <i class="fa-solid fa-user-astronaut"></i
      ></router-link>
      |
      <router-link to="/brands" class="btn btn-success"
        >Brands <i class="fa-regular fa-bookmark"></i
      ></router-link>
      |
      <router-link to="/shoppingList" class="btn btn-success"
        >ShoppingList <i class="fa-regular fa-pen-to-square"></i></router-link>
      |
      <router-link to="/markets" class="btn btn-success"
        >Markets <i class="fa-brands fa-shopify"></i
      ></router-link>
      <div
        class="card bg-light text-dark"
        style="width: 12rem; border-radius: 1rem"
        id="Table"
      >
        <h1 class="fw-bold mb-2 text-uppercase">Product</h1>
      </div>
      <b-button @click="setFormProduct()" v-b-modal.CreateProduct id="ButtonB"
        >Create Product <i class="fa-solid fa-circle-plus"></i
      ></b-button>
      <b-modal id="CreateProduct" title="Insert product data">
        <p class="row">
          <b> Product Name </b>
          <input type="text" v-model="formProduct.productName" />
          <b> Price </b>
          <input type="text" v-model="formProduct.price" />
          />
        </p>
        <b-button class="btn btn-success" @click="createProduct()"
          >Add Product</b-button
        >
      </b-modal>
    </nav>
    <!-- <pre>{{Products}}</pre> -->
    <div
      class="card bg-light text-dark"
      style="width: 77rem; border-radius: 1rem"
      id="Table"
    >
      <table class="table bordered striped #e3f2fd blue lighten-5">
        <thead>
          <th>Product Name</th>
          <th>Location</th>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.productName }}</td>
            <td>{{ product.price }}</td>

            <td>
              <b-button variant="danger" @click="eraseProduct(product.id)"
                >Delete <i class="fa-regular fa-trash-can"></i
              ></b-button>
              |
              <b-button
                variant="btn btn-primary"
                @click="setFormProduct(product)"
                v-b-modal="'modal-' + product.id"
                >Update <i class="fa-solid fa-pen"></i
              ></b-button>
              <b-modal :id="'modal-' + product.id" title="Update user data">
                <p class="row">
                  <b> Product Name </b>
                  <input type="text" v-model="formProduct.productName" />
                  <b> Price </b>
                  <input type="text" v-model="formProduct.price" />
                </p>
                <b-button
                  class="btn btn-success"
                  @click="updateProduct(product.id)"
                  >Update Product</b-button
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
import ProductHelper from "../helpers/product-helpers.js";
export default {
  name: "ProductView",
  mounted() {
    this.getProduct();
    this.formProduct = {};
  },
  data() {
    return {
      products: [],
      formProduct: {
        productName: "",
        price: "",
      },
    };
  },
  methods: {
    async getProduct() {
      const response = await ProductHelper.getAllProducts();
      this.products = response.data;
      console.log(this.products);
    },
    async eraseProduct(id) {
      try {
        const response = await ProductHelper.deleteProducts(id);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async createProduct() {
      try {
        const response = await ProductHelper.createProduct(this.formProduct);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(id) {
      try {
        const response = await ProductHelper.updateProducts(
          id,
          this.formProduct
        );
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
#ProductBack {
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
