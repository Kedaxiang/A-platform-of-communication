<template>
  <div class="wrapper">
    <DynamicBox v-for="item in list" :key="item.author" :info="item" />
  </div>
</template>

<script>
import DynamicBox from "./dynamicBox.vue";

export default {
  data() {
    return {};
  },
  components: { DynamicBox },
  props: {
    list: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 690px;
}
</style>
