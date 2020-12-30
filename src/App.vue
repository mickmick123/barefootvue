<template>
  <ion-app>
    <IonSplitPane content-id="main-content">
      <Menu />
      <Notification />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/vue";
import { defineComponent } from "vue";
import Menu from "./components/Menu.vue";
import Notification from "./components/Notification.vue";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";
import { store } from "@/store";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    Menu,
    Notification,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    ...mapActions("auth", ["authCheck"]),
    isLogin() {
      this.authCheck()
        .then(() => {
          store.dispatch("posting/fetchEvent");
          this.router.push("/account");
        })
        .catch(async () => {
          this.router.push("/");
        });
    },
  },
  async mounted() {
    this.isLogin();
  }
});
</script>
