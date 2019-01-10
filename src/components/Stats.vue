<template>
  <div class="row">
    <div class="col">
      <h4>
        <span class="badge badge-secondary badge-pill">Stats
          <div v-if="loadingS" class="spinner-grow spinner-grow-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </span>
      </h4>
      <div class="row">
        <div class="col">
          <p>Total count of orders in the shop: {{ stats.totalOrders }}</p>
        </div>
        <div class="col">
          <p>Total count of items in the shop: {{ getItems.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "stat",
  mounted() {
    this.$store.dispatch("getStats");
  },
  computed: {
    ...mapState({
      stats: state => state.stats,
      loadingS: state => state.loadingS,
      getItems: state => state.items
    })
  }
};
</script>
