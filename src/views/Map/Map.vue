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
   const infoWindow = ref(null);
   const eventButton = ref(document.createElement('ion-button'));
   eventButton.value.innerHTML = 'Post an event?';

  onMounted(() => {
    const key = process.env.VUE_APP_GOOGLEMAPS_KEY;
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
      
      infoWindow.value = new window.google.maps.InfoWindow({
        content: "",
        position: center.value,
      });

      map.value.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.value.close();

        // Create a new InfoWindow.
        infoWindow.value = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        
        infoWindow.value.setContent(
          map.value.zoom<19 ? 'Please zoom more to post an event.' : eventButton.value
          //JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
          //'<a href="#">Post an event?</a>'
        );
        eventButton.value.addEventListener('click', () => {
          console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
        })
        infoWindow.value.open(map.value);
      });
  };
  return { mapDivRef };
 },
 methods:{
   postEvent(latLng){
     console.log(latLng);
   }
 }
  
};
</script>
<style scoped>
  .map{
    width: 100vw;
    height: 93vh;
    background-color: blueviolet;
  }
 
</style>