<template>
  <div class="ticker-list">
    <t-button></t-button>
  </div>
</template>

<script>
export default {
  name: "TickerList",
  props: {
    tickers: {
      type: Array,
      required: true,
    }
  },
};
</script>
