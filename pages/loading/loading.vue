<template>
  <view class="container">
    <view class="mask"></view>
    <view class="loading-text">加载中...</view>
  </view>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  position: relative;
}
.mask {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.8);
  z-index: 1;
}
.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32rpx;
  color: #FF9900;
  z-index: 2;
}
</style>