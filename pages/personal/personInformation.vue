<template>
  <view class="container">
    <!-- 头像和昵称 -->
    <view class="profile-box">
      <image class="avatar" src="/static/avatar.png"></image>
      <view class="nickname-box">
        <text class="nickname-label">昵称</text>
        <text class="nickname">{{ nickname }}</text>
      </view>
    </view>

    <!-- 信息分组 -->
    <view class="group-list">
      <view class="info-group" v-for="group in infoGroups" :key="group.groupName">
        <view class="group-title">{{ group.groupName }}</view>
        <view 
          class="info-item" 
          v-for="item in group.items" 
          :key="item.label"
          @click="handleEdit(item)"
        >
          <view class="item-label">{{ item.label }}</view>
          <view class="item-value">
            <text>{{ item.value }}</text>
            <text class="item-arrow">›</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { base_url } from '@/api/config.js'
const nickname = '阿郭'
const infoGroups = [
  {
    groupName: '基本信息',
    items: [
      { label: '用户名', value: '阿郭', to: '/pages/nickname/nickname' },
      { label: '真实姓名', value: '郭笑荣', to: '/pages/name/name' },
      { label: '性别', value: '男', to: '/pages/gender/gender' }
    ]
  },
  {
    groupName: '学校基本信息',
    items: [
      { label: '学校', value: '大连东软信息学院', to: '/pages/info/school' },
      { label: '学院', value: '计算机学院', to: '/pages/info/institute' },
      { label: '年级', value: '大三', to: '/pages/info/grade' },
      { label: '专业名称', value: '软件工程', to: '/pages/info/major' },
    ]
  }
]

function handleEdit(item) {
  uni.navigateTo({ url: item.to })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  box-sizing: border-box;
  padding-bottom: 32rpx;
}
.profile-box {
  display: flex;
  align-items: center;
  padding: 48rpx 0 20rpx 44rpx;
  background: #fff;
  .avatar {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background: #ffd6a1;
  }
  .nickname-box {
    margin-left: 24rpx;
    display: flex;
    flex-direction: column;
    .nickname-label {
      color: #bbb;
      font-size: 26rpx;
      margin-bottom: 6rpx;
    }
    .nickname {
      font-size: 30rpx;
      color: #222;
      font-weight: bold;
    }
  }
}
.group-list {
  margin-top: 16rpx;
}
.info-group {
  background: #fff;
  border-radius: 20rpx;
  margin: 0 16rpx 28rpx 16rpx;
  overflow: hidden;
  .group-title {
    padding: 18rpx 32rpx 0 32rpx;
    color: #999;
    font-size: 26rpx;
  }
  .info-item {
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    height: 88rpx;
    font-size: 30rpx;
    border-bottom: 1px solid #f2f2f2;
    background: #fff;
    &:last-child {
      border-bottom: none;
    }
    .item-label {
      color: #222;
      flex: 1;
    }
    .item-value {
      color: #888;
      display: flex;
      align-items: center;
      .item-arrow {
        color: #bbb;
        font-size: 34rpx;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
