<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-grid id="body-grid">
          <ion-row id="login-header">
            <ion-col size="8" offset="2">
              <div>
                <ion-img :src="logo"></ion-img>
              </div>
            </ion-col>
          </ion-row>

          <ion-row id="login-container">
            <ion-col size="12">
              <ion-input
                class="barefoot-input"
                placeholder="Username or Email"
                v-model="credentials.email"
                id="email"
                @ionChange="
                  ($event) => (credentials.email = $event.detail.value)
                "
                required
              ></ion-input>
            </ion-col>
            <ion-col size="12">
              <ion-input
                type="password"
                class="barefoot-input"
                placeholder="Password"
                v-model="credentials.password"
                id="password"
                @ionChange="
                  ($event) => (credentials.password = $event.detail.value)
                "
                required
              ></ion-input>
            </ion-col>
          </ion-row>
          <ion-row id="login-container" class="login-footer">
            <ion-col size="12">
              <router-link color="primary" to="#">Forgot Password?</router-link>
            </ion-col>
            <ion-col size="12">
              <ion-button
                @click="handleLogin"
                class="primary-button"
                expand="block"
                >Login</ion-button
              >
            </ion-col>
            <ion-col size="12">
              <ion-button
                class="primary-button"
                color="tertiary"
                expand="block"
                >Continue with Facebook</ion-button
              >
            </ion-col>
            <ion-col size="12">
              <p>
                Not a member yet?
                <router-link color="primary" to="/#"> Sign up </router-link>
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
  IonInput,
  IonButton,
  IonGrid,
  alertController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";
import { store } from "@/store";

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonImg,
    IonInput,
    IonButton,
    IonGrid,
  },
  setup() {
    const logo = "../../assets/images/logo.png";
    const router = useRouter();
    const credentials = ref<{ email: string; password: string }>({
      email: "",
      password: "",
    });
    
    return { logo, router, credentials };
  },
  methods: {
    ...mapActions("auth", ["signUserIn"]),
    async handleLogin() {
      this.signUserIn(this.credentials)
        .then(() => {
          store.dispatch("posting/fetchEvent");
          this.credentials.email = "";
          this.credentials.password = "";
          this.router.push("/");
        })
        .catch(async (err: any) => {
          const errorAlert = await alertController.create({
            header: "Failed",
            subHeader: "Sign in Failed",
            message: err,
            buttons: ["OK"],
          });
          await errorAlert.present();
        });
    },
  },
});
</script>

<style scoped>

#login-container {
  margin-top: 5vh;
}
.login-footer ion-col {
  margin: 0;
  padding: 0;
}
.login-footer ion-col:first-child {
  margin-bottom: 2vh !important;
}
.login-footer ion-col:last-child {
  margin-top: 2vh !important;
}
</style>