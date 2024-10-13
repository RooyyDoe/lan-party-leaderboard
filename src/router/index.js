import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
// import JobView from "@/views/JobView.vue";
import AddPlayerView from "@/views/AddPlayerView.vue";
// import EditJobView from "@/views/EditJobView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Leaderboard",
      component: HomeView,
    },
    {
      path: "/player-list",
      name: "player list",
      component: JobsView,
    },
    // {
    //   path: "/jobs/:id",
    //   name: "job",
    //   component: JobView,
    // },
    {
      path: "/player-list/add",
      name: "add player",
      component: AddPlayerView,
    },
    // {
    //   path: "/jobs/edit/:id",
    //   name: "edit-job",
    //   component: EditJobView,
    // },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
