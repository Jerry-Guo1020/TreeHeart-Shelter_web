<template>
  <view class="container">
    <view class="header">
      <image class="logo" :src="base_url + '/static/logo.png'" alt="树洞logo"></image>
      <view class="hello">Hello!</view>
      <view class="desc">欢迎来到大学生心灵树洞</view>
    </view>
    <view class="card">
      <view class="title">请输入你的昵称</view>
      <input class="input" v-model="nickname" placeholder="请输入昵称"/>
      <button class="next-btn" @click="goNext">→</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { base_url } from '@/api/config.js';
import { updateUserInfo } from '@/api/user.js'; // 导入更新用户信息的API

const nickname = ref(''); // 对应 userInfo.nickname

onShow(() => {
  const storedUser = uni.getStorageSync('user');
  if (storedUser && storedUser.nickname) {
    nickname.value = storedUser.nickname;
  }
});

const goNext = async () => {
  if (!nickname.value) {
    uni.showToast({ title: '请填写昵称', icon: 'none' });
    return;
  }

  try {
    uni.showLoading({ title: '保存中...' });
    const res = await updateUserInfo({ nickname: nickname.value });
    uni.hideLoading();

    if (res.code === 200) {
      uni.showToast({ title: '昵称更新成功', icon: 'success' });
      uni.setStorageSync('user', res.data.user);
      uni.navigateBack(); // 返回上一页 (个人信息详情页)
    } else {
      uni.showToast({ title: res.msg || '昵称更新失败', icon: 'none' });
    }
  } catch (error) {
    uni.hideLoading();
    console.error('更新昵称失败:', error);
    uni.showToast({ title: '网络错误，请重试', icon: 'none' });
  }
};
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

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
  padding-top: 100rpx;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
}

.hello {
  font-size: 70rpx;
  font-weight: bolder;
  color: #333;
}

.desc {
  font-size: 30rpx;
  color: #666;
  margin-top: 10rpx;
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
  font-size: 40rpx;
  margin-top: 60rpx;
  margin-bottom: 40rpx;
  text-align: center;
}

.input {
  width: 80%;
  height: 80rpx;
  border: 2rpx solid #eee;
  border-radius: 16rpx;
  padding: 0 20rpx;
  font-size: 32rpx;
  margin-bottom: 60rpx;
  text-align: center;
}

.next-btn {
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