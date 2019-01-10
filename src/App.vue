<template>
  <div id="app" class="container">
    <h1 class="text-center display-4 my-5">Super Shop</h1>
    <hr>
    <div class="row">
      <div class="col-7">
        <div class="row">
          <filter-block @onSearch='onSearch' />
          <items :search="search" />
        </div>
        <stat />
      </div>
      <cart />
    </div>
  </div>
</template>

<script>
import Cart from "./components/Cart.vue";
import Filter from "./components/Filter.vue";
import Items from "./components/Items.vue";
import Stats from "./components/Stats.vue";

export default {
  name: "app",
  components: {
    'cart': Cart,
    'filter-block': Filter,
    'items': Items,
    'stat': Stats,
  },
  data() {
    return {
      search: '',
      cart: []
    }
  },
  methods: {
    onSearch(str) {
      this.search = str;
    }
  }
};
</script>
