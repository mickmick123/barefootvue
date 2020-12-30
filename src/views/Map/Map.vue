<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { Plugins } from "@capacitor/core";
import { alertController } from "@ionic/vue";
import { useRouter } from "vue-router";
const { Geolocation } = Plugins;
import { store } from "@/store";

export default {
  name: "GMap",
  setup() {
    const map = ref(null);
    const mapDivRef = ref(null);
    const center = ref(null);
    const infoWindow = ref(null);
    const eventButton = ref(document.createElement("ion-button"));
    const currMarker = ref(null);
    const router = useRouter();
    const icons = {
      Events: {
        icon: "/../../assets/svg/event.svg",
      },
      restoAndCafes: {
        icon: "/../../assets/svg/cafe.svg",
      },
      barsAndPubs: {
        icon: "/../../assets/svg/bar.svg",
      },
    };
    const eventMarkers = computed(() => {
      return store.getters["posting/getEvents"];
    });
    watch(eventMarkers, (val) => {
      const mark = ref(null);
      if (!val) return;
      Object.keys(val).map(function (key, index) {
        mark.value = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(val[key].lat, val[key].lng),
          icon: {
            url: icons[val[key].category].icon,
            scaledSize: new window.google.maps.Size(30, 30), // scaled size
            origin: new window.google.maps.Point(0, 0), // origin
            anchor: new window.google.maps.Point(0, 0), // anchor
          },
          map: map.value,
        });

        window.google.maps.event.addListener(
          mark.value,
          "click",
          (function (mark, i) {
            return function () {
              infoWindow.value.setContent(val[key].title);
              infoWindow.value.open(map.value, mark.value);
            };
          })(mark.value, index)
        );
      });
    });
    eventButton.value.innerHTML = "Post an event?";

    function myMarker(center) {
      if (currMarker.value != null) currMarker.value = null;

      currMarker.value = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(center),
        map: map.value,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 5,
          fillOpacity: 1,
          strokeWeight: 1,
          fillColor: "#ff4600",
          strokeColor: "#f17547",
        },
      });
      map.value.setCenter(center);
    }

    function addYourPinButton(map) {
      const controlDiv = document.createElement("div");
      const firstChild = document.createElement("button");

      firstChild.style.backgroundColor = "transparent";
      firstChild.style.border = "none";
      firstChild.style.outline = "none";
      firstChild.style.width = "38px";
      firstChild.style.height = "38px";
      firstChild.style.borderRadius = "2px";
      //firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
      firstChild.style.cursor = "pointer";
      firstChild.style.marginRight = "10px";
      firstChild.style.marginBottom = "0px";
      firstChild.style.padding = "0";
      //firstChild.title = 'Your Location';
      firstChild.style.overflow = "hidden";
      controlDiv.appendChild(firstChild);

      const secondChild = document.createElement("div");
      secondChild.style.margin = "2px";
      secondChild.style.width = "38px";
      secondChild.style.height = "38px";
      secondChild.style.backgroundImage = "url(/../../assets/svg/gear.svg)";
      secondChild.style.backgroundSize = "35px 35px";
      secondChild.style.backgroundRepeat = "no-repeat";
      firstChild.appendChild(secondChild);

      firstChild.addEventListener("click", async function () {
        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "Confirm!",
          message: "Register an event on your current position.",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: (blah) => {
                console.log("Confirm Cancel:", blah);
              },
            },
            {
              text: "Confirm",
              handler: () => {
                router.push({
                  name: "posting",
                  params: { lat: center.value.lat, lng: center.value.lng },
                });
              },
            },
          ],
        });
        return alert.present();
      });
      controlDiv.index = 1;
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
        controlDiv
      );
    }

    function addYourLocationButton(map) {
      const controlDiv = document.createElement("div");

      const firstChild = document.createElement("button");
      firstChild.style.backgroundColor = "transparent";
      firstChild.style.border = "none";
      firstChild.style.outline = "none";
      firstChild.style.width = "38px";
      firstChild.style.height = "38px";
      firstChild.style.borderRadius = "2px";
      //firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
      firstChild.style.cursor = "pointer";
      firstChild.style.marginRight = "10px";
      firstChild.style.marginBottom = "10px";
      firstChild.style.padding = "0";
      //firstChild.title = 'Your Location';
      firstChild.style.overflow = "hidden";
      controlDiv.appendChild(firstChild);

      const secondChild = document.createElement("div");
      secondChild.style.margin = "2px";
      secondChild.style.width = "38px";
      secondChild.style.height = "38px";
      secondChild.style.backgroundImage =
        "url(/../../assets/images/mylocation-sprite-2x.png)";
      secondChild.style.backgroundSize = "360px 35px";
      secondChild.style.backgroundPosition = "-325px 0";
      secondChild.style.backgroundRepeat = "no-repeat";
      firstChild.appendChild(secondChild);

      window.google.maps.event.addListener(map, "center_changed", function () {
        secondChild.style["background-position"] = "-1px 0";
      });

      firstChild.addEventListener("click", async function () {
        let imgX = 0;
        const animationInterval = setInterval(function () {
          imgX = -imgX - 35;
          secondChild.style["background-position"] = imgX + "px 0";
        }, 500);

        try {
          const coordinates = await Geolocation.getCurrentPosition();
          const latlng = {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude,
          };
          map.setCenter(latlng);
          clearInterval(animationInterval);
          secondChild.style["background-position"] = "-325px 0";
          myMarker(latlng);
        } catch (e) {
          const loc = await fetch("https://ipinfo.io/geo");
          const loc2 = await loc.json();
          const loc3 = loc2.loc.split(",");
          const latlng = { lat: Number(loc3[0]), lng: Number(loc3[1]) };
          map.setCenter(latlng);
          clearInterval(animationInterval);
          secondChild.style["background-position"] = "-325px 0";
          myMarker(latlng);
        }
      });

      controlDiv.index = 1;
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
        controlDiv
      );
    }

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

    async function generateMap() {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        center.value = {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        };
      } catch (e) {
        const loc = await fetch("https://ipinfo.io/geo");
        const loc2 = await loc.json();
        const loc3 = loc2.loc.split(",");
        center.value = { lat: Number(loc3[0]), lng: Number(loc3[1]) };
      }
      map.value = new window.google.maps.Map(mapDivRef.value, {
        zoom: 12,
        center: center.value || { lat: 33.0, lng: -77.01 },
        mapType: "roadmap",
        disableDefaultUI: true,
      });

      infoWindow.value = new window.google.maps.InfoWindow({
        content: "",
        position: center.value,
      });
      // map.value.addListener("click", (mapsMouseEvent) => {
      //   // Close the current InfoWindow.
      //   infoWindow.value.close();

      //   // Create a new InfoWindow.
      //   infoWindow.value = new window.google.maps.InfoWindow({
      //     position: mapsMouseEvent.latLng,
      //   });

      //   infoWindow.value.setContent(
      //     map.value.zoom < 19
      //       ? "Please zoom more to post an event."
      //       : eventButton.value
      //     //JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      //     //'<a href="#">Post an event?</a>'
      //   );
      //   eventButton.value.addEventListener("click", () => {
      //     console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
      //   });
      //   infoWindow.value.open(map.value);
      // });
      myMarker(center.value);
      addYourLocationButton(map.value);
      addYourPinButton(map.value);
    }

    function autoUpdate(coordinates) {
      if (
        coordinates.coords.latitude != center.value.lat &&
        coordinates.coords.longitude != center.value.lng
      ) {
        center.value = {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        };
        myMarker(center.value);
      } else {
        return;
      }
    }
    function error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    }

    window.initMap = async () => {
      await generateMap();
      navigator.geolocation.watchPosition(autoUpdate, error, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    };
    return { mapDivRef, router };
  },
};
</script>
<style scoped>
.map {
  width: 100vw;
  height: 93vh;
  background-color: orange;
}
.my-custom-class .alert-wrapper {
  background: orange;
}
</style>