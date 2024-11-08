<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Navbar />
  <div class="main-bg">
    <RouterView />
  </div>
</template>

<style scoped>
.main-bg {
  /* Background image */
  background-image: url("./assets/img/background.jpg"); /* Adjust path as needed */
  background-size: cover; /* Covers entire container */
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Ensures it covers the full height */
  display: flex; /* Optional: Centers content */
  justify-content: center;
  align-items: center;
}
</style>
