<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps({
  player: Object,
});

const emit = defineEmits(["handle:close", "handle:submit"]);

const name = ref("");
const favoriteGame = ref("Mario Kart");
const skillLevel = ref("Beginner");

const handleSubmit = async () => {
  const updatePlayer = {
    name: name.value,
    favoriteGame: favoriteGame.value,
    skillLevel: skillLevel.value,
    points: 0,
  };

  try {
    await axios.put(`/api/players/${props.player.id}`, updatePlayer);
    toast.success("player Updated Successfully");
    emit("handle:submit");
  } catch (error) {
    console.error("Error updating player", error);
    toast.error("player was not updated", error);
  }
};
</script>

<template>
  <div
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative p-4 w-full max-w-md">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Edit player
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="emit('handle:close')"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="handleSubmit" class="p-5">
          <div class="flex flex-col gap-5 items-center mb-6">
            <img
              class="transition-all rounded w-40 h-40"
              :src="player.avatar"
              alt="Extra large avatar"
            />
          </div>

          <div class="mb-4">
            <label class="block text-charcoal font-bold mb-2"
              >Player name</label
            >
            <input
              v-model="player.name"
              type="text"
              id="name"
              name="name"
              class="border border-ivory-300 rounded w-full py-2 px-3 mb-2"
              placeholder="Fill in your player name.."
              required
            />
          </div>
          <div class="flex gap-5">
            <div class="flex-1 mb-4">
              <label class="block text-charcoal font-bold mb-2"
                >Favorite game</label
              >
              <select
                v-model="player.favoriteGame"
                id="favoriteGame"
                name="favoriteGame"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Mario Kart">Mario Kart</option>
                <option value="Chained Together">Chained Together</option>
                <option value="Fortnite">Fortnite</option>
                <option value="Super Smash Bros">Super Smash Bros</option>
                <option value="Fall Guys">Fall guys</option>
              </select>
            </div>
            <div class="flex-1 mb-4">
              <label class="block text-charcoal font-bold mb-2"
                >Skill Level</label
              >
              <select
                v-model="player.skillLevel"
                id="skillLevel"
                name="skillLevel"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Casual">Casual</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <button
              class="bg-ivory-300 hover:bg-ivory-400 text-charcoal font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Confirm changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
