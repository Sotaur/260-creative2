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
            console.log(user);
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
                    console.log("got listings", response.data);
                    context.commit("setListings", response.data);
                    return true;
                })
                .catch(err => console.log(err));
        },
        getUserStats(context) {
            axios
                .get("/api/user-stats")
                .then(response => {

                    console.log("got user stats", response.data);
                    context.commit("setUserStats", response.data);
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
            console.log(listing);
            console.log(this.state.user);
            axios
                .put("/api/listing", {
                    listing,
                    id: this.state.user.id
                })
                .then(response => {
                    context.commit("setUser", response.data);
                })
                .catch(err => {});
        },
        addUser(context) {
            axios
                .post("/api/user/")
                .then(response => {
                    return context.commit('setUser', response.data);
                })
                .catch(err => {});
        },
        resetListings(context) {
            axios
                .delete("/api/listing/" + this.state.user.id)
                .then(response => {
                    return context.commit("setUser", response.data);
                })
                .catch(err => {});
        }
    }
});