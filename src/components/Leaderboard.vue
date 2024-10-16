<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import PlayerLeaderboardCard from "./PlayerLeaderboardCard.vue";

const players = ref([]);

const fetchPlayers = async () => {
  try {
    const response = await axios.get("/api/players");
    players.value = response.data;
  } catch (error) {
    console.error("Error has formed", error);
  } finally {
    isLoading.value = false;
  }
};

// Computed property to sort players by score
const sortedPlayers = computed(() => {
  return players.value.sort((a, b) => b.score - a.score);
});

// Simulate score updates (for demonstration)
setInterval(() => {
  players.value.forEach((player) => {
    player.score = Math.floor(Math.random() * 100);
  });
}, 3000);

onMounted(fetchPlayers);
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-ivory-200">
    <div class="container-xl lg:container m-auto">
      <transition-group
        name="leaderboard"
        tag="ul"
        class="flex flex-col items-center"
      >
        <li
          v-for="(player, index) in sortedPlayers"
          :key="player.id"
          class="mb-4"
        >
          <PlayerLeaderboardCard :player="player" :position="index + 1" />
        </li>
      </transition-group>
    </div>
  </div>
</template>

<style>
/* Transition styles */
.leaderboard-enter-active,
.leaderboard-leave-active,
.leaderboard-move {
  transition: all 0.5s ease;
}

.leaderboard-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.leaderboard-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.leaderboard-move {
  transform: translateY(0);
}

/* Styling for leaderboard items */
.player-item {
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
}
</style>
