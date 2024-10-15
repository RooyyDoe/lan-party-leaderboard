<script setup>
import { onMounted, ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import PlayerCard from "@/components/Playercard.vue";
import EditPlayerModal from "./modals/editPlayerModal.vue";

const toast = useToast();

const players = ref([]);
const isLoading = ref(true);

const isEditModalOpen = ref(false);
const selectedPlayer = ref(null);

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

const handleDelete = async (player) => {
  try {
    const confirm = window.confirm(
      `Are you sure you want to delete ${player.name}?`
    );
    if (!confirm) {
      return;
    }
    await axios.delete(`/api/players/${player.id}`);
    toast.success(`${player.name} Has Been Successfully deleted`);
    fetchPlayers();
  } catch (error) {
    toast.error(`${player.name} has not been deleted`, error);
  }
};

const openEditModal = (player) => {
  selectedPlayer.value = player;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedPlayer.value = null;
};

onMounted(fetchPlayers);
</script>

<template>
  <section class="bg-ivory-200 h-screen px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-charcoal mb-6 text-center">
        Browse Players
      </h2>
      <!-- Show loading spinner while loading is true -->
      <div v-if="isLoading" class="text-center text-charcoal py-6">
        <PulseLoader color="#333333" />
      </div>
      <!-- Show player cards when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
          @handle:delete="handleDelete"
          @handle:edit="openEditModal(player)"
        />
      </div>
    </div>
    <EditPlayerModal
      v-if="isEditModalOpen"
      :player="selectedPlayer"
      @handle:close="closeEditModal"
    />
  </section>
</template>
