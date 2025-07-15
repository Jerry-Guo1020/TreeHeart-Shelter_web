<template>
  <view class="activity-detail-page" v-if="activity">
    <!-- 活动详情 -->
    <image :src="activity.cover" class="detail-cover" />
    <view class="detail-content">
      <view class="tag-row">
        <text class="card-tag" :style="{background:activity.tagColor}">{{ activity.tag }}</text>
        <text class="audience-tag">{{ activity.audience }}</text>
      </view>
      <view class="title">{{ activity.title }}</view>
      <view class="sub-title">{{ activity.subTitle }}</view>
      <view class="info-row">
        <text>🗓️ {{ activity.time }}</text>
        <text class="info-dot">·</text>
        <text>📍{{ activity.place }}</text>
      </view>
      <view class="info-row">
        <image :src="activity.clubAvatar" class="club-avatar" />
        <text class="club-name">{{ activity.clubName }}</text>
      </view>
      <view class="section-title">活动介绍</view>
      <view class="desc">{{ activity.desc }}</view>
      <view class="avatars-row">
        <image v-for="(av, idx) in activity.avatars" :key="idx" :src="av" class="avatar-img" />
        <text class="joined">{{ activity.joined }}</text>
      </view>
      <button class="signup-btn" @tap="onSignup(activity)">立即报名</button>
    </view>

    <!-- 评论区 -->
    <view class="comment-section">
      <view class="comment-input-area">
        <image :src="userInfo.avatar" class="comment-avatar" />
        <textarea
          v-model="commentContent"
          placeholder="在这里写下你的想法..."
          class="comment-textarea"
          auto-height
        />
        <button @click="publishComment" class="comment-btn">评论</button>
      </view>

      <view class="comment-list-header">评论 ({{ comments.length }})</view>
      <view class="comment-list">
        <view v-for="comment in comments" :key="comment.id" class="comment-item">
          <image :src="comment.avatar" class="comment-avatar" />
          <view class="comment-content-wrapper">
            <view class="comment-user-info">
              <text class="comment-username">{{ comment.username }}</text>
              <text class="comment-time">{{ comment.time }}</text>
            </view>
            <text class="comment-text">{{ comment.text }}</text>
            <view class="comment-actions">
              <view class="action-item" @click="handleCommentLike(comment.id)">
                <text class="icon">👍</text>
                <text class="count">{{ comment.likes }}</text>
              </view>
              <view class="action-item" @click="handleReply(comment.id)">
                <text class="icon">↩️</text>
                <text class="count">回复</text>
              </view>
            </view>
          </view>
        </view>
        <view v-if="comments.length === 0" class="no-comments">暂无评论</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { activities } from '@/data/activities.js'

// 1. 活动详情数据
const activity = ref(null)
onLoad((params) => {
  const id = Number(params.id)
  activity.value = activities.find(act => act.id === id) || null
})

// 2. 当前用户信息（支持用户头像和昵称自定义）
const userInfo = ref({
  avatar: '/static/avatar.png',
  nickname: '当前用户'
})
const localUser = uni.getStorageSync('user')
if (localUser && typeof localUser === 'object') {
  if (localUser.avatar) userInfo.value.avatar = localUser.avatar
  if (localUser.nickname) userInfo.value.nickname = localUser.nickname
}

// 3. 评论数据
const commentContent = ref('')
const comments = ref([])

// 4. 立即报名
function onSignup(activity) {
  uni.showModal({
    title: '确认报名',
    content: `确定要报名参加「${activity.title}」吗？`,
    confirmText: '确认报名',
    cancelText: '再想想',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '报名成功',
          icon: 'success'
        })
      }
    }
  })
}

// 5. 发布评论
function publishComment() {
  if (!commentContent.value.trim()) {
    uni.showToast({ title: '评论内容不能为空', icon: 'none' })
    return
  }
  comments.value.unshift({
    id: Date.now(),
    avatar: userInfo.value.avatar,
    username: userInfo.value.nickname || '当前用户',
    time: '刚刚',
    text: commentContent.value.trim(),
    likes: 0
  })
  commentContent.value = ''
  uni.showToast({ title: '评论成功', icon: 'success' })
}

// 6. 点赞评论
function handleCommentLike(commentId) {
  const c = comments.value.find(c => c.id === commentId)
  if (c) {
    c.likes++
    uni.showToast({ title: '点赞成功', icon: 'none' })
  }
}

