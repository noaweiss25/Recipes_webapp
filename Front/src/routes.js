import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import PrivateRec from "./pages/PrivateRecipesPage";
import FamilyRec from "./pages/FamilyRecipesPage";
import FavoriteRec from "./pages/FavoriteRecipesPage";
import AboutUs from "./pages/AboutPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },

  {
    path: "/privateRecipes",
    name: "privateRec",
    component: PrivateRec,
  },

  {
    path: "/about",
    name: "About",
    component: AboutUs,
  },

  {
    path: "/FamilyRecipes",
    name: "FamilyRec",
    component: FamilyRec,
  },

  {
    path: "/FavoriteRecipes",
    name: "FavoriteRec",
    component: FavoriteRec,
  },

  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },

  {
    path: "/familyRecipe/:recipeId",
    name: "familyrecipe",
    component: () => import("./pages/FamilyViewPage"),
  },

  {
    path: "/privateRecipe/:recipeId",
    name: "privaterecipe",
    component: () => import("./pages/PrivateViewPage"),
  },



  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
