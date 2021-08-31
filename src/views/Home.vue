<template>
  <div>
    <div class="container px-4">
      <div class="grid grid-cols-2 mt-3">
        <FormAdd @toggle="subscribeTicker" />
      </div>
      <hr class="mt-3 mb-3" />
      <!-- Ticker container block. -->
      <div class="grid grid-cols-3 gap-4">
        <Ticker
          v-for="(ticker, i) in tickers"
          :key="i"
          @destroy="unsubscribeTicker"
          :ticker-data="{ name: ticker, key: i }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormAdd from "@/components/FormAdd";
import Ticker from "@/components/Ticker";
import {
  subscribeTickers,
  unsubscribeTickers,
  getTickersInStorage,
} from "@/api";

export default {
  name: "Home",
  data() {
    return {
      tickers: [],
    };
  },
  components: {
    FormAdd,
    Ticker,
  },
  methods: {
    async subscribeTicker(tickerName) {
      await subscribeTickers(tickerName);
      this.tickers = getTickersInStorage();
    },
    async unsubscribeTicker(tickerName) {
      await unsubscribeTickers(tickerName);
      this.tickers = getTickersInStorage();
    },
  },
  mounted() {
    this.tickers = getTickersInStorage();
  },
};
</script>
