<template>
  <div>
    <div class="container px-4">
      <div class="grid grid-cols-2 mt-3">
        <FormAdd @toggle="additional" />
      </div>
      <hr v-if="tickers.length" class="mt-3 mb-3" />
      <div class="grid grid-cols-3 gap-4">
        <Ticker
          v-for="(ticker, i) in tickers"
          :key="i"
          @destroy="remove"
          @select="select"
          :ticker-data="ticker"
        />
      </div>
      <template v-if="selectedTicker">
        <hr v-if="tickers.length" class="mt-3 mb-3" />
        <h2 class="fs-5 text-xl font-semibold text-blue-900">
          График изменения курса валюты - {{ selectedTicker.name }}
        </h2>
        <div class="mt-5 flex justify-center font-extrabold">
          <div class="h-40 flex items-end w-full justify-end" ref="graph">
            <div
              v-for="(h, idx) in normalizedGraph"
              :key="idx"
              :style="{ height: `${h}%` }"
              class="mx-1 bg-blue-500 w-4"
            />
          </div>
        </div>
      </template>
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
      graphLines: [],
      selectedTicker: null,
      maxGraphElements: 1,
    };
  },
  components: {
    FormAdd,
    Ticker,
  },
  computed: {
    normalizedGraph() {
      const maxValue = Math.max(...this.graphLines);
      const minValue = Math.min(...this.graphLines);

      if (maxValue === minValue) {
        return this.graphLines.map(() => 50);
      }

      return this.graphLines.map(
        (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
      );
    },
  },
  methods: {
    calculateMaxGraphElements() {
      if (!this.$refs.graph) {
        return;
      }

      this.maxGraphElements = this.$refs.graph.clientWidth / 38;
    },
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
          if (ticker === this.selectedTicker) {
            this.graphLines.push(price);
          }

          while (this.graphLines.length > this.maxGraphElements) {
            this.graphLines.shift();
          }

          ticker.price = price;
        });
    },
    select(ticker) {
      this.selectedTicker = ticker;
    },
  },
  watch: {
    selectedTicker() {
      this.graphLines = [];
      this.$nextTick().then(this.calculateMaxGraphElements);
    },
  },
};
</script>
