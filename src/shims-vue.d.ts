declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'vuex';
declare module 'firebase';
declare module 'vue-select-image';
