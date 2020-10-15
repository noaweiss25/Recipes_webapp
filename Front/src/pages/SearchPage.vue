<template>
  <div>
    <h1 class="title">Search Page</h1>
    <div class="formdiv">
      <b-modal ref="my-modal2" hide-footer title>
        <div class="d-block text-center">
          <h3>
            Cant search , try to write at the search input ?
            <b-icon-emoji-angry />
          </h3>
        </div>
        <br />
      </b-modal>
      <b-form @submit.prevent="onSearch">
        <b-form-group>
          <b-input-group class="mx-auto w-50">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input id="searchQ" v-model="form.searchQ" type="text" placeholder="search..."></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Resaults:">
          <b-row class="mx-auto w-50">
            <b-form-select id="resultnum" v-model="form.number" :options="resultNum"></b-form-select>
          </b-row>
        </b-form-group>
        <b-form-group label="Choose your filters:">
          <b-row class="mx-auto w-50">
            <b-form-select id="Diet" v-model="form.Diet" :options="diets"></b-form-select>
          </b-row>
          <b-row class="mx-auto w-50">
            <b-form-select id="Cuisine" v-model="form.Cuisine" :options="cuisines"></b-form-select>
          </b-row>
          <b-row class="mx-auto w-50">
            <b-form-select id="Intolerence" v-model="form.Intolerence" :options="intolerences"></b-form-select>
          </b-row>
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
          style="width:50px;display:block;"
          class="mx-auto w-50"
        >Search</b-button>
      </b-form>
    </div>
    <div v-if="(this.statredSearch)" style="text-align:center">
      <strong>Loading...</strong>
      <b-spinner label="Spinning"></b-spinner>
      <b-spinner type="grow" label="Spinning"></b-spinner>
      <b-spinner variant="primary" label="Spinning"></b-spinner>
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
      <b-spinner variant="success" label="Spinning"></b-spinner>
      <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-if="flag" class="mt-3">
      <b-button-group>
        <b-button
          @click="sortby('time')"
          variant="dark"
          style="width:100px;display:block;"
          class="mx-auto w-100"
        >
          <b-icon-list-ol />Sort by time
        </b-button>
        <b-button
          @click="sortby('pop')"
          variant="dark"
          style="width:100px;display:block;"
          class="mx-auto w-100"
        >
          <b-icon-list-ol />Sort by popularity
        </b-button>
      </b-button-group>
      <br />
      <br />
    </div>

    <div v-if="flag" :style="gridStyle" class="grid">
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview :recipe="r" />
      </div>
    </div>
    <b-modal ref="my-modal" hide-footer title>
      <div class="d-block text-center">
        <h3>
          Sorry no results for this query
          <b-icon-emoji-frown />
        </h3>
      </div>
      <br />
    </b-modal>
  </div>
</template>

<script>
import cuisines from "../assets/cuisine";
import diets from "../assets/diets";
import intolerences from "../assets/intolrence";
import RecipePreview from "../components/RecipePreview";
export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      form: {
        searchQ: "",
        number: 5,
        Diet: null,
        Cuisine: null,
        Intolerence: null
      },
      diets: [{ value: null, text: "diet", disabled: true }],
      cuisines: [{ value: null, text: "cuisine", disabled: true }],
      intolerences: [{ value: null, text: "intolerance", disabled: true }],
      resultNum: [5, 10, 15],
      flag: false,
      noresults: false,
      recipes: [],
      numberOfColumns: 3,
      statredSearch: false
    };
  },
  mounted() {
    // console.log("mounted");
    this.intolerences.push("-");
    this.intolerences.push(...intolerences);
    this.diets.push("-");
    this.diets.push(...diets);
    this.cuisines.push("-");
    this.cuisines.push(...cuisines);
    this.checkuserSearch();
    // console.log($v);
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
      };
    }
  },

  methods: {
    checkuserSearch() {
      //console.log(this.$store.search);
      if (this.$root.store.username) {
        if (this.$store.search.length > 0) {
          this.recipes.push(...this.$store.search);
          this.flag = true;
        }
      }
    },
    sortby(el) {
      if (el == "time") {
        this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
        console.log(this.recipes);
      }
      if (el == "pop") {
        this.recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
        console.log(this.recipes);
      }
    },
    async Search() {
      if (this.form.searchQ.length == 0) {
        this.$refs["my-modal2"].show();
      } else {
        try {
          let search_params = {};
          if (this.form.Diet != null || this.form.Diet == "-") {
            search_params.diet = this.form.Diet;
          }
          if (this.form.Cuisine != null || this.form.Cuisine == "-") {
            search_params.cuisine = this.form.Cuisine;
          }
          if (this.form.Intolerence != null || this.form.Intolerence == "-") {
            search_params.intolerances = this.form.Intolerence;
          }

          const res = await this.axios.get(
            `https://recipestest1.herokuapp.com/recipes/search/query/${this.form.searchQ}/amount/${this.form.number}`,
            { params: search_params }
          );
          let all = res.data;
          all.forEach(recipe => {
            recipe.watched = false;
            recipe.favorite = false;
          });
          if (this.$root.store.username) {
            let ids = [];
            all.forEach(element => {
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
              all.forEach(recipe => {
                if (recipe.id == key) {
                  recipe.watched = res.data[key].watched;
                  recipe.favorite = res.data[key].favorite;
                }
              });
            }
          }
          this.recipes = [];
          this.recipes.push(...all);
          if (this.recipes.length > 0) {
            this.statredSearch = false;
            this.flag = true;
          } else {
            this.statredSearch = false;
            this.noresults = true;
            this.$refs["my-modal"].show();
          }
          if (this.$root.store.username) {
            if (this.$store.search.length == 0) {
              this.$store.search.push(...this.recipes);
            } else {
              this.$store.search = [];
              this.$store.search.push(...this.recipes);
            }
          }
        } catch (err) {
          console.log(err.res);
          this.form.submitError = err.res.data.message;
        }
      }
    },
    onSearch() {
      this.Search();
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-left: 300px;
}
.form {
  text-align: left;
}
.formdiv {
  margin-left: 300px;
  position: relative;
  text-align: left;
  top: 50%;
  width: 20%;
  height: 400px;
  width: 500px;
}
.formdiv2 {
  position: relative;
  text-align: center;
  top: 50%;
  width: 20%;
}
.grid {
  display: grid;
  grid-gap: 1em;
}
</style>
