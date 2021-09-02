<template>
  <div>
    <div class="container px-4">
      <!-- Form container block. -->
      <div class="grid grid-cols-2 mt-3">
        <FormAdd @toggle="additional" />
      </div>
      <hr v-if="tickers.length" class="mt-3 mb-3" />
      <!-- Ticker container block. -->
      <div class="grid grid-cols-3 gap-4">
        <Ticker
          v-for="(ticker, i) in tickers"
          :key="i"
          @destroy="remove"
          :ticker-data="ticker"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormAdd from "@/components/FormAdd";
import Ticker from "@/components/Ticker";
import { subscribeTickers, unsubscribeTickers } from "@/api";

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
    additional(tickerName) {
      let newObjectTicker = {
        name: tickerName,
        price: "Обновление...",
      };

      this.tickers = [...this.tickers, newObjectTicker];
      subscribeTickers(newObjectTicker.name, (newPrice) =>
        this.updateTicker(newObjectTicker.name, newPrice)
      );
    },
    remove(ticker) {
      this.tickers = this.tickers.filter((t) => t !== ticker);

      if (this.selectedTicker === ticker) {
        this.selectedTicker = null;
      }

      unsubscribeTickers(ticker);
    },
    updateTicker(tickerName, price) {
      this.tickers
        .filter((ticker) => ticker.name === tickerName)
        .forEach((ticker) => {
          ticker.price = price;
        });
    },
  },
};
</script>
