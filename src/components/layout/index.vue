<template>
  <div class="layout">
    <div class="content" id="page-content">
      <router-view />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {

    }
  },
  methods: {

  },
  watch:{

  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  min-width: 1500px;
  background-color: #dbdbdb;

  .content {
    background-color: #dbdbdb;
  }
}
</style>
