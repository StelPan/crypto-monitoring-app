<template>
  <t-card
    class="ticker"
  >
    <div class="flex justify-center px-4">{{ tickerData.price }}</div>
    <template v-slot:header>
      <div @click="select">{{ "USD / " + tickerData.name }}</div>
    </template>
    <template v-slot:footer>
      <div class="flex justify-center">
        <t-button @click="destroy">Удалить</t-button>
      </div>
    </template>
  </t-card>
</template>

<script>
export default {
  name: "Ticker",
  props: {
    tickerData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    select() {
      this.$emit("select", this.tickerData);
    },
    destroy() {
      this.$emit("destroy", this.tickerData);
    },
  },
};
</script>

<style lang="scss"></style>
