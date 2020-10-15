<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.recipe_name }}</h1>
        <img :src="recipe.image" class="center" height="300" width="300" />
        <div class="mb-2">
          <br />

          <b-icon icon="clock"></b-icon>
          {{ recipe.duration }}
          <br />
          <br />
          <br />
          <br />
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
                  v-for=" r in recipe.ingredients"
                  :key="r.id"
                >{{ r.name }} - {{r.quantity}} {{r.unit}}</li>
              </ul>
            </div>
          </div>
        </b-tab>
        <b-tab title="Instructions">
          <div class="wrapped">
            <div class="round3">
              <p v-for="s in recipe._instructions" :key="s">{{ s }}</p>
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
      recipe: null
    };
  },
  async created() {
    try {
      let response;

      try {
        const id = this.$route.params.recipeId;
        let url =
          "https://recipestest1.herokuapp.com/user/fullPersonalRecipe/" + id;
        response = await this.axios.get(url);

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        recipe_name,
        instructions,
        ingredients,
        duration,
        image
      } = response.data;

      let _instructions = instructions.split("\n");
      console.log(_instructions);

      let _recipe = {
        recipe_name,
        _instructions,
        ingredients,
        duration,
        image
      };

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
.p {
  font-family: "Amaranth";
  font-size: 22px;
  color: #ffffff;
  font-display: inherit;
}
.wrapper {
  display: flex;
}
.wrapped {
  width: 85%;
  height: 60%;
  backdrop-filter: blur(4px);
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
img {
  float: left;
}
/* .recipe-header{

} */
</style>
