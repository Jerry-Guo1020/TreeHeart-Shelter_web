<template>
  <view class="container">
    <view class="header">
      <image class="logo" src="http://43.142.21.211:3000/static/logo.png" alt="树洞logo"></image>
      <view class="hello">Hello!</view>
      <view class="desc">欢迎来到大学生心灵树洞</view>
    </view>
    <view class="card">
      <view class="title">随机生成昵称</view>
      <view class="nickname-box">{{ nickname }}</view>
      <button class="next-btn" @click="goNext">→</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nickname: '树小洞2025'
    }
  },
  methods: {
    goNext() {
      uni.navigateTo({ url: '/pages/home/home' });
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
}
.header {
  display: flex;
  align-items: center;
  margin-top: 40rpx;
  margin-left: 40rpx;
}
.logo {
  width: 60rpx;
  height: 60rpx;
}
.hello {
  font-size: 36rpx;
  font-weight: bold;
  margin-left: 16rpx;
}
.desc {
  font-size: 22rpx;
  color: #888;
  margin-left: 16rpx;
}
.card {
  background: #fff;
  border-radius: 24rpx;
  margin: 80rpx 32rpx 0 32rpx;
  padding: 48rpx 0 80rpx 0;
  box-shadow: 0 8rpx 32rpx #f6e7d6;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 48rpx;
}
.nickname-box {
  width: 80%;
  font-size: 28rpx;
  background: #FFF7E6;
  border-radius: 32rpx;
  padding: 24rpx;
  margin-bottom: 40rpx;
  text-align: center;
  font-weight: bold;
}
.next-btn {
  width: 120rpx;
  height: 60rpx;
  background: #FF9900;
  color: #fff;
  border-radius: 32rpx;
  font-size: 36rpx;
  border: none;
}
</style>