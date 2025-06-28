<template>
  <view class="container">
    <view class="header">
      <image class="logo" src="http://43.142.21.211:3000/static/logo.png" alt="树洞logo"></image>
      <view class="hello">Hello!</view>
      <view class="desc">欢迎来到大学生心灵树洞</view>
    </view>
    <view class="card">
      <view class="title">请输入你的姓名</view>
      <input class="input" v-model="name" placeholder="请输入姓名"/>
      <button class="next-btn" @click="goNext">→</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    goNext() {
      if (!this.name) {
        uni.showToast({ title: '请输入姓名', icon: 'none' });
        return;
      }
      // 这里可以跳转到下一个页面或提交
      uni.showToast({ title: '欢迎，' + this.name, icon: 'success' });
	  uni.navigateTo({
	  	url: '/pages/nickname/nickname'	
	  })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  max-width: auto;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  display: flex;
  flex-direction: column;
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
.input {
  width: 80%;
  font-size: 28rpx;
  border: none;
  background: #FFF7E6;
  border-radius: 32rpx;
  padding: 24rpx;
  margin-bottom: 40rpx;
  outline: none;
  text-align: center;
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