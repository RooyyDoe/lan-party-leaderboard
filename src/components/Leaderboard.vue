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
  const playerIndex = newPlayerPoints.value.findIndex(
    (player) => player.id === playerId
  );

  if (playerIndex !== -1) {
    newPlayerPoints.value[playerIndex].points = newPoints;
  } else {
    newPlayerPoints.value.push({
      id: playerId,
      points: newPoints,
    });
  }
};

const sortedPlayers = computed(() => {
  return players.value.sort((a, b) => b.points - a.points);
});

const topThreePlayers = computed(() => {
  const topThree = sortedPlayers.value.slice(0, 3);
  if (topThree.length === 3) {
    return [
      { ...topThree[1], displayPosition: 2 },
      { ...topThree[0], displayPosition: 1 },
      { ...topThree[2], displayPosition: 3 },
    ];
  }
  return topThree;
});
const remainingPlayers = computed(() => sortedPlayers.value.slice(3));

onMounted(fetchPlayers);
</script>

<template>
  <div class="flex items-center justify-center m-5">
    <button
    @click="isEditing = !isEditing"
    class="absolute top-5 left-1/2 transform -translate-x-1/2 px-3 py-2 text-charcoal rounded-lg hover:bg-ivory-200 focus:outline-none"
    :class="isEditing ? 'bg-ivory-200' : 'bg-ivory-500'"
  >
    Update scores
  </button>
    <div
      class="m-auto relative overflow-y-auto h-[calc(100vh-100px)] p-5"
    >


      <!-- Top Three Section -->
      <transition-group
        name="top-three"
        tag="div"
        class="hidden md:grid grid-cols-3 gap-1 justify-end items-end"
      >
        <div
          v-for="(player, index) in topThreePlayers"
          :key="player.id"
          class="top-three-card"
        >
          <PlayerLeaderboardCard
            v-model="isEditing"
            :player="player"
            :position="player.displayPosition"
            :is-top-player="true"
            @update:model-value="isEditing"
            @handle:new-score="
              (points) =>
                handlenewPlayerPointsObject(points + player.points, player.id)
            "
          />
        </div>
      </transition-group>

      <!-- Remaining Players Section -->
      <transition-group
        name="leaderboard"
        tag="ul"
        class="flex flex-col items-center mt-10"
      >
        <li
          v-for="(player, index) in remainingPlayers"
          :key="player.id"
          class="mb-4"
        >
          <PlayerLeaderboardCard
            v-model="isEditing"
            :player="player"
            :position="index + 4"
            :is-top-player="false"
            @update:model-value="isEditing"
            @handle:new-score="
              (points) =>
                handlenewPlayerPointsObject(points + player.points, player.id)
            "
          />
        </li>
      </transition-group>

      <div v-if="isEditing" class="flex flex-col items-center mt-5">
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
/* Transition for the leaderboard items */
.leaderboard-enter-active,
.top-three-enter-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in;
}

.leaderboard-leave-active,
.top-three-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-out;
}

.leaderboard-enter-from,
.top-three-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.leaderboard-leave-to,
.top-three-leave-to {
  opacity: 0;
  display: none;
  transform: translateY(0px);
}

.leaderboard-move,
.top-three-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Styling for the top-three card with a smooth transition */
.top-three-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
