<template>
  <view class="container">
    <!-- 头像和昵称 -->
    <view class="profile-box">
      <image class="avatar" :src="userInfo.avatar || (base_url + '/static/avatar.png')"></image>
      <view class="nickname-box">
        <text class="nickname-label">昵称</text>
        <text class="nickname">{{ userInfo.nickname || '游客' }}</text>
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
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app'; // 从 @dcloudio/uni-app 导入 onShow
import { base_url } from '@/api/config.js'

const userInfo = ref({}); // 存储用户信息的响应式对象
const infoGroups = ref([]); // 存储信息分组的响应式数组

onShow(() => {
  const storedUser = uni.getStorageSync('user');
  if (storedUser) {
    userInfo.value = storedUser;
    console.log('个人信息页面加载用户信息:', userInfo.value);
    // 根据用户信息动态生成 infoGroups
    infoGroups.value = [
      {
        groupName: '基本信息',
        items: [
          { label: '用户名', value: userInfo.value.nickname || '未设置', to: '/pages/info/nickname' },
          // 真实姓名目前 User 表中没有，如果需要，后端 User 表需要添加该字段
          { label: '真实姓名', value: userInfo.value.username || '未设置', to: '/pages/info/name' },
          { label: '性别', value: userInfo.value.sex || '未设置', to: '/pages/info/gender' }
        ]
      },
      {
        groupName: '学校基本信息',
        items: [
          { label: '学校', value: userInfo.value.college || '未设置', to: '/pages/info/school' },
          { label: '学院', value: userInfo.value.subCollege || '未设置', to: '/pages/info/institute' },
          { label: '年级', value: userInfo.value.grade || '未设置', to: '/pages/info/grade' },
          { label: '专业名称', value: userInfo.value.major || '未设置', to: '/pages/info/major' },
        ]
      }
    ];
  } else {
    console.log('个人信息页面未找到用户信息');
    // uni.navigateTo({ url: '/pages/login/login' }); // 如果需要强制登录
    // 也可以显示默认的空数据
    infoGroups.value = [
      {
        groupName: '基本信息',
        items: [
          { label: '用户名', value: '未登录', to: '/pages/nickname/nickname' },
          { label: '性别', value: '未登录', to: '/pages/gender/gender' }
        ]
      },
      {
        groupName: '学校基本信息',
        items: [
          { label: '学校', value: '未登录', to: '/pages/info/school' },
          { label: '学院', value: '未登录', to: '/pages/info/institute' },
          { label: '年级', value: '未登录', to: '/pages/info/grade' },
          { label: '专业名称', value: '未登录', to: '/pages/info/major' },
        ]
      }
    ];
  }
});

function handleEdit(item) {
  uni.navigateTo({ url: item.to })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 40rpx;
}

.profile-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0 40rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  margin-bottom: 20rpx;
  border: 4rpx solid #eee;
}

.nickname-box {
  display: flex;
  align-items: center;
  font-size: 32rpx;
  color: #333;
}

.nickname-label {
  font-weight: bold;
  margin-right: 10rpx;
}

.nickname {
  font-weight: normal;
}

.group-list {
  padding: 0 30rpx;
}

.info-group {
  background-color: #fff;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
}

.group-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #666;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 28rpx;
  color: #333;
  cursor: pointer;
}

.info-item:last-child {
  border-bottom: none;
}

.item-label {
  flex: 1;
}

.item-value {
  display: flex;
  align-items: center;
  color: #999;
}

.item-arrow {
  margin-left: 10rpx;
  font-size: 24rpx;
  color: #ccc;
}
</style>
