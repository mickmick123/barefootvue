<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-grid id="body-grid">
          <ion-row id="welcome-header">
            <ion-col>
              <div>
                <h2>Let <span>Barefoot</span> guide you through the city</h2>
              </div>
            </ion-col>
          </ion-row>
          <ion-row
            id="welcome-content"
            v-for="(item, index) in items"
            :key="index"
          >
            <ion-col size="2">
              <ion-img :src="item.src"></ion-img>
            </ion-col>
            <ion-col size="9" offset="1">
              <div>
                <span>{{ item.text }}</span>
              </div>
            </ion-col>
          </ion-row>
          <ion-row id="welcome-footer">
            <ion-col size="12">
              <ion-button class="primary-button" expand="block"
                >LET'S GET STARTED!</ion-button
              >
            </ion-col>
            <ion-col size="12">
              <p>
                Already have an account?
                <router-link color="primary" to="/login">Log in</router-link>
              </p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonGrid,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonImg,
    IonButton,
    IonGrid,
  },
  setup() {
    const router = useRouter();
    const items = [
      {
        text: "Find the hottest happy hour destinations in the metro",
        src: "../../assets/images/home/home_beer.png",
      },
      {
        text: "Explore the best restaurants and cafes nearby",
        src: "../../assets/images/home/home_roast.png",
      },
      {
        text: "Discover events that interest you",
        src: "../../assets/images/home/home_poster.png",
      },
    ];
    return { items, router };
  },
});
</script>

<style scoped>
#body-grid h2 span {
  color: #ff4600;
}
#welcome-content span {
  font-size: 18px;
  color: #333333;
  margin: 0;
}
#welcome-content {
  padding-top: 3vh;
  text-align: left;
}
#welcome-header {
  margin-bottom: 5vh;
}
#welcome-footer {
  padding-top: 3vh;
}
.home-text {
  margin-left: 2vw;
}
</style>