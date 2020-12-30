import { createStore } from 'vuex';
import { auth } from "./auth.store";
import { posting } from "./posting.store";

export const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        posting
    },
})