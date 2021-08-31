<template>
  <div>
    <div class="container px-4">
      <div class="grid grid-cols-3 mt-3">
        <FormAdd @toggle="subscribeTicker"/>
      </div>
      <hr class="mt-3 mb-3"/>
      <!-- Ticker container block. -->
      <div class="flex flex-reverse justify-between">
        <Ticker v-for="n in 3" :key="n" :ticker-info="{ name: 'BTC' }" />
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
  components: {
    FormAdd,
    Ticker,
  },
  methods: {
    async subscribeTicker(tickerName) {
      await subscribeTickers(tickerName);
    },
    async unsubscribeTicker(tickerName) {
      await unsubscribeTickers(tickerName);
    },
  },
  async mounted() {
  },
};
</script>
