import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    stats: [],
    loading: true,
    loadingS: true
  },
  actions: {
    getItems({ commit }) {
      fetch("https://5c2e28432fffe80014bd68f5.mockapi.io/items")
        .then(res => res.json())
        .then(data => {
          commit({
            type: "setItems",
            payload: data
          });
          commit({
            type: "setLoading",
            payload: false
          });
        })
        .catch(e =>
          alert("Trouble with network! Check ur internet connection")
        );
    },
    getStats({ commit }) {
      fetch("https://5c2f60112fffe80014bd6a37.mockapi.io/total/1")
        .then(res => res.json())
        .then(data => {
          commit({
            type: "setStats",
            payload: data
          });
          commit({
            type: "setLoadingS",
            payload: false
          });
        })
        .catch(e =>
          alert("Trouble with network! Check ur internet connection")
        );
    }
  },
  mutations: {
    setItems(state, data) {
      state.items = data.payload;
    },
    setLoading(state, data) {
      state.loading = data.payload;
    },
    setStats(state, data) {
      state.stats = data.payload;
    },
    setLoadingS(state, data) {
      state.loadingS = data.payload;
    }
  }
});
