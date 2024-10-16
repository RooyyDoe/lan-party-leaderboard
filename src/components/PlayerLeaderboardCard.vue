<script setup>
const props = defineProps({
  player: Object,
  position: Number,
});
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-x-4 w-full md:items-center p-4 text-lg rounded-xl bg-white item-list"
  >
    <div class="flex gap-4 flex-grow items-center">
      <div class="text-lg w-10 text-slate-500">{{ `#${position}` }}</div>
      <div class="flex items-center gap-3 font-semibold text-lg">
        <img
          class="w-10 h-10 rounded-full shadow-lg"
          :src="player.avatar"
          alt="Avatar image"
        />
        {{ player.name }}
      </div>
    </div>
    <div class="flex gap-4">
      <div>{{ player.points }}</div>
    </div>
  </div>
</template>

<style scoped>
.item-list {
  width: 750px;
}
</style>
