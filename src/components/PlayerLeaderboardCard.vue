<script setup>
import { ref, computed, defineModel, watch } from "vue";

const props = defineProps({
  player: Object,
  position: Number,
  isTopPlayer: Boolean,
});

const emit = defineEmits(["handle:new-score"]);

const newPoints = ref(0);

const isEditing = defineModel({ required: true });

const positionClass = computed(() => {
  switch (props.position) {
    case 1:
      return "from-yellow-500/60 rounded-xl h-36"; // Customize for 1st place
    case 2:
      return "from-gray-400 rounded-tl-xl h-32"; // Customize for 2nd place
    case 3:
      return "from-orange-400/40 rounded-tr-xl h-28"; // Customize for 3rd place
  }
});

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
    v-if="!isTopPlayer"
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
  <div v-else class="flex flex-col items-center">
    <div class="flex items-center flex-col gap-3 font-semibold text-lg">
      <img
        class="w-10 h-10 rounded-full"
        :src="player.avatar"
        alt="Avatar image"
      />
      <div>
        {{ player.name }}
      </div>
      <div class="flex items-center gap-2"></div>
    </div>
    <div class="flex text-slate-400 flex-col py-2 mb-1 items-center text-sm">
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
        <span class="text-xl text-charcoal font-bold">
          {{ player.points }}
        </span>
      </div>
    </div>
    <div
      :class="[
        'w-full bg-gradient-to-b border-slate-700 flex items-center justify-center text-3xl',
        positionClass,
      ]"
    >
      {{ `#${position}` }}
    </div>
  </div>
</template>

<style scoped>
.item-list {
  width: 750px;
}
</style>
