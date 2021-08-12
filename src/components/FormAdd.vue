<template>
  <div class="ticker-add-form">
    <div class="ticker-group-input">
      <label for="ticker-name">Название тикера</label>
      <t-input id="ticker-name" class="mt-2" v-model="tickerName"></t-input>
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
      const vm = this;

      try {
        vm.validate();
        vm.$emit("toggle", vm.tickerName);
        vm.tickerName = "";
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
