<template>
  <div class="wrapper">
    <Header :ifIndex="false" />
    <div class="content-wrapper">
      <DiscussLeft />
      <DiscussRight />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/Footer";
import DiscussLeft from "@/components/discuss/discussLeft";
import DiscussRight from "@/components/discuss/discussRight";

export default {
  data() {
    return {};
  },
  components: { Header, DiscussLeft, Footer, DiscussRight },
  methods: {},
};
</script>

<style lang="less" scoped>
.content-wrapper {
  display: flex;
  width: 1100px;
  margin: auto;
  justify-content: space-between;
  padding: 30px 0;
}
</style>
