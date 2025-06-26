<template>
  <view class="container">
    <view class="header">求助</view>
    <view class="help-types">
      <view class="help-type">
        <image src="/static/help-phone.png" class="help-icon" alt="电话求助"></image>
        <view class="help-label">电话求助</view>
      </view>
      <view class="help-type">
        <image src="/static/help-one2one.png" class="help-icon" alt="一对一求助"></image>
        <view class="help-label">一对一求助</view>
      </view>
      <view class="help-type">
        <image src="/static/help-record.png" class="help-icon" alt="求助记录"></image>
        <view class="help-label">求助记录</view>
      </view>
    </view>
    <view class="activity-list">
      <view class="activity-item" v-for="(item, idx) in activities" :key="idx">
        <view class="activity-title">{{ item.title }}</view>
        <image :src="item.img" class="activity-img" :alt="item.title"></image>
        <view class="activity-time">{{ item.time }}</view>
      </view>
    </view>
    <view class="tabbar">
      <image src="/static/tab-home.png" class="tab-icon" alt="首页"></image>
      <image src="/static/tab-help.png" class="tab-icon" alt="求助"></image>
      <image src="/static/tab-tree.png" class="tab-icon center" alt="树洞"></image>
      <image src="/static/tab-message.png" class="tab-icon" alt="消息"></image>
      <image src="/static/tab-mine.png" class="tab-icon" alt="我的"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          title: '阳光“心”旅——户外心理探索活动',
          img: '/static/activity1.jpg', // 占位图片
          time: '2025年05月20日 09:51'
        },
        {
          title: '阳光“心”旅——户外心理探索活动',
          img: '/static/activity1.jpg',
          time: '2025年05月20日 09:51'
        },
        {
          title: '阳光“心”旅——户外心理探索活动',
          img: '/static/activity1.jpg',
          time: '2025年05月20日 09:51'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  padding-bottom: 120rpx;
}
.header {
  font-size: 40rpx;
  font-weight: bold;
  color: #222;
  text-align: center;
  margin-top: 48rpx;
  margin-bottom: 24rpx;
  letter-spacing: 4rpx;
}
.help-types {
  display: flex;
  justify-content: space-around;
  background: #fff;
  border-radius: 32rpx;
  margin: 0 32rpx 32rpx 32rpx;
  padding: 32rpx 0;
  box-shadow: 0 8rpx 32rpx #f6e7d6;
}
.help-type {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.help-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 12rpx;
}
.help-label {
  font-size: 26rpx;
  color: #7ed957;
  font-weight: bold;
}
.activity-list {
  margin: 0 32rpx;
}
.activity-item {
  background: #fff;
  border-radius: 24rpx;
  margin-bottom: 32rpx;
  padding: 24rpx 0 0 0;
  box-shadow: 0 8rpx 32rpx #f6e7d6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.activity-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #222;
  margin-left: 24rpx;
  margin-bottom: 12rpx;
}
.activity-img {
  width: 100%;
  height: 180rpx;
  object-fit: cover;
  border-radius: 16rpx;
  margin-bottom: 8rpx;
}
.activity-time {
  font-size: 22rpx;
  color: #888;
  margin-left: 24rpx;
  margin-bottom: 16rpx;
}
.tabbar {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 100rpx;
  background: #222;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
}
.tab-icon {
  width: 64rpx;
  height: 64rpx;
}
.center {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 24rpx;
}
</style>