<template>
  <view class="container">
    <view class="title">
      <view class="section1">
        <view class="logo">
          <image src="/static/image/logo.png" mode="aspectFill" class="logoPhoto" />
        </view>
        <view class="hello">Hello!</view>
      </view>
      <view class="section2">
        <text class="s2Content">欢迎来到心理树洞！</text>
      </view>
    </view>

    <view class="card">
      <view class="cardTitle">请选择您的性别</view>
      <view class="sex">
        <view class="boy" :class="{ active: gender === 'male' }" @tap="selectGender('male')">
          <image src="/static/image/男生.png" mode="aspectFill" class="boyLogo" :class="{ active: gender === 'male' }" />
          <view class="boyName">男生</view>
        </view>
        <view class="girl" :class="{ active: gender === 'female' }" @tap="selectGender('female')">
          <image src="/static/image/女生.png" mode="aspectFill" class="girlLogo" :class="{ active: gender === 'female' }" />
          <view class="girlName">女生</view>
        </view>
      </view>
      <button class="btn" @tap="goNext">→</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const gender = ref('')

const selectGender = (value) => {
  gender.value = value
}

const goNext = () => {
  if (!gender.value) {
    uni.showToast({
      title: '请选择性别',
      icon: 'none'
    })
    return
  } 

  uni.navigateTo({
    url: `/pages/info/info?gender=${gender.value}`
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card {
  width: 90%;
  max-width: 750rpx;
  margin: 0 auto;
  background: #fff;
  border-radius: 30rpx 30rpx 0 0;
  padding: 40rpx;
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  align-items: center;
}

.title {
  margin: 60rpx;
  display: flex;
  padding-top: 120rpx;
  flex-direction: column;
}

.section1 {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.section2 {
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  margin-top: 10rpx;
}

.logoPhoto {
  width: 80rpx;
  height: 80rpx;
}

.hello {
  font-size: 70rpx;
  font-weight: bolder;
  margin-left: 20rpx;
}

.cardTitle {
  font-size: 40rpx;
  margin-top: 60rpx;
}

.sex {
  display: flex;
  justify-content: center;
  margin-top: 120rpx;
  margin-bottom: 120rpx;
}

.boy,
.girl {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40rpx;
}

.boyLogo,
.girlLogo {
  border-radius: 100rpx;
  width: 240rpx;
  height: 240rpx;
  object-fit: cover;
}

.boyLogo.active,
.girlLogo.active {
  border: 6rpx solid #ff9900;
  border-radius: 50rpx;
  /* background-color: #fff7e6; */
}

.boy.active,
.girl.active {
  /* background-color: #fff7e6; */
  border-radius: 50rpx;
  
}

.btn {
 padding: 30px;
 background-color: #FF9900;
 color: white;
 font-size: 40px;
 border-radius: 8px;
 font-weight: bolder;
 width: 150px;
 height: 50px;
 justify-content: center;
 align-items: center;
 display: flex;
}
</style>
