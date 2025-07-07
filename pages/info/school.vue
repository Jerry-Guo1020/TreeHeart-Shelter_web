<template>
  <view class="container">
    <view class="title">
      <view class="section1">
        <view class="logo">
          <image :src="BASE_URL + '/static/logo.png'" mode="aspectFill" class="logoPhoto" />
        </view>
        <view class="hello">Hello!</view>
      </view>
      <view class="section2">
        <text class="s2Content">欢迎来到心理树洞！</text>
      </view>
    </view>
    <view class="card">
      <view class="title">请输入你的信息</view>
      <view class="form">
        <view class="form-item">
          <view class="label">所在学校</view>
          <input class="input" v-model="college" placeholder="如：XX大学"/>
        </view>
      </view>
      <button class="next-btn" @click="goNext">→</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { BASE_URL } from '@/api/config.js';
import { updateUserInfo } from '@/api/user.js'; // 导入更新用户信息的API

const college = ref(''); // 对应 userInfo.college

onShow(() => {
  const storedUser = uni.getStorageSync('user');
  if (storedUser && storedUser.college) {
    college.value = storedUser.college;
  }
});

const goNext = async () => {
  if (!college.value) {
    uni.showToast({ title: '请填写所在学校', icon: 'none' });
    return;
  }

  try {
    uni.showLoading({ title: '保存中...' });
    const res = await updateUserInfo({ college: college.value });
    uni.hideLoading();

    if (res.code === 200) {
      uni.showToast({ title: '学校更新成功', icon: 'success' });
      uni.setStorageSync('user', res.data.user);
      uni.navigateBack(); // 返回上一页 (个人信息详情页)
    } else {
      uni.showToast({ title: res.msg || '学校更新失败', icon: 'none' });
    }
  } catch (error) {
    uni.hideLoading();
    console.error('更新学校失败:', error);
    uni.showToast({ title: '网络错误，请重试', icon: 'none' });
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

.title {
  margin: 60rpx;
  display: flex;
  padding-top: 100rpx;
  flex-direction: column;
  font-size: 40rpx;
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