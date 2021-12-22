<template>
  <div class="main">
    <el-container style="height:100%">
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: bisque;
}
.el-main {
  padding-top: 0;
}
</style>
