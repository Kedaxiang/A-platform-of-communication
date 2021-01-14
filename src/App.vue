<template>
  <div id="app">
    <Layout />
  </div>
  
</template>

<script>
import Layout from "@/components/layout"

export default {
  components: { Layout }
}
</script>

<style lang="less" scoped>
@import "assets/css/base.css";
  #app {
    height: 100%;
    background-color: rgba(244, 244, 244, 1);
  }
</style>
