<template>
  <view class="container">
    <!-- 头像与昵称 -->
    <view class="profile-header">
      <image :src="userInfo.avatar || (base_url + '/static/头像.png')" class="avatar" />
      <view class="username-row">
        <text class="username">{{ userInfo.nickname || '游客' }}</text>
        <!-- 根据性别动态显示图标 -->
        <image v-if="userInfo.sex === '男'" :src="base_url + '/static/male.png'" class="sex-icon" mode="aspectFit" alt="男" />
        <image v-else-if="userInfo.sex === '女'" :src="base_url + '/static/female.png'" class="sex-icon" mode="aspectFit" alt="女" />
        <image v-else src="" class="sex-icon" mode="aspectFit" alt="性别" /> <!-- 默认或未知性别 -->
      </view>
      <view class="stats-row">
        <view class="stat-item">
          <text class="stat-num">0</text> <!-- 暂时硬编码，如果后端有关注数再动态获取 -->
          <text class="stat-label">关注</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-num">0</text> <!-- 暂时硬编码，如果后端有粉丝数再动态获取 -->
          <text class="stat-label">粉丝</text>
        </view>
      </view>
    </view>

    <!-- 卡片区域 -->
    <view class="card">
      <view class="card-row">
        <view class="card-btn favorite">
         <image :src="base_url + '/static/fun_1.png'" class="card-icon" mode="aspectFit" />
          <text class="card-text">我的收藏</text>
        </view>
        <view class="card-btn settings">
         <image :src="base_url + '/static/fun_1.png'" class="card-icon" mode="aspectFit" />
          <text class="card-text">设置</text>
        </view>
      </view>
      <view class="card-list">
        <view class="list-btn" @click="toPersonInformation">个人信息</view>
        <view class="list-btn">求助记录</view>
		<view class="list-btn" @click="toassessmentRecord">测试记录</view>
      </view>
    </view>
    
    <!-- 底部导航 -->
    <BottomNavbar :current="3" />
  </view>
</template>

<script setup>
import { ref } from 'vue'; // 导入 ref
import { onShow } from '@dcloudio/uni-app'; // 从 @dcloudio/uni-app 导入 onShow
import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'
// import { Router } from 'lucide-vue-next'; // 这个导入似乎没有用到，可以移除
import { base_url } from '@/api/config.js'

const userInfo = ref({}); // 定义一个响应式对象来存储用户信息

// 页面显示时加载用户信息
onShow(() => {
  const storedUser = uni.getStorageSync('user');
  if (storedUser) {
    userInfo.value = storedUser;
    console.log('个人中心页面加载用户信息:', userInfo.value);
  } else {
    // 如果没有用户信息，可能需要跳转到登录页或者显示默认信息
    console.log('个人中心页面未找到用户信息');
    // uni.navigateTo({ url: '/pages/login/login' }); // 如果需要强制登录
  }
});

const toPersonInformation = () => {
	uni.navigateTo({ url: '/pages/personal/personInformation' })
}

const toassessmentRecord = () => {
	uni.navigateTo({ url: '/pages/personal/assessmentRecord' })
}

</script>

<style scoped>
/* 整体背景及居中布局 */
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 44rpx;
  padding-bottom: 120rpx;
  box-sizing: border-box;
}

/* 顶部信息 */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16rpx;
  margin-bottom: 24rpx;
}
.avatar {
  width: 132rpx;
  height: 132rpx;
  border-radius: 50%;
  border: 6rpx solid #5BC481;
  background: #fff;
  margin-bottom: 18rpx;
}
.username-row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}
.username {
  font-size: 36rpx;
  font-weight: bold;
  letter-spacing: 2rpx;
  color: #333;
  margin-right: 10rpx;
}
.sex-icon {
  width: 26rpx;
  height: 26rpx;
}
.stats-row {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
  margin-bottom: 4rpx;
}
.stat-item {
  text-align: center;
  min-width: 72rpx;
}
.stat-num {
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
}
.stat-label {
  font-size: 18rpx;
  color: #aaa;
  margin-top: 3rpx;
}
.stat-divider {
  width: 2rpx;
  height: 34rpx;
  background: #eee;
  margin: 0 24rpx;
  border-radius: 2rpx;
}

/* 卡片主区域 */
.card {
  width: 92vw;
  max-width: 680rpx;
  min-width: 320rpx;
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
  box-shadow: 0 6rpx 30rpx rgba(120,160,120,0.07);
  padding: 48rpx 28rpx 36rpx 28rpx;
  margin-top: 8rpx;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.card-row {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 36rpx;
  gap: 22rpx;
}
.card-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 188rpx;
  height: 98rpx;
  border-radius: 24rpx;
  justify-content: center;
  font-size: 22rpx;
  font-weight: 500;
  box-shadow: 0 2rpx 10rpx rgba(120,160,120,0.08);
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.card-btn:active {
  box-shadow: 0 0 0 transparent;
  opacity: 0.85;
}
.favorite {
  background: #E9F9C2;
}
.settings {
  background: #FFD8A1;
}
.card-icon {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 10rpx;
}
.card-text {
  font-size: 24rpx;
  color: #333;
  font-weight: 500;
}
.card-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26rpx;
}
.list-btn {
  background: #FFF4E4;
  border-radius: 32rpx;
  padding: 24rpx 0;
  font-size: 24rpx;
  font-weight: 500;
  text-align: center;
  color: #333;
  cursor: pointer;
  transition: background .2s;
}
.list-btn:active {
  background: #FFD8A1;
}
</style>
