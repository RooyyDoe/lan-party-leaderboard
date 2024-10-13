<script setup>
import Hero from "@/components/Hero.vue";
import HomeCards from "@/components/HomeCards.vue";
import PlayerCards from "@/components/PlayerCards.vue";
</script>

<template>
  <Hero title="This is a test" sub-title="Test" />
  <HomeCards />
  <PlayerCards :show-button="true" />
</template>
