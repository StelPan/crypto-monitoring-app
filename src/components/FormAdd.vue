<template>
  <div class="ticker-add-form">
    <div class="ticker-group-input">
      <label for="ticker-name">Название тикера</label>
      <t-input id="ticker-name" class="mt-2" v-model="tickerName" placeholder="Например: DOGE"></t-input>
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

      this.$emit("toggle", this.tickerName);
      this.tickerName = "";
    },
  },
};
</script>
