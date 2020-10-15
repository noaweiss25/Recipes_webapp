<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Amaranth" rel="stylesheet" />
    <b-navbar type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'main' }">
          <img src="./images/chili.png" height="40" width="120" />
        </b-nav-item>
        <b-nav-item :to="{ name: 'main' }">
          <b-icon icon="house-door-fill" />Home
        </b-nav-item>
        <!-- <router-link :to="{ name: 'main' }"></router-link>Home -->

        <b-nav-item :to="{ name: 'search' }">
          <b-icon icon="search" />Search
        </b-nav-item>
        <b-nav-item :to="{ name: 'About' }">
          <b-icon icon="info-circle" />About
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
              <b-nav-item
          size="sm"
          class="mr-sm-2"
          v-if="!($root.store.username)"
        >hello guest</b-nav-item>
        <b-nav-item v-if="!$root.store.username" class="legislate" :to="{ name: 'register' }">
          <b-icon icon="pencil" rotate="270" />Register
        </b-nav-item>
        <b-nav-item v-if="!$root.store.username" class="legislate" :to="{ name: 'login' }">
          <b-icon icon="people" />Login
        </b-nav-item>
        <b-nav-item
          size="sm"
          class="mr-sm-2"
          v-if="$root.store.username"
        >{{ $root.store.username }}:</b-nav-item>

   

        <!-- Navbar dropdowns -->

        <b-nav-item-dropdown v-if="$root.store.username" text="Account" right>
          <router-link :to="{ name: 'FavoriteRec' }" tag="b-dropdown-item">Favorite recipes</router-link>
          <router-link :to="{ name: 'privateRec' }" tag="b-dropdown-item">Private Recipes</router-link>
          <router-link :to="{ name: 'FamilyRec' }" tag="b-dropdown-item">Family recipes</router-link>
        </b-nav-item-dropdown>
        <b-nav-item v-if="$root.store.username">
          <b-button @click="Logout">
            <b-icon icon="power" aria-hidden="true" font-scale="1"></b-icon>Logout
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  methods: {
    async Logout() {
      this.$root.store.logout();
      const response = await this.axios.post(
        "https://recipestest1.herokuapp.com/guest/logout",
        {}
      );
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$store.search = [];
      this.$store.favorites = [];
      this.$store.family = [];
      this.$store.private = [];
      this.$store.favorites = [];
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>


<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  background-image: url(./images/3218521.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  font-family: "Amaranth";
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  min-height: 100vh;
}

#nav {
  padding: 30px;
  font-family: "Amaranth";
  font-size: 22px;
}

#nav a {
  font-weight: bold;
  font-family: "Amaranth";
  font-size: 22px;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
