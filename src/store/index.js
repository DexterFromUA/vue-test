import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    stats: [],
    cart: [],
    loading: true,
    loadingS: true
  },
  actions: {
    getItems({ commit }) {
      fetch("https://testapi.io/api/DexterFromUA/items")
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
      fetch("https://testapi.io/api/DexterFromUA/stats")
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
    },
    addToCart({ commit }, payload) {
      commit({
        type: "setNewItem",
        payload
      })
    },
    cartItemCountInc({ commit }, temp) {
      commit({
        type: 'incCount',
        payload: {
          id: temp.id,
          count: temp.count + 1
        }
      })
    },
    cartItemCountDec({ commit }, temp) {
      commit({
        type: 'decCount',
        payload: {
          id: temp.id,
          count: temp.count - 1
        }
      })
    },
    updateItemPrice({ commit }, temp) {
      commit({
        type: 'setNewPrice',
        payload: temp
      })
    },
    cleanCart({ commit }) {
      commit({
        type: 'cleanup'
      })
    },
    deleteItem({ commit }, id) {
      commit({
        type: 'deleteItemFromCart',
        payload: id
      })
    },
    priceSortInc({ commit }) {
      commit({
        type: 'priceSort'
      })
    },
    priceSortDec({ commit }) {
      commit({
        type: 'priceSortReverse'
      })
    },
    titleSortInc({ commit }) {
      commit({
        type: 'titleSort'
      })
    },
    titleSortDec({ commit }) {
      commit({
        type: 'titleSortReverse'
      })
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
    },
    setNewItem(state, payload) {
      state.cart.push(payload.payload);
    },
    incCount(state, payload) {
      state.cart.filter(item => {
        if(item.id === payload.payload.id) {
          item.count = payload.payload.count;
        }
      });
    },
    decCount(state, payload) {
      state.cart.filter(item => {
        if(item.id === payload.payload.id) {
          item.count = payload.payload.count;
        }
      })
    },
    setNewPrice(state, payload) {
      state.cart.filter(item => {
        if(item.id === payload.payload.id) {
          item.price = item.count * payload.payload.price;
        }
      })
    },
    cleanup(state) {
      state.cart = [];
    },
    deleteItemFromCart(state, payload) {
      state.cart = state.cart.filter(item => item.id !== payload.payload);
    },
    priceSort(state) {
      const comparePrice = (a, b) => a.price - b.price;

      state.items = state.items.sort(comparePrice);
    },
    priceSortReverse(state) {
      const comparePrice = (a, b) => a.price - b.price;

      state.items = state.items.sort(comparePrice).reverse();
    },
    titleSort(state) {
      const compareTitle = (a, b) => {
        let titleA = a.name.toLowerCase();
        let titleB = b.name.toLowerCase();

        if (titleA < titleB) return -1;
        if (titleA > titleA) return 1;
        return 0;
      };

      state.items = state.items.sort(compareTitle);
    },
    titleSortReverse(state) {
      const compareTitle = (a, b) => {
        let titleA = a.name.toLowerCase();
        let titleB = b.name.toLowerCase();

        if (titleA < titleB) return -1;
        if (titleA > titleA) return 1;
        return 0;
      };

      state.items = state.items.sort(compareTitle).reverse();
    }
  }
});
