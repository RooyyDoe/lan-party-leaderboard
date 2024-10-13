<script setup>
import Hero from "@/components/Hero.vue";
import HomeCards from "@/components/HomeCards.vue";
import JobListings from "@/components/JobListings.vue";
</script>

<template>
  <Hero title="This is a test" sub-title="Test" />
  <HomeCards />
  <JobListings :show-button="true" />
</template>
