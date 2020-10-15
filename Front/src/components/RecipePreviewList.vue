<template>
  <div>
    <div>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
      <div v-if="(this.recipes.length==0 && haveRec)">
        <!-- <strong>Loading...</strong>
      <b-spinner label="Spinning"></b-spinner>
      <b-spinner type="grow" label="Spinning"></b-spinner>
        -->

        <b-button variant="dark" disabled>
          <b-spinner small type="grow"></b-spinner>Loading...
        </b-button>
      </div>
      <b-card-group deck class="cardgroup" v-for="r in recipes" :key="r.id">
        <RecipePreview :recipe="r" :key="update" />
      </b-card-group>
    </div>
    <div v-if="!haveRec">
      <b-jumbotron bg-variant="dark" text-variant="white" border-variant="light">
        <template v-slot:header>Hi there rookie</template>

        <template v-slot:lead>
          We in Recipe Planet hope you had an easy experience signing up!
          you can explore via the 'explore recipes'
          button on the bottom of the "
          <router-link :to="{ name: 'main' }">Home</router-link>" screen or use our excellent search system
        </template>

        <hr class="my-4" />

        <p>Dont forget to add your favorite recipes for not losing track !</p>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    rType: {
      type: String,
      required: false,
      default: "MyRecipe"
    }
  },
  data() {
    return {
      recipes: [],
      update: false,
      favoritesOfUser: false,
      haveRec: true
    };
  },
  mounted() {
    this.checkuser();
    this.updateRecipes();
  },

  methods: {
    checkuser() {
      if (this.$root.store.username && this.rType == "favorite") {
        if (this.$store.favorites.length > 0) {
          this.recipes.push(...this.$store.favorites);
          this.favoritesOfUser == true;
        }
      }
    },
    async updateRecipes() {
      if (this.favoritesOfUser == false) {
        try {
          const type = this.rType;
          let endpoint = "";
          if (type == "rand") {
            endpoint =
              "https://recipestest1.herokuapp.com/recipes/randomrecipe";
          } else if (type == "lastSeen" && this.$root.store.username) {
            endpoint = "https://recipestest1.herokuapp.com/user/lastseen";
          } else if (type == "favorite" && this.$root.store.username) {
            endpoint = "https://recipestest1.herokuapp.com/user/getFavorites";
          }
          const response = await this.axios.get(endpoint, {
            withCredentials: true
          });
          const recipes = response.data;
          if (response.status == 204) {
            this.haveRec = false;
          }

          recipes.forEach(recipe => {
            recipe.watched = false;
            recipe.favorite = false;
          });

          if (this.$root.store.username) {
            let ids = [];
            recipes.forEach(element => {
              ids.push(element.id);
            });

            const res = await this.axios.get(
              "https://recipestest1.herokuapp.com/user/recipeInfo/" +
                JSON.stringify(ids),
              {
                withCredentials: true
              }
            );

            for (let key in res.data) {
              recipes.forEach(recipe => {
                if (recipe.id == key) {
                  recipe.watched = res.data[key].watched;
                  recipe.favorite = res.data[key].favorite;
                }
              });
            }
          }
          this.recipes = [];
          this.recipes.push(...recipes);
          if (this.$root.store.username && this.rType == "favorite") {
            if (this.$store.favorites.length == 0) {
              this.$store.favorites.push(...this.recipes);
            }
          }
          // console.log(this.recipes);
        } catch (error) {
          console.log(error);
        }
      }
    },
    updateChilds() {
      if (update == true) {
        update = false;
      } else {
        update = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cardgroup {
  display: flex;
}

#containers {
  /*gradient*/
  background: #666666; /* old browsers */
  background: -moz-linear-gradient(
    top,
    #666666 4%,
    #545454 50%,
    #3a3a3a 51%,
    #131313 100%
  ); /* firefox */

  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(4%, #666666),
    color-stop(50%, #545454),
    color-stop(51%, #3a3a3a),
    color-stop(100%, #131313)
  ); /* webkit */

  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#666666', endColorstr='#131313',GradientType=0 ); /* ie */

  /*box styles*/
  height: 200px;
  width: 400px;
  // margin: 50px auto;

  /*shadow*/
  -webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

  /*corners*/
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
}
</style>
