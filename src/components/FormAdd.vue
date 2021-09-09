<template>
  <div class="ticker-add-form">
    <div class="ticker-group-input">
      <label for="ticker-name">Название тикера</label>
      <t-input
        @keydown.enter="toggle"
        id="ticker-name"
        ref="tickerName"
        class="mt-2"
        v-model.trim="tickerName"
        placeholder="Например: DOGE"
      />
    </div>
    <t-button class="mt-2" @click="toggle">Добавить</t-button>
  </div>
</template>

<script>
export default {
  name: "FormAdd",
  data() {
    return {
      tickerName: "",
    };
  },
  methods: {
    toggle() {
      if (!this.tickerName) {
        return;
      }

      let formattedTickerName = this.tickerName.toUpperCase();
      this.$emit("toggle", formattedTickerName);
      this.tickerName = "";
      this.$refs.tickerName.focus();
    },
  },
};
</script>
