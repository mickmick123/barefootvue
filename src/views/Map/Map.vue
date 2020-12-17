<template>
  <MglMap
    :mapboxGl="mapboxGl"
    :accessToken="accessToken"
    v-model:mapStyle="mapStyle"
    @load="onMapLoaded"
  />
</template>

<script lang="ts">
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap
  },
  created() {
      console.log("mick");
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWlja21pY2sxOTg5IiwiYSI6ImNrZnlzaHBrZDBkaXIyem52ZWdhZnBrYzQifQ.2E9EKB7Lx14VBMZfRuRrVQ', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mickmick1989/ckg6chu5e1uqw19lo40u1od9a', // your map style
      mapboxGl:  import('mapbox-gl')
    };
  },
  methods: {
    onMapLoaded(event: any) {
       console.log("mick");
    }
  }
};
</script>
