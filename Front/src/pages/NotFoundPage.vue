<template>
  <div class="container">
    <b-jumbotron bg-variant="dark" text-variant="white" border-variant="light">
      <template v-slot:header>Something went wrong</template>

      <template v-slot:lead>
        Looks like you are trying to get into an invalid path
        <p>
          <b-icon-x-octagon font-scale="7.5" />
        </p>
      </template>

      <hr class="my-4" />

      <router-link to="/" exact>Go Home</router-link>
    </b-jumbotron>
  </div>
</template>
