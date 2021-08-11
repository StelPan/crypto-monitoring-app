<template>
  <div class="ticker-add-form">
    <label for="ticker-name">Название тикера</label>
    <t-input id="ticker-name" v-model="tickerName"></t-input>
    <t-button @click="toggle">Добавить</t-button>
  </div>
</template>

<script>
export default {
  name: "FormAdd",
  data() {
    return {
      tickerName: "",
    }
  },
  methods: {
    toggle() {
      const vm = this;

      try {
        vm.validate();
        this.$emit('toggle', vm.tickerName);
      } catch (e) {
        alert(e.message);
      }
    },
    validate() {
      if (!this.tickerName) {
        throw new Error("Не указано имя валюты");
      }

      // ...any validate rules
    },
  },
};
</script>
