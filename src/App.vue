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
                <button @click="clearSort" class="btn btn-outline-warning btn-block">Clear filter</button>
              </div>
            </div>
          </div>
          <div class="col ml-5 shadow p-3 mb-5 bg-white rounded">
            <h4><span class="badge badge-secondary badge-pill">Items</span></h4>
            <!-- items block -->
            <ul class="list-group">
              <li class="list-group-item list-group-item-action text-left" v-for="item of filteredItems"><span class="">{{ item.name }}</span><button v-on:click="addTo(item.id, item.name, item.price)" class="btn btn-outline-warning float-right">Add to cart {{ item.price }}</button></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <!-- stats block -->
          <div class="col">
            <h4><span class="badge badge-secondary badge-pill">Stats</span></h4>
            <div class="row">
              <div class="col">
                <p>Total count of orders in the shop: {{ stats.totalItems }}</p>
              </div>
              <div class="col">
                <p>Total count of items in the shop: {{ stats.totalOrders }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col ml-5 shadow p-3 mb-5 bg-white rounded" style="height: 385px">
        <!-- basket block -->
        <h4><span class="badge badge-secondary badge-pill">Cart</span></h4>
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
              <th><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></th>
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
        <button class="btn btn-success btn-lg float-right btn-block">Buy selected items</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      items: [],
      id: 1,
      stats: [],
      basket: [],
      sum: 0,
      currentPrice: 0,
      search: '',
      filtered: [],
      temp: []
    };
  },
  mounted() {
    this.fetchItems();
    this.fetchStats();
  },
  updated() {
    this.updateSum();
  },
  methods: {
    fetchItems() {
      fetch("https://5c2e28432fffe80014bd68f5.mockapi.io/items")
      .then(res => res.json())
      .then(items => this.items = items)
      .catch(e => alert("Trouble with network! Check ur internet connection"));
    },
    fetchStats() {
      fetch(`https://5c2f60112fffe80014bd6a37.mockapi.io/total/${this.id}`)
      .then(res => res.json())
      .then(data => this.stats = data)
      .catch(e => alert("Trouble with network! Check ur internet connection"));
    },
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
            this.items.filter(cur => {
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
      let sum = 0
      const array = this.basket.map(item => item.price)

      for(let item of array){
        sum += +item
      }
      return this.sum = sum
    },
    cleanList() {
      this.basket = [],
      this.sum = 0
    },
    countInc(id) {
      this.basket.filter(item => {
        if(item.id === id) {
          item.count += 1;
          this.items.filter(cur => {
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
          this.items.filter(cur => {
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
      this.temp = this.items
      return this.filtered = this.temp.sort(comparePrice);
    },
    priceSortReverse() {
      return this.filtered = this.priceSort().reverse()
    },
    titleSort() {
      const compareTitle = (a, b) => {
        let titleA = a.name.toLowerCase();
        let titleB = b.name.toLowerCase();

        if(titleA < titleB) return -1
        if(titleA > titleA) return 1
        return 0
      }

      this.temp = this.items;
      return this.filtered = this.items.sort(compareTitle);
    },
    titleSortReverse() {
      return this.filtered = this.titleSort().reverse();
    },
    clearSort() {
      this.search = '';
      this.filtered = this.items;
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return this.filtered = item.name.indexOf(this.search) > -1
      })
    }
  }
};
</script>
