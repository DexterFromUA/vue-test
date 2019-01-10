<template>
  <div class="col ml-5 shadow p-3 mb-5 bg-white rounded">
    <h4>
      <span class="badge badge-secondary badge-pill">Items
        <div v-if="loading" class="spinner-grow spinner-grow-sm" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </span>
    </h4>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border m-5" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item list-group-item-action text-left" v-for="item of filteredItems">
        <span class>{{ item.name }}</span>
        <button
          v-on:click="addTo(item.id, item.name, item.price)"
          class="btn btn-outline-warning float-right"
        >Add to cart {{ item.price }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "items",
  data() {
    return {
    };
  },
  props: ["search"],
  mounted() {
    this.$store.dispatch("getItems");
  },
  methods: {
    addTo(id, name, price) {
      let data = this.$store.state.cart;
      let payload = { id, name, price, count: 1 };
      let arrayCartId = data.map(item => item.id);
      let currentPrice = 0;

      if (arrayCartId.includes(payload.id)) {
        data.filter(item => {
          if (item.id === payload.id) {
            this.getItems.filter(cur => {
              if (cur.id === item.id) {
                currentPrice = cur.price;
              }
            });
            let temp = { id: item.id, count: item.count, price: currentPrice };
            this.$store.dispatch("cartItemCountInc", temp);
            this.$store.dispatch("updateItemPrice", temp);
          }
        });
      } else {
        this.$store.dispatch("addToCart", payload);
      }
    }
  },
  computed: {
    ...mapState({
      getItems: state => state.items,
      loading: state => state.loading
    }),
    filteredItems() {
      return this.getItems.filter(item => {
        return item.name.indexOf(this.search) > -1;
      });
    }
  }
};
</script>

<style scoped>
.list-group {
  overflow: scroll;
  overflow-x:hidden;
  height: 350px;
}
</style>
