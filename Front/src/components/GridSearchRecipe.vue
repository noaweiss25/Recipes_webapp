<template>
  <div>
    <h2>serch results for :</h2>
    <div class="grid">
      <div v-for="r in recipes" :key="r.id">
        <personalRecipe :recipe="r" />
      </div>
    </div>
  </div>
</template>

<script>
import personalRecipe from "./RecipePreview";
export default {
  name: "GridSearchRecipe",
  components: {
    personalRecipe
  },
  data() {
    return {
      recipes: []
    };
  },

  created() {
    this.searchAndOreder();
  },
  methods: {
    async searchAndOreder() {
      try {
        let endpoint = "";
        endpoint = "https://recipestest1.herokuapp.com/user/getfamilyrecipes";
        const response = await this.axios.get(endpoint, {
          withCredentials: true
        });
        if (response.status == 204) {
          this.haveFamRec = false;
        }
        this.recipes = [];
        this.recipes.push(...response.data);
      } catch (err) {
        console.log(err.res);
        this.form.submitError = err.res.data.message;
      }
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(80px, auto);
}
</style>