<template>
  <div id="app" class="container">
    <h1 class="text-center display-4 my-5">Super Shop</h1>
    <hr>
    <div class="row">
      <div class="col-7">
        <div class="row">
          <div class="col-5 shadow p-3 mb-5 bg-white rounded">
            <!-- filter block -->
            <div class="form-group">
                <label for="search">
                  <h4><span class="badge badge-secondary badge-pill">Search</span></h4>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="search"
                  placeholder="Title"
                  v-model="search"
                />
            </div>
            <hr>
            <div class="row">
              <div class="col">
                <h4><span class="badge badge-secondary badge-pill">Price Sort</span></h4>
                <div class="btn-group btn-group-lg btn-block" role="group" aria-label="priceSort">
                  <button @click="priceSort" type="button" class="btn btn-outline-secondary">Dec</button>
                  <button @click="priceSortReverse" type="button" class="btn btn-outline-secondary">Inc</button>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col">
                <h4><span class="badge badge-secondary badge-pill">Title Sort</span></h4>
                <div class="btn-group btn-group-lg btn-block" role="group" aria-label="titleSort">
                  <button @click="titleSort" type="button" class="btn btn-outline-secondary">A-Z</button>
                  <button @click="titleSortReverse" type="button" class="btn btn-outline-secondary">Z-A</button>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col">
                <button @click="clearSort" class="btn btn-outline-warning btn-block">Clear search</button>
              </div>
            </div>
          </div>
          <div class="col ml-5 shadow p-3 mb-5 bg-white rounded">
            <h4><span class="badge badge-secondary badge-pill">
              Items
              <div v-if="loading" class="spinner-grow spinner-grow-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </span></h4>
            <div v-if="loading" class="d-flex justify-content-center">
              <div class="spinner-border m-5"  style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <!-- items block -->
            <ul class="list-group">
              <li class="list-group-item list-group-item-action text-left" v-for="item of filteredItems"><span class="">{{ item.name }}</span><button v-on:click="addTo(item.id, item.name, item.price)" class="btn btn-outline-warning float-right">Add to cart {{ item.price }}</button></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <!-- stats block -->
          <div class="col">
            <h4><span class="badge badge-secondary badge-pill">
              Stats
              <div v-if="loadingS" class="spinner-grow spinner-grow-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </span></h4>
            <div class="row">
              <div class="col">
                <p>Total count of orders in the shop: {{ stats.totalItems }}</p>
              </div>
              <div class="col">
                <p>Total count of items in the shop: {{ temp.length }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col ml-5 shadow p-3 mb-5 bg-white rounded" style="height: 385px">
        <!-- basket block -->
        <h4><span class="badge badge-secondary badge-pill">Cart</span></h4>
        <div v-if="!basket.length"><h2><p class="text-center mt-5">Haven't items yet</p></h2></div>
        <div v-else>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
              <th scope="col">X</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of basket">
              <th>{{ item.name }}</th>
              <th>
                <button 
                  class="btn"
                  @click="countDec(item.id)"
                >
                  -
                </button>
                {{ item.count }}
                <button 
                  class="btn"
                  @click="countInc(item.id)"
                >
                  +
                </button>
              </th>
              <th>{{ item.price }}</th>
              <th><button @click="deleteItem(item.id)" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></th>
            </tr>
          </tbody>
        </table>
        <hr>
        <div class="row">
          <div class="col-8"><button
          @click="cleanList"
          class="btn btn-outline-danger btn-sm"
        >
          Clean up
        </button></div>
          <div class="col-4">
            <h3 class="text-right">Total: {{ sum }}</h3><hr>
          </div>
        </div>
        <div>
          <button v-if="loadingC" class="btn btn-success btn-lg float-right btn-block" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            PLease wait...
          </button>
          <button v-else class="btn btn-success btn-lg float-right btn-block">Checkout</button>
        </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "app",
  data() {
    return {
      basket: [],
      sum: 0,
      currentPrice: 0,
      search: '',
      loadingC: false
    };
  },
  mounted() {
    this.$store.dispatch('getItems');
    this.$store.dispatch('getStats')
  },
  updated() {
    this.updateSum();
  },
  methods: {
    addTo: function(id, name, price) {
      const newItem = {
        id: id,
        name: name,
        price: price,
        count: 1
      }
      const arrayBasketId = this.basket.map(item => item.id);

      if(arrayBasketId.includes(newItem.id)) {
        this.basket.filter(item => {
          if(item.id === newItem.id) {
            item.count += 1;
            this.setItems.filter(cur => {
              if(cur.id === item.id){
                this.currentPrice = cur.price;
              }
            })
            item.price = item.count * this.currentPrice;
          }
        })
      } else {
        this.basket.push(newItem);
      }
    },
    updateSum() {
      let sum = 0;
      const array = this.basket.map(item => item.price);

      for(let item of array){
        sum += +item;
      }
      return this.sum = sum;
    },
    cleanList() {
      this.basket = [],
      this.sum = 0;
    },
    countInc(id) {
      this.basket.filter(item => {
        if(item.id === id) {
          item.count += 1;
          this.setItems.filter(cur => {
            if(cur.id === item.id){
              this.currentPrice = cur.price;
            }
          })
          item.price = item.count * this.currentPrice;
        }
      })
    },
    countDec(id) {
      this.basket.filter(item => {
        if(item.id === id) {
          item.count -= 1;
          this.setItems.filter(cur => {
            if(cur.id === item.id){
              this.currentPrice = cur.price;
            }
          })
          item.price = item.count * this.currentPrice;
        }
      })
    },
    priceSort() {
      const comparePrice = (a, b) => (a.price - b.price);

      return this.setItems.sort(comparePrice);
    },
    priceSortReverse() {
      return this.priceSort().reverse();
    },
    titleSort() {
      const compareTitle = (a, b) => {
        let titleA = a.name.toLowerCase();
        let titleB = b.name.toLowerCase();

        if(titleA < titleB) return -1;
        if(titleA > titleA) return 1;
        return 0;
      }

      return this.setItems.sort(compareTitle);
    },
    titleSortReverse() {
      return this.titleSort().reverse();
    },
    clearSort() {
      this.search = '';
    },
    deleteItem(itemId) {
      this.basket = this.basket.filter(item => item.id !== itemId);
    },
    /*order() {
      this.loadingC = true;
      fetch("example/com", {
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(this.basket)
      })
      .then(() => this.loadingC = false)
      .catch(e => alert("Error! Try again"))
    }*/
  },
  computed: {
    ...mapState({
      setItems: state => state.items,
      loading: state => state.loading,
      stats: state => state.stats,
      loadingS: state => state.loadingS
    }),
    filteredItems() {
      this.temp = this.setItems;
      return this.setItems.filter(item => {
        return item.name.indexOf(this.search) > -1
      })
    }
  }
};
</script>