// 7. 回复评论
function handleReply(commentId) {
  uni.showToast({ title: `回复评论${commentId}功能待完善`, icon: 'none' })
}
</script>

<style scoped>
/* 详情区域，按你的原样式 */
.activity-detail-page {
  background: #f7fafc;
  min-height: 100vh;
}
.detail-cover {
  width: 100%;
  height: 320rpx;
  object-fit: cover;
  display: block;
  border-radius: 0 0 32rpx 32rpx;
}
.detail-content {
  padding: 28rpx 24rpx 18rpx 24rpx;
  background: #fff;
  border-radius: 28rpx 28rpx 0 0;
  margin-top: -28rpx;
}
.tag-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-bottom: 10rpx;
}
.card-tag {
  font-size: 22rpx;
  color: #fff;
  border-radius: 8rpx;
  padding: 2rpx 16rpx;
  font-weight: bold;
}
.audience-tag {
  background: #FFF2DD;
  color: #FFA940;
  border-radius: 8rpx;
  font-size: 19rpx;
  padding: 1rpx 8rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
  color: #222;
  margin: 8rpx 0 4rpx 0;
}
.sub-title {
  font-size: 24rpx;
  color: #888;
  margin-bottom: 12rpx;
}
.info-row {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #7c7c7c;
  margin-bottom: 6rpx;
}
.info-dot {
  color: #ccc;
  margin: 0 9rpx;
}
.club-avatar {
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  border: 1rpx solid #e1e1e1;
  margin-right: 9rpx;
}
.club-name {
  font-size: 22rpx;
  color: #8a7b7b;
  font-weight: 500;
}
.section-title {
  margin-top: 18rpx;
  font-size: 25rpx;
  color: #FFA940;
  font-weight: bold;
  margin-bottom: 8rpx;
}
.desc {
  font-size: 23rpx;
  color: #555;
  line-height: 1.7;
  margin-bottom: 18rpx;
}
.avatars-row {
  display: flex;
  align-items: center;
  margin-bottom: 22rpx;
}
.avatar-img {
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
  margin-right: -8rpx;
}
.joined {
  font-size: 20rpx;
  color: #39d368;
  margin-left: 12rpx;
  background: #eaffea;
  border-radius: 8rpx;
  padding: 1rpx 8rpx;
}
.signup-btn {
  background: #FFA940;
  color: #fff;
  font-size: 40rpx;
  border-radius: 20rpx;
  padding: 0 38rpx;
  font-weight: 600;
  line-height: 75rpx;
  border: none;
}
.signup-btn:active {
  background: #FFB866;
}

/* 评论区 - 完全复刻社区风格 */
.comment-section {
  background: #fff;
  border-radius: 32rpx;
  margin: 20rpx 18rpx;
  padding: 30rpx 28rpx;
  box-shadow: 0 6rpx 30rpx rgba(120, 160, 120, 0.07);
}
.comment-input-area {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30rpx;
}
.comment-input-area .comment-avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  flex-shrink: 0;
}
.comment-textarea {
  flex-grow: 1;
  padding: 20rpx;
  background-color: #f6f6f6;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
  box-sizing: border-box;
}
.comment-btn {
  background: linear-gradient(90deg, #ffb570 0%, #ff8247 100%);
  color: #fff;
  font-size: 28rpx;
  padding: 16rpx 30rpx;
  border-radius: 16rpx;
  margin-left: 20rpx;
  margin-bottom: 12rpx;
  flex-shrink: 0;
  line-height: 1;
  height: auto;
}
.comment-btn::after { border: none; }
.comment-list-header {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #eee;
}
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}
.comment-item {
  display: flex;
  align-items: flex-start;
}
.comment-item .comment-avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  flex-shrink: 0;
}
.comment-content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.comment-user-info {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}
.comment-username {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-right: 15rpx;
}
.comment-time {
  font-size: 22rpx;
  color: #888;
}
.comment-text {
  font-size: 28rpx;
  color: #555;
  line-height: 1.6;
  margin-bottom: 10rpx;
}
.comment-actions {
  display: flex;
  gap: 30rpx;
  font-size: 24rpx;
  color: #aaa;
}
.comment-actions .action-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.comment-actions .icon {
  font-size: 28rpx;
  margin-right: 8rpx;
}
.no-comments {
  text-align: center;
  color: #888;
  font-size: 28rpx;
  padding: 40rpx 0;
}
</style>
