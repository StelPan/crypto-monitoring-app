<template>
  <div>
    <div class="container">
      <div class="px-4">
        <FormAdd @toggle="add"/>
      </div>
    </div>
  </div>
</template>

<script>
import FormAdd from "@/components/FormAdd";

export default {
  name: "Home",
  components: {
    FormAdd,
  },
  methods: {
    add(tickerName) {
      alert(tickerName);
    },
  },
};
</script>
