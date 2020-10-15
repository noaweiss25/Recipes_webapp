<template>
  <b-container>
    <h3>
      My personal recipes
      <slot></slot>
    </h3>
    <div v-if="(this.recipes.length==0 && haveFamRec)">
      <!-- <strong>Loading...</strong>
      <b-spinner label="Spinning"></b-spinner>
      <b-spinner type="grow" label="Spinning"></b-spinner>
      -->

      <b-button variant="dark" disabled>
        <b-spinner small type="grow"></b-spinner>Loading...
      </b-button>
    </div>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <PersonalRecipe :recipe="r" />
      </b-row>
    </b-col>
    <div v-if="!haveFamRec">
      <b-jumbotron bg-variant="dark" text-variant="white" border-variant="light">
        <template v-slot:header>Hi there rookie</template>

        <template v-slot:lead>
          We in "Recipe Planet" hope you had an easy experience signing up!
          Unfortunately you have not yet added personal recipes,
          We will add this option soon, in the meantime enjoy the collection of recipes offered on the site
          you can explore via the 'explore recipes'
          button on the bottom of the "
          <router-link :to="{ name: 'main' }">Home</router-link>" screen or use our excellent search system
        </template>

        <hr class="my-4" />
      </b-jumbotron>
    </div>
  </b-container>
</template>

<script>
import PersonalRecipe from "../components/PersonalRecipe";
export default {
  components: {
    PersonalRecipe
  },

  data() {
    return {
      recipes: [],
      haveFamRec: true,
      privatesOfUser: false
    };
  },
  mounted() {
    this.checkuser();
    this.updateRecipes();
  },
  methods: {
    checkuser() {
      if (this.$store.private.length > 0) {
        console.log("cameback");
        this.recipes.push(...this.$store.private);
        this.privatesOfUser == true;
      }
    },
    async updateRecipes() {
      if (this.privatesOfUser == false) {
        try {
          let endpoint = "";
          endpoint =
            "https://recipestest1.herokuapp.com/user/getpersonalrecipes";
          const response = await this.axios.get(endpoint, {
            withCredentials: true
          });
          if (response.status == 204) {
            this.haveFamRec = false;
          }
          this.recipes = [];
          this.recipes.push(...response.data);
          if (this.$store.private.length == 0) {
            console.log("first time");
            this.$store.private.push(...this.recipes);
          }
          // console.log(this.recipes);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style>
</style>