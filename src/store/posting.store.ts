import firebase from "firebase/app";
require('firebase/auth')
require('firebase/database');
// Required for side-effects
import "firebase/firestore";
import { reactive } from "vue";
import FIREBASE_CONFIG from "../plugins/firebase";
import { auth } from "./auth.store";
import { loadingController } from '@ionic/vue';

if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
}


const state = reactive<{ title: string; description: string; banner: any; events: any }>({
    title: '',
    description: '',
    banner: null,
    events: {}
});

const mutations = {
    createEvent(state: any, payload: any) {
        state.events = payload
    },
}
const actions = {
    createEvent({commit}: any, payload: any) {
        const event = {
            title: payload.title,
            lat: payload.lat,
            lng: payload.lng,
            imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date,
            category: payload.category,
            creatorId: auth.state.user.uid
        }
        console.log(event)
        firebase.database().ref('events').push(event)
            .then((data) => {
                //const key = data.key
                commit('createEvent', {
                    ...event
                })
                return true;
            })
            .catch((error) => {
                console.log(error)
            })
        // Reach out to firebase and store it
    },
    async fetchEvent({commit}: any){
        const loading = await loadingController.create({
            message: 'Please wait...'
        });
        await loading.present();
        firebase.database().ref('events').on("value", function(snapshot) {
            loading.remove();
            commit('createEvent', snapshot.toJSON())
            //console.log(snapshot.toJSON())
           // return snapshot.val();
          }, function (errorObject: { code: string }) {
            console.log("The read failed: " + errorObject.code);
          });
        
    }
}
const getters = {
    getEvents(state: any) {
        return state.events;
    },
}

export const posting = {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};
