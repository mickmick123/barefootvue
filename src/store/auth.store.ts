import firebase from "firebase/app";
require('firebase/auth')
// Required for side-effects
import { loadingController } from '@ionic/vue';
import "firebase/firestore";
import { reactive } from "vue";
import FIREBASE_CONFIG from "../plugins/firebase";

if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
}


const state = reactive<{ user: any; initialized: boolean; error: any; loading: boolean }>({
    user: null,
    loading: false,
    error: null,
    initialized: false,
});

const mutations = {
    setUser(state: any, payload: any) {
        state.user = payload
    },
    setLoading(state: any, payload: any) {
        state.loading = payload
    },
    setError(state: any, payload: any) {
        state.error = payload
    },
    clearError(state: any) {
        state.error = null
    }
}
const actions = {
    async signUserIn({ commit }: any, payload: any) {
        const loading = await loadingController.create({
            message: 'Please wait...'
        });
        await loading.present();
        commit('clearError')
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    // const newUser = {
                    //     id: user.user?.uid,
                    // }
                    //console.log(user)
                    commit('setUser', user)
                    loading.remove();
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                    loading.remove();
                }
            )
    },
    async authCheck({commit}: any){
        const loading = await loadingController.create({
            message: 'Please wait...'
        });
        await loading.present();
        
        return new Promise((resolve, reject) => {
            !state.initialized &&
                firebase.auth().onAuthStateChanged(async (_user: any) => {
                    if (_user) {
                        state.user = _user;
                    } else {
                        state.user = null;
                    }
                    state.initialized = true;
                    //console.log(_user);
                    loading.remove();
                    resolve(true);
                });
        });
    },
    autoSignIn({ commit }: any, payload: any) {
        commit('setUser', payload)
    },
    logout({ commit }: any) {
        firebase.auth().signOut()
        commit('setUser', null)
    },
    clearError({ commit }: any) {
        commit('clearError')
    }
}
const getters = {
    user(state: any) {
        return state.user
    },
    loading(state: any) {
        return state.loading
    },
    error(state: any) {
        return state.error
    }

}

export const auth = {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};
