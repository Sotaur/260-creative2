import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        listings: [],
        user: {},
        userStatistics: []
    },
    getters: {
        listings: state => state.listings,
        user: state => state.user,
        userStatistics: state => state.userStatistics
    },
    mutations: {
        setListings(state, listings) {
            state.listings = listings;
        },
        setUser(state, user) {
            state.user = user;
        },
        setUserStats(state, statistics) {
            state.userStatistics = statistics;
        }
    },
    actions: {
        getListings(context) {
            axios
                .get("/api/listing")
                .then(response => {
                    context.commit("setListings", response.data);
                    return true;
                })
                .catch(err => console.log(err));
        },
        getUserStats(context) {
            axios
                .get("/api/user")
                .then(response => {
                    context.commit("setUserStatistics", response.data);
                    return true;
                })
                .catch(err => console.log(err));
        },
        getData(context) {
            console.log("getting data");
            context.dispatch('getListings');
            context.dispatch('getUserStats');
        },
        addListing(context, listing) {
            axios
                .post("/api/listing", listing)
                .then(response => {
                    return context.dispatch("getListings");
                })
                .catch(err => {});
        },
        updateItem(context, item) {
            axios
                .put("/api/items/" + item.id, item)
                .then(response => {
                    return true;
                })
                .catch(err => {});
        },
        deleteItem(context, item) {
            axios
                .delete("/api/items/" + item.id)
                .then(response => {
                    return context.dispatch("getItems");
                })
                .catch(err => {});
        }
    }
});