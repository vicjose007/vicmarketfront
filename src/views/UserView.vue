<template>
  <div class="user" id="UserBack">
    <nav>
      <router-link to="/markets" class="btn btn-success" id="ButtonA"
        >Markets <i class="fa-brands fa-shopify"></i></router-link>
      |
      <router-link to="/brands" class="btn btn-success"
        >Brands <i class="fa-regular fa-bookmark"></i></router-link>
      |
      <router-link to="/shoppingList" class="btn btn-success"
        >ShoppingList <i class="fa-regular fa-pen-to-square"></i></router-link>
      |
      <router-link to="/products" class="btn btn-success"
        >Products <i class="fa-regular fa-lemon"></i
      ></router-link>
      <div
        class="card bg-light text-dark"
        style="width: 8rem; border-radius: 1rem"
        id="Table"
      >
        <h1 class="fw-bold mb-2 text-uppercase">Users</h1>
      </div>
      <b-button @click="setFormUser()" v-b-modal.Create id="ButtonB"
        >Create User <i class="fa-solid fa-user-plus"></i
      ></b-button>
      <b-modal id="Create" title="Insert user data">
        <p class="row">
          <b> Email </b>
          <input type="text" v-model="formUser.email" />
          <b> Name </b>
          <input type="text" v-model="formUser.name" />
          <b> Password </b>
          <input type="text" v-model="formUser.password" />
        </p>
        <b-button class="btn btn-success" @click="createUser()"
          >Add User</b-button
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
          <th>Email</th>
          <th>Name</th>
          <th>Password</th>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.password }}</td>
            <td>
              <b-button variant="danger" @click="eraseUser(user.id)"
                >Delete <i class="fa-regular fa-trash-can"></i>
              </b-button>
              |
              <b-button
                variant="btn btn-primary"
                @click="setFormUser(user)"
                v-b-modal="'modal-' + user.id"
                >Update <i class="fa-solid fa-pen"></i>
              </b-button>
              <b-modal :id="'modal-' + user.id" title="Update user data">
                <p class="row">
                  <b> Email </b>
                  <input type="text" v-model="formUser.email" />
                  <b> Name </b>
                  <input type="text" v-model="formUser.name" />
                  <b> Password </b>
                  <input type="text" v-model="formUser.password" />
                </p>
                <b-button class="btn btn-success" @click="updateUser(user.id)"
                  >Update User</b-button
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
import UserHelper from "../helpers/users-helpers.js";
export default {
  name: "UserView",
  mounted() {
    this.getUser();
    this.formUser = {};
  },
  data() {
    return {
      users: [],
      formUser: {
        email: "",
        name: "",
        password: "",
      },
    };
  },
  methods: {
    async getUser() {
      const response = await UserHelper.getAllUsers();
      this.users = response.data;
      console.log(this.users);
    },
    async createUser() {
      try {
        const response = await UserHelper.createUser(this.formUser);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async eraseUser(id) {
      try {
        const response = await UserHelper.deleteUser(id);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser(id) {
      try {
        const response = await UserHelper.updateUser(id, this.formUser);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    setFormUser(formUser = {}) {
      console.log(formUser);
      this.formUser = formUser;
    },
  },
};
</script>
<style>
#UserBack {
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
