<template>
  <view class="container">
    <!-- 顶部导航栏 横滑 -->
    <scroll-view class="tabbar-scroll" scroll-x :show-scrollbar="false">
      <view class="tabbar">
        <view
          v-for="(tab, idx) in tabs"
          :key="idx"
          :class="['tab-btn', currentTab === idx ? 'active' : '']"
          @click="switchTab(idx)"
        >{{ tab }}</view>
      </view>
    </scroll-view>

    <!-- 动态内容区 -->
    <scroll-view scroll-y class="content-list">
      <view v-for="(item, idx) in posts" :key="idx" class="post-card">
        <view class="post-header">
          <image :src="item.avatar" class="avatar" />
          <view class="user-info">
            <text class="username">{{ item.username }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
        </view>
        <view class="post-title">{{ item.title }}</view>
        <view class="post-desc">{{ item.desc }}</view>
        <view class="post-footer">
          <text class="footer-action">点赞 {{ item.like }}</text>
          <text class="footer-action">评论 {{ item.comment }}</text>
          <text class="footer-action">收藏 {{ item.collect }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 右下角悬浮按钮 -->
    <view class="fab" @click="onPublish">
      <text class="fab-icon">✏️</text>
    </view>
  </view>
  <BottomNavbar :current="0" />
</template>

<script setup>
import { ref } from 'vue'
import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'

const tabs = [
  '学业压力', '情绪情感', '人际交往', '职业规划', '生活适应', '其他类型'
]
const currentTab = ref(0)

const posts = ref([
  {
    avatar: '/static/avatar.png',
    username: '星光不问少年',
    time: '1小时前',
    title: '铁饭碗3k，新公司4k，选择哪个好？',
    desc: '首先可以把3K和4K两家公司进行对比，工作时间、岗位内容、发展空间等都要考虑，不能只看工资。',
    like: '19.9万',
    comment: 101,
    collect: 1,
  },
  {
    avatar: '/static/avatar.png',
    username: '南风知我意',
    time: '3小时前',
    title: '大家有没有情绪低落的时候？',
    desc: '最近压力好大，情绪一直上不来，有没有好的排解方式呀？',
    like: 8,
    comment: 12,
    collect: 0,
  },
  {
    avatar: '/static/avatar.png',
    username: '小王同学',
    time: '昨天',
    title: '如何快速适应大学生活？',
    desc: '刚进大学觉得很迷茫，求学长学姐们支招！',
    like: 22,
    comment: 9,
    collect: 5,
  },
])

function switchTab(idx) {
  currentTab.value = idx
}

function onPublish() {
  uni.showToast({
    title: '发帖功能开发中',
    icon: 'none'
  })
}
</script>

<style scoped>
.container {
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  color: #222;
  padding-bottom: calc(72px + env(safe-area-inset-bottom, 24px));
  /* 修复横向溢出 */
  width: 100vw !important;
  overflow-x: hidden !important;
}

/* 顶部tabbar横向滑动（完全不溢出！） */
.tabbar-scroll {
  width: 100vw;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.tabbar-scroll::-webkit-scrollbar { display: none; }

.tabbar {
  display: flex;
  flex-direction: row;
  /* min-width: 100vw; 这一句一定要去掉！ */
}

/* 导航按钮风格 */
.tab-btn {
  flex: 0 0 auto;
  margin-right: 14rpx;
  padding: 10rpx 30rpx;
  font-size: 30rpx;
  border-radius: 26rpx;
  background: #f6f6f6;
  color: #555;
  font-weight: 500;
  margin-top: 16rpx;
  margin-bottom: 10rpx;
  transition: all .18s;
  letter-spacing: 1rpx;
  /* 防止撑大页面 */
  max-width: 90vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tab-btn.active {
  background: linear-gradient(90deg, #ffb570 0%, #ff8247 100%);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2rpx 10rpx rgba(255,130,71,0.13);
}

/* 内容区样式 */
.content-list {
  padding: 8rpx 0 30rpx 0;
  min-height: 80vh;
  /* 修复内容卡片可能撑出溢出的问题 */
  width: 100vw;
  overflow-x: hidden;
}

/* 卡片样式 */
.post-card {
  background: #fff;
  border-radius: 22rpx;
  margin: 20rpx 18rpx 0 18rpx;
  padding: 26rpx 20rpx 16rpx 20rpx;
  box-shadow: 0 3rpx 20rpx rgba(200,200,200,0.09);
  display: flex;
  flex-direction: column;
  /* 修复可能溢出 */
  max-width: calc(100vw - 36rpx);
  overflow-x: hidden;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 7rpx;
}
.avatar {
  width: 54rpx;
  height: 54rpx;
  border-radius: 50%;
  margin-right: 15rpx;
  background: #e6e6e6;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.username {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}
.time {
  font-size: 20rpx;
  color: #888;
  margin-top: 4rpx;
}

.post-title {
  font-weight: 700;
  font-size: 32rpx;
  margin: 10rpx 0 8rpx 0;
  color: #222;
  line-height: 1.3;
}

.post-desc {
  color: #555;
  font-size: 25rpx;
  margin-bottom: 14rpx;
  line-height: 1.6;
}

.post-footer {
  display: flex;
  gap: 36rpx;
  color: #aaa;
  font-size: 22rpx;
  margin-top: 6rpx;
}

.footer-action {
  display: inline-block;
  min-width: 58rpx;
}

/* 悬浮发布按钮 */
.fab {
  position: fixed;
  right: 48rpx;
  bottom: 350rpx;
  width: 94rpx;
  height: 94rpx;
  border-radius: 50%;
  background: linear-gradient(135deg,#ffb570 60%,#ff8247 100%);
  box-shadow: 0 6rpx 32rpx rgba(255,130,71,0.17);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
  transition: box-shadow .16s;
}
.fab:active {
  box-shadow: 0 4rpx 14rpx rgba(255,130,71,0.28);
}
.fab-icon {
  font-size: 52rpx;
  color: #fff;
}
</style>
