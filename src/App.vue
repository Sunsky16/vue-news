<template>
  <div class="">
    <!-- 展示的位置 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- 底部部分 -->
    <van-tabbar route>
      <van-tabbar-item fixed replace to="/" icon="home-o" active-color="#1989fa">标签</van-tabbar-item>
      <van-tabbar-item fixed replace to="/user" icon="user-o" active-color="#1989fa">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less" scoped>

</style>
