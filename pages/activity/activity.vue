<template>
  <view class="activity-home">
    <!-- 顶部心理Banner -->
    <view class="banner-section">
      <image src="http://43.142.21.211:3000/static/test_1.jpg" class="banner-img"/>
      <view class="banner-title">
        <text class="main-title">发现·心理成长活动</text>
        <text class="sub-title">参与心理体验，收获温暖与成长</text>
      </view>
    </view>

    <!-- 筛选Tab -->
    <scroll-view scroll-x class="activity-tabs">
      <view
        v-for="(tab, idx) in tabs"
        :key="idx"
        :class="['tab-btn', activeTab === idx ? 'active' : '']"
        @tap="switchTab(idx)"
      >{{ tab }}</view>
    </scroll-view>

    <!-- 活动列表 -->
    <view class="activity-list">
      <view
        v-for="item in filteredActivities"
        :key="item.id"
        class="activity-card"
        @tap="goDetail(item)"
      >
        <!-- 卡片内容 -->
        <view class="card-top">
          <view class="tag-row">
            <text class="top-label">{{ item.label }}</text>
            <text class="top-desc">{{ item.subtitle }}</text>
          </view>
          <image :src="item.cover" class="activity-img" mode="aspectFill"/>
        </view>
        <view class="card-title">{{ item.title }}</view>
        <view class="card-desc">{{ item.desc }}</view>
        <view class="card-info-row">
          <view class="info-tag" :style="{ background: orangeBg, color: orange }">{{ item.type }}</view>
          <view class="info-text">{{ item.time }}</view>
        </view>
        <view class="card-footer">
          <view class="avatars">
            <image v-for="(avatar, idx) in item.avatars" :key="idx" :src="avatar" class="avatar-img"/>
            <text class="joined-text">{{ item.joinedText }}</text>
          </view>
          <button class="signup-btn" :style="{ background: orange }" @tap.stop="goSignup(item)">报名参加</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
const orange = '#FFA940'
const orangeBg = '#FFF3E6'

const tabs = ['热门活动', '团体辅导', '讲座沙龙', '心理游戏', '全部']
const activeTab = ref(0)

const activities = ref([
  {
    id: 1,
    label: '心理专场',  // 顶部标签
    subtitle: '用心成长，共同参与',  // 顶部副标题
    cover: 'http://43.142.21.211:3000/static/test_1.jpg', // 活动主图
    title: '情绪减压工作坊',
    desc: '体验心理减压，学习调节情绪方法。',
    type: '团体辅导',
    time: '07/20 19:30-21:00',
    avatars: [
      '/static/avatar1.png', '/static/avatar2.png', '/static/avatar3.png'
    ],
    joinedText: '28人已报名'
  },
  {
    id: 2,
    label: '心理游戏',
    subtitle: '社交互动 心灵放松',
    cover: 'http://43.142.21.211:3000/static/test_1.jpg',
    title: '人际沟通体验营',
    desc: '提升沟通力，体验心理游戏。',
    type: '心理游戏',
    time: '07/22 15:00-17:00',
    avatars: [
      '/static/avatar2.png', '/static/avatar3.png'
    ],
    joinedText: '15人已报名'
  },
  // 更多活动...
])

const filteredActivities = computed(() => {
  if (tabs[activeTab.value] === '全部' || tabs[activeTab.value] === '热门活动') {
    return activities.value
  }
  return activities.value.filter(item => item.type === tabs[activeTab.value])
})

function switchTab(idx) {
  activeTab.value = idx
}
function goDetail(item) {
  uni.navigateTo({ url: `/pages/activity/detail?id=${item.id}` })
}
function goSignup(item) {
  // 报名逻辑
  uni.showToast({ title: '报名成功', icon: 'success' })
}
</script>

<style scoped>
.activity-home { background: #f6f6f6; min-height: 100vh; }
.banner-section { position: relative; }
.banner-img { width: 100%; height: 120px; border-radius: 18rpx; object-fit: cover; }
.banner-title {
  position: absolute; left: 24rpx; top: 26rpx; z-index: 2;
  color: #222; font-weight: bold;
}
.main-title { font-size: 38rpx; display: block; margin-bottom: 8rpx; }
.sub-title { font-size: 24rpx; color: #FFA940; }

.activity-tabs {
  display: flex; flex-direction: row;
  padding: 10rpx 0 16rpx 0; white-space: nowrap; overflow-x: scroll;
}
.tab-btn {
  display: inline-block; min-width: 92rpx;
  padding: 12rpx 28rpx;
  border-radius: 28rpx; font-size: 28rpx; margin-right: 14rpx;
  background: #F6F6F6; color: #999;
  transition: 0.2s;
}
.tab-btn.active {
  background: #FFA940; color: #fff; font-weight: bold;
  box-shadow: 0 2rpx 12rpx rgba(255, 169, 64, 0.18);
}

.activity-list { padding: 10rpx 0 40rpx 0; }

.activity-card {
  margin: 18rpx 20rpx 24rpx 20rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 6rpx 32rpx #FFE9CC;
  padding: 0 0 18rpx 0;
  overflow: hidden;
}

.card-top {
  padding: 20rpx 20rpx 0 20rpx;
}
.tag-row {
  display: flex; align-items: center; margin-bottom: 10rpx;
}
.top-label {
  font-size: 24rpx; color: #fff;
  background: #FFA940; border-radius: 10rpx;
  padding: 2rpx 16rpx; font-weight: 600;
  margin-right: 16rpx;
}
.top-desc {
  font-size: 24rpx; color: #FFA940;
  font-weight: 600;
}
.activity-img {
  width: 100%; height: 140rpx;
  border-radius: 16rpx; margin-top: 12rpx; object-fit: cover;
}

.card-title {
  font-size: 32rpx; font-weight: 600; color: #222; padding: 16rpx 20rpx 0 20rpx;
}
.card-desc {
  font-size: 24rpx; color: #888; padding: 8rpx 20rpx 0 20rpx;
}

.card-info-row {
  display: flex; align-items: center;
  padding: 10rpx 20rpx 0 20rpx;
  gap: 16rpx;
}
.info-tag {
  font-size: 22rpx;
  border-radius: 10rpx;
  padding: 4rpx 14rpx;
}
.info-text {
  font-size: 22rpx; color: #666;
}

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16rpx 20rpx 0 20rpx;
}
.avatars { display: flex; align-items: center; }
.avatar-img {
  width: 38rpx; height: 38rpx; border-radius: 50%; border: 2rpx solid #fff;
  box-shadow: 0 2rpx 8rpx #FFE0B2; margin-right: -10rpx;
}
.joined-text {
  margin-left: 14rpx; font-size: 22rpx; color: #FFA940; background: #FFF3E6;
  border-radius: 10rpx; padding: 2rpx 10rpx;
}

.signup-btn {
  position: absolute;
  color: #fff; font-size: 26rpx; border-radius: 20rpx; padding: 6rpx 36rpx;
  font-weight: 500; border: none;
  box-shadow: 0 2rpx 12rpx rgba(255, 169, 64, 0.13);
  margin-left: 18rpx;
  right: 26rpx;
  
}
</style>
