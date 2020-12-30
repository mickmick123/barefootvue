<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Suspense>
         <Map/>
      </Suspense>
      <div id="account-menu">
        <div id="left-menu-button">
          <ion-menu-button menuId="left_menu"></ion-menu-button>
        </div>
        <h4>{{defaultHeaderText}}</h4>
        <div id="right-menu-button" @click="openNotification">
          <ion-img :src="notif"></ion-img>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-segment scrollable  :value="selectedSegment" @ionChange="segmentChanged($event)">
          <ion-segment-button value="bars">
            <ion-icon :src="beer" ></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="resto">
            <ion-icon :src="resto" ></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="events">
            <ion-icon :src="event" ></ion-icon>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

<script lang="ts">

import {
  IonContent,
  IonPage,
  IonImg,
  menuController,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonFooter,
  IonToolbar
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";
import Map from "../Map/Map.vue";

export default defineComponent({
  name: "Account",
  components: {
    IonContent,
    IonPage,
    IonImg,
    IonMenuButton,
    Map,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonFooter,
    IonToolbar
  },
  setup() {
    const router = useRouter();
    const notif = "../../assets/svg/bell.svg";
    const beer = "../../assets/svg/beer-outline.svg"
    const resto = "../../assets/svg/restaurant-outline.svg";
    const event = "../../assets/svg/ticket-outline.svg";
    const selectedSegment = ref("bars");
    const defaultHeaderText = ref("Bars and Pubs");
  
    const segmentChanged = (ev: CustomEvent) => {
      if (ev.detail.value == 'resto') {
        defaultHeaderText.value = 'Restos and Cafes';
        selectedSegment.value = 'resto';
      }else if (ev.detail.value == 'bars') {
        defaultHeaderText.value = 'Bars and Pubs';
        selectedSegment.value = 'bars';
      }else {
        defaultHeaderText.value = 'Events';
        selectedSegment.value = 'events';
      }
    }
     
      return { router, notif, beer, resto, event, selectedSegment, defaultHeaderText, segmentChanged };
  },
  methods: {
    openNotification() {
      menuController.enable(true, "right_menu");
      menuController.open("right_menu");
    },
  }
  
});
</script>

<style scoped>
ion-toolbar {
  height: 7vh;
}
ion-segment{
  height: 6.9vh;
}
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