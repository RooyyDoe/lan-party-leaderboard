<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  player: Object,
});
</script>

<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-sm"
  >
    <div class="flex flex-col items-center p-5">
      <img
        class="w-24 h-24 mb-3 rounded-full shadow-lg"
        :src="player.avatar"
        alt="Avatar image"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900">
        {{ player.name }}
      </h5>
      <span class="text-sm text-gray-500">Visual Designer</span>
      <div class="flex mt-4 md:mt-6">
        <a
          href="#"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >Edit player</a
        >
        <a
          href="#"
          class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >Delete player</a
        >
      </div>
    </div>
  </div>
</template>
