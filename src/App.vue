<template>
  <ion-app>
    <IonSplitPane content-id="main-content">
      <Menu/>
      <Notification/>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from './components/Menu.vue';
import Notification from './components/Notification.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    Menu,
    Notification
  }
});
</script>
