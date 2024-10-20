<script setup>
import { ref, defineModel, watch } from "vue";

const props = defineProps({
  player: Object,
  position: Number,
});

const emit = defineEmits(["handle:new-score"]);

const newPoints = ref(0);

const isEditing = defineModel({ required: true });

watch(
  () => isEditing.value,
  (newValue) => {
    if (newValue) {
      newPoints.value = 0; // Reset input to current player points
    }
  }
);
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
    <!-- Toggle between showing score and editing score -->
    <div class="text-right">
      <div v-if="isEditing" class="flex items-center">
        <span class="text-xl text-charcoal mr-2">{{ player.points }} +</span>
        <input
          v-model="newPoints"
          type="number"
          min="0"
          class="w-16 text-center border-2 border-ivory-500 rounded text-charcoal font-bold"
          @blur="emit('handle:new-score', newPoints)"
        />
      </div>
      <div v-else>
        <span class="text-xl font-bold">
          {{ player.points }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-list {
  width: 750px;
}
</style>
