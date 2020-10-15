import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
axios.defaults.withCredentials = true;
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  ModalPlugin,
  InputGroupPlugin,
  ButtonGroupPlugin,
  PopoverPlugin,
  SpinnerPlugin,
  TabsPlugin,
  JumbotronPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  ModalPlugin,
  InputGroupPlugin,
  ButtonGroupPlugin,
  PopoverPlugin,
  SpinnerPlugin,
  TabsPlugin,
  JumbotronPlugin,
].forEach((x) => Vue.use(x));

Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    Vue.$cookies.remove("session");

    localStorage.removeItem("username");
    this.username = undefined;
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;
import { user_data } from "./user_data";
Vue.prototype.$store = user_data;
new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  created() {
    window.addEventListener("beforeunload", this.handlerClose);
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },

    handlerClose() {
      // localStorage.removeItem("username");
      // this.username = undefined;
    },
  },
  render: (h) => h(App),
}).$mount("#app");
