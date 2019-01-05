<template>
  <div id="app" class="container">
    <h1 class="text-center display-4 my-5">Super Shop</h1>
    <hr>
    <div class="row">
      <div class="col-8">
        <div class="row">
          <div class="col-5">
            <!-- filter block -->
            <div class="form-group">
                <label for="search">
                  <h4>Search</h4>
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
            <div>
              <h4>Price filter</h4>
              <button class="btn btn-primary mx-5">Dec</button>
              <button class="btn btn-primary mx-5">Inc</button>
            </div>
            <hr>
            <div>
              <h4>Title filter</h4>
              <button class="btn btn-primary mx-5">A-Z</button>
              <button class="btn btn-primary mx-5">Z-A</button>
            </div>
          </div>
          <div class="col">
            <h4>Items</h4>
            <!-- items block -->
            <ul class="list-group">
              <li class="list-group-item list-group-item-action text-left" v-for="item of filteredItems">{{ item.name }}  <button v-on:click="addTo(item.id, item.name, item.price)" class="btn btn-outline-warning float-right">{{ item.price }}</button></li>
            </ul>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col">
            <h4>Stats</h4>
            <!-- stats block -->
            <p>Total count of orders in the shop: {{ stats.totalItems }}</p>
            <p>Total count of items in the shop: {{ stats.totalOrders }}</p>
          </div>
        </div>
      </div>
      <div class="col-4">
        <!-- basket block -->
        <h4>Basket</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
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
            </tr>
          </tbody>
        </table>
        <hr>
        <h3 class="text-right">Total: {{ sum }}</h3><br>
        <button
          @click="cleanList"
          class="btn btn-outline-danger btn-sm"
        >
          Clean up
        </button>
        <button class="btn btn-success btn-lg float-right">Buy selected items</button>
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
      filter: {
        az: false,
        za: false,
        more: false,
        less: false
      }
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
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.name.indexOf(this.search) > -1
      })
    }
  }
};
</script>
