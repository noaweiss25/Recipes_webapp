<template>
   <b-container>
    <RecipePreviewList rType="favorite" title="my favorite Recipes" />
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
};
</script>

<style>
</style>