<script setup>
const props = defineProps({
  player: Object,
});

const emit = defineEmits(["handle:delete", "handle:edit"]);

const editPlayer = () => {
  emit("handle:edit");
};
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
      <span class="text-sm text-gray-500"
        >{{ player.favoriteGame }} | {{ player.skillLevel }}</span
      >
      <div class="flex mt-4 md:mt-6">
        <button
          type="button"
          class="inline-flex items-center gap-1 py-2 px-4 ms-2 text-sm font-medium text-center rounded-lg bg-ivory-300 hover:bg-ivory-400 text-charcoal focus:outline-none"
          @click="editPlayer"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="square"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
            />
          </svg>
          Edit player
        </button>
        <button
          type="button"
          class="inline-flex focus:outline-none items-center gap-1 py-2 px-4 ms-2 text-sm font-medium text-white bg-red-700 hover:bg-red-800 rounded-lg dark:bg-red-600 dark:hover:bg-red-700"
          @click="emit('handle:delete', player)"
        >
          <svg
            class="w-6 h-6 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          Delete player
        </button>
      </div>
    </div>
  </div>
</template>
