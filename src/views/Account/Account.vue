<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <HereMap :center="center" />
      <div id="account-menu">
        <div id="left-menu-button">
          <ion-menu-button menuId="left_menu"></ion-menu-button>
        </div>
        <h4>Pubs and Resto</h4>
        <div id="right-menu-button" @click="openNotification">
          <ion-img :src="notif"></ion-img>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonImg,
  menuController,
  IonMenuButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";
import HereMap from "../Map/HereMap.vue";
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
export default defineComponent({
  name: "Account",
  components: {
    IonContent,
    IonPage,
    IonImg,
    IonMenuButton,
    HereMap,
  },
  setup() {
    const router = useRouter();
    const notif = "../../assets/svg/bell.svg";
    const center = {
      lat:  0,
      lng: 0,
    };
    return { router, notif, center };
  },
  methods: {
    ...mapActions("home", ["loadSecretArea"]),
    async loadHomeData() {
      await this.loadSecretArea().then((res: any) => {
        this.msg = res.data;
      });
    },
    ionViewWillEnter() {
      this.loadHomeData();
    },
    openNotification() {
      menuController.enable(true, "right_menu");
      menuController.open("right_menu");
    },
    async getPosition(){
      const coordinates = await Geolocation.getCurrentPosition();
      this.center.lat = coordinates.coords.latitude;
      this.center.lng = coordinates.coords.longitude;
    }
  },
  created() {
    this.getPosition();
  }
});
</script>

<style scoped>
#account-menu {
  height: 50px;
  width: 90vw;
  border-radius: 25px;
  background-color: #0000007c;
  position: absolute;
  text-align: center;
  display: flex;
  align-content: stretch;
  top: 5vh;
  left: 5vw;
}
#account-menu h4 {
  flex-grow: 1;
  color: #ffffff;
  margin: auto;
}
#left-menu-button {
  height: 45px;
  width: 45px;
  border: 2px solid #ffffff;
  background-color: #ff4600;
  border-radius: 50%;
  float: left;
  margin: 2px 0 0 2px;
  color: #ffffff;
}
#right-menu-button {
  height: 45px;
  width: 45px;
  border: 2px solid #ffffff;
  background-color: #ed1c24;
  border-radius: 50%;
  float: right;
  margin: 2px 2px 0 0;
  color: #ffffff;
}
ion-img {
  width: 28px;
  height: 28px;
  margin: 6px auto;
  filter: brightness(0) invert(1);
}
</style>