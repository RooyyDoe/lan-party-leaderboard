<script setup>
import { RouterLink, useRoute } from "vue-router";
// import logo from "@/assets/img/logo.png";

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-ivory-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <!-- <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" /> -->
            <span class="hidden md:block text-charcoal text-2xl font-bold ml-2"
              >LAN Leaderboard</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') ? 'bg-ivory-200' : 'hover:bg-ivory-200',
                  'text-charcoal',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Leaderboard</RouterLink
              >
              <RouterLink
                to="/player-list"
                :class="[
                  isActiveLink('/player-list')
                    ? 'bg-ivory-200'
                    : 'hover:bg-ivory-200',
                  'text-charcoal',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Player list</RouterLink
              >
              <RouterLink
                to="/player-list/add"
                :class="[
                  isActiveLink('/player-list/add')
                    ? 'bg-ivory-200'
                    : 'hover:bg-ivory-200',
                  'text-charcoal',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Add player</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
