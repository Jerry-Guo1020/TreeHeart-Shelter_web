<template>
  <view class="container">
    <view class="header">
      <image class="logo" src="/static/tree-logo.png" alt="树洞logo"></image>
      <view class="hello">Hello!</view>
      <view class="desc">欢迎来到大学生心灵树洞</view>
    </view>
    <view class="card">
      <view class="title">请输入你的信息</view>
      <view class="form">
        <view class="form-item">
          <view class="label">教育阶段</view>
          <input class="input" v-model="stage" placeholder="如：大三"/>
        </view>
        <view class="form-item">
          <view class="label">所在学校</view>
          <input class="input" v-model="school" placeholder="如：广东东软学院"/>
        </view>
        <view class="form-item">
          <view class="label">所在学院</view>
          <input class="input" v-model="college" placeholder="如：数字媒体与设计学院"/>
        </view>
        <view class="form-item">
          <view class="label">所学专业</view>
          <input class="input" v-model="major" placeholder="如：视觉传达设计"/>
        </view>
      </view>
      <button class="next-btn" @click="goNext">→</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      stage: '',
      school: '',
      college: '',
      major: ''
    }
  },
  methods: {
    goNext() {
      if (!this.stage || !this.school || !this.college || !this.major) {
        uni.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }
      uni.navigateTo({ url: '/pages/name/name' });
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
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
.form {
  width: 80%;
}
.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  background: #FFF7E6;
  border-radius: 32rpx;
  padding: 0 24rpx;
  height: 72rpx;
}
.label {
  width: 160rpx;
  font-size: 28rpx;
  color: #888;
}
.input {
  flex: 1;
  font-size: 28rpx;
  border: none;
  background: transparent;
  outline: none;
}
.next-btn {
  width: 120rpx;
  height: 60rpx;
  background: #FF9900;
  color: #fff;
  border-radius: 32rpx;
  font-size: 36rpx;
  border: none;
  margin-top: 40rpx;
}
</style>