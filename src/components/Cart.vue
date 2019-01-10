<template>
  <div class="col ml-5 shadow p-3 mb-5 bg-white rounded" style="height: 398px">
    <h4>
      <span class="badge badge-secondary badge-pill">Cart</span>
    </h4>
    <div v-if="!getCart.length">
      <h2>
        <p class="text-center mt-5">Haven't items yet</p>
      </h2>
    </div>
    <div v-else >
      <div class="list">
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
          <tr v-for="item of getCart">
            <th>{{ item.name }}</th>
            <th>
              <button class="btn" @click="countDec(item.id)">-</button>
              {{ item.count }}
              <button class="btn" @click="countInc(item.id)">+</button>
            </th>
            <th>{{ item.price }}</th>
            <th>
              <button @click="deleteItem(item.id)" type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
      </div>
      <hr>
      <div class="row">
        <div class="col-8">
          <button @click="cleanList" class="btn btn-outline-danger btn-sm">Clean up</button>
        </div>
        <div class="col-4">
          <h3 class="text-right">Total: {{ sum }}</h3>
          <hr>
        </div>
      </div>
      <div>
        <button
          v-if="loadingC"
          class="btn btn-success btn-lg float-right btn-block"
          type="button"
          disabled
        >
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          PLease wait...
        </button>
        <button v-else class="btn btn-success btn-lg float-right btn-block">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "cart",
  data() {
    return {
      sum: 0,
      loadingC: false
    };
  },
  updated() {
    this.updateSum();
  },
  methods: {
    updateSum() {
      let sum = 0;
      const array = this.getCart.map(item => item.price);

      for (let num of array) {
        sum += +num;
      }
      return (this.sum = sum);
    },
    cleanList() {
      this.$store.dispatch("cleanCart");
      this.sum = 0;
    },
    countInc(id) {
      let currentPrice = 0;

      this.getCart.filter(item => {
        if (item.id === id) {
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
    },
    countDec(id) {
      let currentPrice = 0;

      this.getCart.filter(item => {
        if (item.id === id) {
          if (item.count > 0) {
            this.getItems.filter(cur => {
              if (cur.id === item.id) {
                currentPrice = cur.price;
              }
            });
            let temp = { id: item.id, count: item.count, price: currentPrice };
            this.$store.dispatch("cartItemCountDec", temp);
            this.$store.dispatch("updateItemPrice", temp);
          }
        }
      });
    },
    deleteItem(itemId) {
      this.$store.dispatch("deleteItem", itemId);
    }
    /*order() {
      fetch("example/com", {
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(this.basket)
      })
      .catch(e => alert("Error! Try again"))
    }*/
  },
  computed: {
    ...mapState({
      getCart: state => state.cart,
      getItems: state => state.items
    })
  }
};
</script>

<style scoped>
.list {
  height: 250px;
  overflow: scroll;
  overflow-x:hidden;
}
</style>
