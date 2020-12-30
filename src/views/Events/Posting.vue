<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button color="primary"></ion-back-button>
        </ion-buttons>
        <ion-title color="primary">Post an Event</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container">
        <ion-grid id="body-grid">
          <ion-row>
            <ion-col size="12">
              <input
                id="imgUpload"
                type="file"
                @change="onFileSelected"
                style="display: none"
                accept="image/*"
              />
              <ion-button @click="uploadImage">UPLOAD BANNER</ion-button>
            </ion-col>
            <ion-col size="12">
              <ion-img :src="imageUrl" class="previewImg"></ion-img>
            </ion-col>
            <ion-col size="12">
              <ion-input
                class="barefoot-input"
                placeholder="Title"
                v-model="title"
                required
              ></ion-input>
            </ion-col>
            <ion-col size="12">
              <ion-textarea
                class="barefoot-textarea"
                rows="6"
                cols="20"
                v-model="description"
                placeholder="Description here..."
              ></ion-textarea>
            </ion-col>
            <ion-col size="12">
              <ion-select
                class="barefoot-select"
                placeholder="Select Category"
                ok-text="Okay"
                cancel-text="Dismiss"
                v-model="category"
              >
                <ion-select-option value="restoAndCafes"
                  >Resto and Cafes</ion-select-option
                >
                <ion-select-option value="barsAndPubs"
                  >Bars and Pubs</ion-select-option
                >
                <ion-select-option value="Events">Events</ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button class="primary-button" expand="block" @click="postEvent"
          >Post this Event</ion-button
        >
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonHeader,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  toastController,
  IonImg,
  IonFooter,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Posting",
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonButtons,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonImg,
    IonFooter,
  },
  setup() {
    const imageUrl = ref<string | ArrayBuffer | undefined | null>();
    //const myImages = computed(() => { photos });
    const router = useRouter();
    const handleToast = (message: string, isError = false) => {
      toastController
        .create({
          message: message,
          position: "top",
          color: isError ? "danger" : "primary",
          duration: 2000,
        })
        .then((t) => t.present());
    };

    const onFileSelected = async (event: any) => {
      try {
        //const name = new Date().getTime() + "." + imageUrl.value.format;
        const filename = event.target.files[0].name;

        if (filename.lastIndexOf(".") <= 0) {
          handleToast("Invalid file", true);
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          imageUrl.value = fileReader.result;
        });
        fileReader.readAsDataURL(event.target.files[0]);
        //handleToast("File Uploaded!!", false);
        //imageUrl.value = null;
        //console.log(event);
      } catch (error) {
        console.log(error);
        handleToast(error.message, true);
      }
    };
    const uploadImage = () => {
      document.getElementById("imgUpload")!.click();
    };

    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };

    return {
      onFileSelected,
      imageUrl,
      uploadImage,
      slideOpts,
      handleToast,
      router
    };
  },
  data() {
    return {
      lat: this.$route.params.lat,
      lng: this.$route.params.lng,
      title: "",
      description: "",
      category: "",
    };
  },
  methods: {
    ...mapActions("posting", ["createEvent"]),
    async postEvent() {
      const eventData = {
        title: this.title,
        lat: this.lat,
        lng: this.lng,
        imageUrl: this.imageUrl,
        description: this.description,
        category: this.category,
        date: new Date(),
      };
      this.createEvent(eventData)
        .then(() => {
          this.handleToast("Event Successfuly Created", false);
          this.router.push("/account");
        })
        .catch((err: any) => {
          this.handleToast(
            "Unable to create event, please try again later.",
            true
          );
        });
    },
  },
});
</script>
<style scoped>
.previewImg {
  height: 150px;
  width: auto;
  background-image: url("../../../public/assets/images/noImage.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.previewCarousel {
  height: 200px;
  background-color: blue;
}
</style>