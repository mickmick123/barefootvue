import { HomeService, ResponseError } from "@/services/home.service";

const state = {
    responseData: "",
    responseErrorCode: 0,
    responseError: "",
    center: {}
};

const getters = {
    responseErrorCode: (state: { responseErrorCode: any }) => {
        return state.responseErrorCode;
    },
    responseError: (state: { responseError: any }) => {
        return state.responseError;
    },
    setLocation: (state: { center: any }) => {
        return state.center;
    },
};

const actions = {
    async getLocation(context: any) {
            const resp = await HomeService.getLocation();
            context.commit("setLocation", resp);
    },
    async loadSecretArea(context: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.secretArea();
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
   
};

const mutations = {
    setLocation(state: {
        center: any;
    }, center: any){
        state.center = center;
    },
    dataRequest(state: {
        responseError: string;
        responseErrorCode: number;
    }) {
        state.responseError = "";
        state.responseErrorCode = 0;
    },
    dataSuccess(state: { responseData: string }, payload: any) {
        state.responseData = payload;
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    }
}

export const home = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
