<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <nav class="navbar navbar-light" id="logo">
      <form class="form-inline">
        <router-link to="/" class="btn btn-outline-success">
          Login <i class="fa-solid fa-right-to-bracket"></i
        ></router-link> |
        <router-link to="/signIn" class="btn btn-outline-success"
          >Sign In <i class="fa-solid fa-address-card"></i
        ></router-link>
      </form>
    </nav>
    <router-view></router-view>

    <footer
      class="page-footer font-small teal pt-4"
      style="background-color: khaki"
    >
      <div class="container-fluid text-center text-md-left">
        <div class="row">
          <div class="col-md-6 mt-md-0 mt-3">
            <h5 class="text-uppercase font-weight-bold">Vic</h5>
            <p></p>
          </div>

          <div class="col-md-6 mb-md-0 mb-3">
            <h5 class="text-uppercase font-weight-bold">Market</h5>
            <p></p>
          </div>
        </div>
      </div>

      <div class="footer-copyright text-center py-3">
        © 2022 Copyright:
        <a href="/"> VicMarket.com</a>
      </div>
    </footer>
  </div>
</template>

<style>
#logo{background-color:khaki;}
</style>
