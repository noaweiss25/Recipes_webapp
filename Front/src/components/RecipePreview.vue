<template>
  <b-card
    id="preview"
    header-text-variant="white"
    header-bg-variant="dark"
    :header="recipe.title"
    style="max-width: 22rem;min-width: 22rem;max-height:32rem;min-height:32rem"
    class="mb-5 bg-white rounded"
  >
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
      <b-card-img v-if="recipe.image" :src="recipe.image" id="img" />
      <b-icon v-else icon="cloud-slash" font-scale="7.5"></b-icon>
    </router-link>
    <div class="signs">
      <b-button
        v-b-popover.hover.top="'Add to favorites'"
        id="toggle-btn"
        v-if="recipe.favorite==false"
        variant="light"
        @click="addfave"
      >
        <b-icon-heart v-if="recipe.favorite==false " font-scale="2" />
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
      <div class="divider" />
      <b-icon-heart-fill v-if="recipe.favorite==true " font-scale="2" animation="throb" />
      <div class="divider" />
      <b-icon-eye-fill v-if="recipe.watched==true " font-scale="2" />
    </div>
    <b-card-text>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <b-row>
        <b-col v-if="recipe.vegan==true">
          <img src="../images/pngguru.com.png" height="60" width="60" />
        </b-col>
        <b-col v-if="recipe.vegetarian==true">
          <img src="../images/hiclipart.com.png" height="60" width="60" />
        </b-col>
        <b-col v-if="recipe.glutenFree==true">
          <img src="../images/marshmallow-on-stick-free-png-8-original.png" height="60" width="60" />
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },

  methods: {
    async addfave() {
      try {
        if (this.$root.store.username) {
          const res1 = await this.axios.post(
            "https://recipestest1.herokuapp.com/user/addFavoriteRecipe",
            {
              id: this.$props.recipe.id
            }
          );
          this.recipe.favorite = true;
          this.recipe.watched = true;
          this.$store.favorites.push(this.recipe);
          console.log(this.$store.favorites);
        } else {
          this.$refs["my-modal"].show();
        }
      } catch (err) {
        console.log(err);
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
  }
};
</script>

<style scoped>
#preview {
  color: black;
}
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}
.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.divider {
  width: 5px;
  height: auto;
  display: inline-block;
}

#img:hover {
  transform: scale(1.06);

  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
</style>
