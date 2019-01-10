<template>
  <div class="col-5 shadow p-3 mb-5 bg-white rounded">
    <div class="form-group">
      <label for="search">
        <h4>
          <span class="badge badge-secondary badge-pill">Search</span>
        </h4>
      </label>
      <input type="text" class="form-control" id="search" placeholder="Title" @input="onSearch" v-model="search">
    </div>
    <hr>
    <div class="row">
      <div class="col">
        <h4>
          <span class="badge badge-secondary badge-pill">Price Sort</span>
        </h4>
        <div class="btn-group btn-group-lg btn-block" role="group" aria-label="priceSort">
          <button @click="priceSort" type="button" class="btn btn-outline-secondary">Dec</button>
          <button @click="priceSortReverse" type="button" class="btn btn-outline-secondary">Inc</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col">
        <h4>
          <span class="badge badge-secondary badge-pill">Title Sort</span>
        </h4>
        <div class="btn-group btn-group-lg btn-block" role="group" aria-label="titleSort">
          <button @click="titleSort" type="button" class="btn btn-outline-secondary">A-Z</button>
          <button @click="titleSortReverse" type="button" class="btn btn-outline-secondary">Z-A</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "filter-block",
  data() {
    return {
      search: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('onSearch', this.search)
    },
    priceSort() {
      this.$store.dispatch('priceSortInc');
    },
    priceSortReverse() {
      this.$store.dispatch('priceSortDec');
    },
    titleSort() {
      this.$store.dispatch('titleSortInc');
    },
    titleSortReverse() {
      this.$store.dispatch('titleSortDec');
    }
  }
};
</script>
