<template>
    <div class="map" ref="mapDivRef"></div>
</template>

<script>
import {ref, onMounted} from 'vue';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
export default {
  name: "GMap",
  setup() {
   const map = ref(null);
   const mapDivRef = ref(null);
   const center = ref(null);

  onMounted(() => {
    const key = "AIzaSyCYMyigAQ6Kf0Qyb5KDLiQWnZKmk27mijY";
    const googleMapScript = document.createElement("SCRIPT");
    googleMapScript.setAttribute(
      "src",
      `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
    );
    googleMapScript.setAttribute("defer", "");
    googleMapScript.setAttribute("async", "");
    document.head.appendChild(googleMapScript);
  });

  window.initMap = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    center.value = { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
     map.value = new window.google.maps.Map(mapDivRef.value, {
        zoom:  12,
        center: center.value || { lat: 33.0, lng: -77.01 },
        mapType: "roadmap",
        disableDefaultUI: true,
      });
  };
  return { mapDivRef };
 },
  
};
</script>
<style scoped>
  .map{
    width: 100vw;
    height: 100vh;
    background-color: blueviolet;
  }
</style>