<template>
  <div id="personal">
    <b-card
      id="preview"
      header-text-variant="white"
      header-bg-variant="dark"
      :header="recipe.recipe_name"
      style="max-width: 22rem;min-width: 22rem;max-height:32rem;min-height:32rem"
      class="mb-5 bg-white rounded"
    >
      <router-link
        v-if="!recipe.author"
        :to="{ name: 'privaterecipe', params: { recipeId: recipe.recipe_id } }"
        class="recipe-preview"
      >
        <b-card-img :src="recipe.image" img-alt="Image" img-top height="275" width="250" />
      </router-link>
      <router-link
        v-if="recipe.author"
        :to="{ name: 'familyrecipe', params: { recipeId: recipe.recipe_id } }"
        class="recipe-preview"
      >
        <b-card-img :src="recipe.image" img-alt="Image" img-top height="275" width="250" />
      </router-link>
      <b-card-text>
        <ul class="recipe-overview">
          <li>{{ recipe.duration }}</li>
          <li v-if="recipe.author">By: {{ recipe.author }}</li>
          <li v-if="recipe.occasions">Occasions: {{ recipe.occasions }}</li>
        </ul>
      </b-card-text>
    </b-card>
  </div>
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
  }
};
</script>
    
<style>
#personal {
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
</style>