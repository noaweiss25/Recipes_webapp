<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 class="head">{{ recipe.title }}</h1>

        <img :src="recipe.image" height="250" width="250" />
        <div>
          <div class="mb-2">
            <div>
              <b-icon icon="clock"></b-icon>
              {{ recipe.readyInMinutes }} minutes
            </div>
            <div>
              <b-icon icon="hand-thumbs-up"></b-icon>
              Likes: {{ recipe.aggregateLikes }} likes
            </div>
            <div>
              <b-icon icon="tools"></b-icon>
              Servings: {{recipe.servings}}
            </div>
            <img v-if="recipe.vegan==true" src="../images/pngguru.com.png" height="50" width="50" />
            <img
              v-if="recipe.vegetarian==true"
              src="../images/hiclipart.com.png"
              height="50"
              width="50"
            />
            <img
              v-if="recipe.glutenFree==true"
              src="../images/marshmallow-on-stick-free-png-8-original.png"
              height="50"
              width="50"
            />
          </div>
          <b-button
            v-b-popover.hover.top="'Add to favorites'"
            @click="addfave"
            v-if="recipe.favorite==false"
          >
            <b-icon-heart font-scale="2" />
          </b-button>
          <b-modal ref="my-modal" hide-footer title>
            <div class="d-block text-center">
              <h3>Oh no, This is exclusive content!</h3>
            </div>
            <br />
            <b-button class="mt-3" variant="outline-danger" block @click="Login">Login</b-button>
            <br />

            <b-button class="mt-2" variant="outline-danger" block @click="Register">Join us!</b-button>
          </b-modal>
          <b-icon-heart-fill v-if="recipe.favorite==true " font-scale="2" animation="throb" />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <b-tabs content-class="mt-2">
        <b-tab title="Ingredients" :title-item-class="'tab-title-class'" active>
          <div class="wrapped">
            <div class="round3">
              <ul>
                <li
                  v-for=" r in recipe.extendedIngredients"
                  :key="r.id"
                >{{ r.name }} - {{r.amount}} {{r.unit}}</li>
              </ul>
            </div>
          </div>
        </b-tab>
        <b-tab title="Instructions">
          <div class="wrapped">
            <div class="round3">
              <ol>
                <li v-for="s in recipe._instructions" :key="s.number">{{ s.step }}</li>
              </ol>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      favorite: false
    };
  },
  methods: {
    async addfave() {
      if (this.$root.store.username) {
        const res1 = await this.axios.post(
          "https://recipestest1.herokuapp.com/user/addFavoriteRecipe",
          {
            id: this.$route.params.recipeId
          }
        );
        this.recipe.favorite = true;
        this.recipe.watched = true;
        this.$store.favorites.push(this.recipe);
      } else {
        this.$refs["my-modal"].show();
      }
    },
    Login() {
      this.$router.push("/login").catch(() => {
        this.$forceUpdate();
      });
    },
    Register() {
      this.$router.push("/register").catch(() => {
        this.$forceUpdate();
      });
    }
  },
  async created() {
    try {
      let response;

      try {
        const id = this.$route.params.recipeId;
        let url = "https://recipestest1.herokuapp.com/recipes/recipepage/" + id;
        response = await this.axios.get(url);

        if (response.status !== 200) this.$router.replace("/NotFound");
        if (this.$root.store.username) {
          const res = await this.axios.post(
            "https://recipestest1.herokuapp.com/user/addWatch",
            {
              id: id
            }
          );
          //const res =  await this.axios.get("https://recipestest1.herokuapp.com/user/addWatch/" + this.$route.params.recipeId)
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        id,
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        vegetarian,
        glutenFree,
        vegan,
        image,
        servings,
        title
      } = response.data;

      let _instructions = analyzedInstructions
        .map(fstep => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        id,
        instructions,
        _instructions,
        vegetarian,
        glutenFree,
        vegan,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        servings,
        title
      };
      _recipe.favorite = false;
      let ids = [];
      ids.push(_recipe.id);
      if (this.$root.store.username) {
        const res = await this.axios.get(
          "https://recipestest1.herokuapp.com/user/recipeInfo/" +
            JSON.stringify(ids),
          {
            withCredentials: true
          }
        );

        _recipe.favorite = res.data[_recipe.id].favorite;
      }

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.round3 {
  border: 2px solid white;
  border-radius: 12px;
}
.wrapper {
  display: flex;
}
.wrapped {
  width: 85%;
  height: 60%;
  backdrop-filter: blur(4px);
  color: aliceblue;
}
.wrapped2 {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.tab-title-class {
  color: white !important;
}
img {
  float: left;
}
/* .recipe-header{

} */
</style>
