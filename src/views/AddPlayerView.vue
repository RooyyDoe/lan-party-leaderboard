<script setup>
import { watch, ref } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import { playerImages } from "../data/playerImages.js";
import { useRouter } from "vue-router";

let avatar = ref("/src/assets/img/default.png");
const name = ref("");
const favoriteGame = ref("Mario Kart");
const skillLevel = ref("Beginner");

const toast = useToast();
const router = useRouter();

const handleSubmit = async () => {
  if (!name) return;

  const newPlayer = {
    avatar: avatar,
    name: name.value,
    favoriteGame: favoriteGame.value,
    skillLevel: skillLevel.value,
    points: 0,
  };

  try {
    await axios.post("/api/players", newPlayer);
    toast.success("Player Added Successfully");
    router.push("/player-list");
  } catch (error) {
    console.error("Error creating job", error);
    toast.error("Player was not added", error);
  }
};

// Watch for changes in inputName
watch(name, (newValue) => {
  // Reset currentImageUrl
  avatar = null;

  // Check if the input name matches any name in the object
  for (const item of playerImages) {
    if (item.name.includes(newValue.toLowerCase())) {
      avatar = item.imageUrl;
      break;
    } else {
      avatar = "/src/assets/img/default.png";
    }
  }
});
</script>

<template>
  <section class="h-screen">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-5 items-center mb-6">
            <h2 class="text-3xl font-semibold">Add player</h2>

            <img
              class="transition-all rounded-full w-40 h-40"
              :src="avatar"
              alt="Extra large avatar"
            />
          </div>

          <div class="mb-4">
            <label class="block text-charcoal font-bold mb-2"
              >Player name</label
            >
            <input
              v-model="name"
              type="text"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
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
                v-model="favoriteGame"
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
                v-model="skillLevel"
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
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
