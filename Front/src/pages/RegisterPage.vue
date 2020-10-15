<template>
  <div class="container">
    <br />
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.username.length"
        >Username length should be between 3-8 characters long</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">Username alpha</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First name:"
        label-for="firstname"
      >
        <b-form-input
          id="firstname"
          v-model="$v.form.firstname.$model"
          type="text"
          :state="validateState('firstname')"
        ></b-form-input>
        <b-form-invalid-feedback>First name is required</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last name:"
        label-for="lastname"
      >
        <b-form-input
          id="lastname"
          v-model="$v.form.lastname.$model"
          type="text"
          :state="validateState('lastname')"
        ></b-form-input>
        <b-form-invalid-feedback>Last name is required</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-email" label-cols-sm="3" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback>Email is required</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-profilepic"
        label-cols-sm="3"
        label="Profile picture link:"
        label-for="profilepic"
      >
        <b-form-input
          id="profilepic"
          v-model="$v.form.profilepic.$model"
          type="text"
          :state="validateState('profilepic')"
        ></b-form-input>
        <b-form-invalid-feedback>Picture link is required</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-country" label-cols-sm="3" label="Country:" label-for="country">
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>Country is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be
          <strong>strong</strong>.
          <br />For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >Have length between 5-10 characters long</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.withNumber || !$v.form.password.withSpecial"
        >Have at least 1 special Letter and at least one number!</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-passwordconfirm"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="passwordconfirm"
      >
        <b-form-input
          id="passwordconfirm"
          type="password"
          v-model="$v.form.passwordconfirm.$model"
          :state="validateState('passwordconfirm')"
        ></b-form-input>
        <b-form-invalid-feedback
          v-if="!$v.form.passwordconfirm.required"
        >Password confirmation is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.passwordconfirm.sameAsPassword"
        >The confirmed password is not equal to the original password</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-50">Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login">Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >Register failed: {{ form.submitError }}</b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card>-->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        passwordconfirm: "",
        email: "",
        profilepic: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: u => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      },
      profilepic: {
        required
      },
      password: {
        required,
        length: p => minLength(5)(p) && maxLength(10)(p),
          withSpecial: function(value) {
          return /[!@#$%^&*-+?]/.test(value);
        },
        withNumber: function(value) {
          return /[0-9]/.test(value);
        }
      },
      passwordconfirm: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "https://recipestest1.herokuapp.com/guest/register",
          {
            username: this.form.username,
            password: this.form.password,
            passwordconfirm: this.form.passwordconfirm,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            email: this.form.email,
            profilepic: this.form.profilepic,
            country: this.form.country
          }
        );
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin-left: 250px;
  font-size: 19.5px;
}
</style>
