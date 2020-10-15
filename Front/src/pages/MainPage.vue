<template >
  <div class="containerimage">
    <!-- <b-alert
      class="mx-auto w-25"
      v-if="!$root.store.username"
      variant="success"
      dismissible
      show
    >Hello guest</b-alert> -->

    <b-container>
      <b-row>
        <b-col>
          <RecipePreviewList
            :key="random"
            rType="rand"
            title="Explore our world"
            class="RandomRecipes center"
            ref="randRef"
          />
          <b-col cols="1">
            <b-button class="mb-2" variant="outline-danger" @click="getRandom">
              <b-iconstack font-scale="3" animation="cylon-vertical" @click="getRandom">
                <b-icon stacked icon="square"></b-icon>
                <b-icon stacked icon="dot" shift-h="-3" shift-v="4"></b-icon>
                <b-icon stacked icon="dot" shift-h="-3"></b-icon>
                <b-icon stacked icon="dot" shift-h="-3" shift-v="-4"></b-icon>
                <b-icon stacked icon="dot" shift-h="3" shift-v="4"></b-icon>
                <b-icon stacked icon="dot" shift-h="3"></b-icon>
                <b-icon stacked icon="dot" shift-h="3" shift-v="-4"></b-icon>
              </b-iconstack>
              <p>Explore recipes</p>
            </b-button>
          </b-col>
        </b-col>

        <b-col>
          <div class="notConnected" v-if="!$root.store.username">
            <LoginPage :loginMain="refreshPreviews" style=" margin-left: -50px;" />
          </div>
          <RecipePreviewList
            v-if="$root.store.username"
            title="My last seen"
            rType="lastSeen"
            class="RandomRecipes center"
          ></RecipePreviewList>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginPage from "../pages/LoginPage";
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
    LoginPage
  },
  data() {
    return {
      random: 1
    };
  },
  watch: {},
  methods: {
    async getRandom() {
      this.random += 1;
    },
    refreshPreviews() {
      this.$refs.randRef.updateChilds();
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
