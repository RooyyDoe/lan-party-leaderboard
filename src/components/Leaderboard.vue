<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import PlayerLeaderboardCard from "./PlayerLeaderboardCard.vue";

const players = ref([]);
const newPlayerPoints = ref([]);
const isEditing = ref(false);
const isLoading = ref(true);

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

// Function to save all updated scores after patch requests
const saveAllScores = async () => {
  try {
    const updatePromises = newPlayerPoints.value.map((player) =>
      axios.patch(`/api/players/${player.id}`, { points: player.points })
    );
    await Promise.all(updatePromises);

    isEditing.value = false;
    fetchPlayers();
  } catch (error) {
    console.error("Failed to update scores:", error);
  }
};

const handlenewPlayerPointsObject = (newPoints, playerId) => {
  // Find the index of the player in the array by their ID
  const playerIndex = newPlayerPoints.value.findIndex(
    (player) => player.id === playerId
  );

  if (playerIndex !== -1) {
    // If the player is found, update the points
    newPlayerPoints.value[playerIndex].points = newPoints;
  } else {
    // If the player is not found, push a new object into the array
    newPlayerPoints.value.push({
      id: playerId,
      points: newPoints,
    });
  }
};

// Computed property to sort players by score
const sortedPlayers = computed(() => {
  return players.value.sort((a, b) => b.points - a.points);
});

onMounted(fetchPlayers);
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-ivory-200">
    <div class="container-xl lg:container m-auto">
      <button
        @click="isEditing = !isEditing"
        class="absolute top-5 left-1/2 transform -translate-x-1/2 px-3 py-2 text-charcoal rounded-lg hover:bg-ivory-200 focus:outline-none"
        :class="isEditing ? 'bg-ivory-200' : 'bg-ivory-500'"
      >
        Update scores
      </button>
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
          <PlayerLeaderboardCard
            v-model="isEditing"
            :player="player"
            :position="index + 1"
            @update:model-value="isEditing"
            @handle:new-score="
              (points) =>
                handlenewPlayerPointsObject(points + player.points, player.id)
            "
          />
        </li>
      </transition-group>
      <div v-if="isEditing" class="flex flex-col items-center">
        <button
          class="px-6 py-2 text-charcoal bg-white rounded-lg hover:bg-gray-50 focus:outline-none"
          @click="saveAllScores"
        >
          Save scores
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Transition styles */
.leaderboard-enter-active,
.leaderboard-leave-active {
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
  transition: all 0.5s 0.5s ease;
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
