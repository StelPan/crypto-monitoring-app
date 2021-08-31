<template>
  <t-card :header="'USD / ' + tickerData.name">
    <div class="flex justify-center px-4">1.0003$</div>
    <template v-slot:footer>
      <div class="flex justify-center">
        <t-button @click="destroy">
          Удалить
        </t-button>
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
    destroy() {
      this.$emit("destroy", this.tickerData.name);
    },
  },
};
</script>