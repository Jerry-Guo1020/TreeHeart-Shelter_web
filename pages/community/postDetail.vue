<template>
  <view class="container">
    <!-- 帖子详情内容 -->
    <view v-if="currentPost" class="post-detail-card">
      <view class="post-header">
        <image :src="currentPost.avatar" class="avatar" />
        <view class="user-info">
          <text class="username">{{ currentPost.username }}</text>
          <text class="time">{{ currentPost.time }}</text>
        </view>
      </view>
      <view class="post-title">{{ currentPost.title }}</view>
      <view class="post-desc">{{ currentPost.desc }}</view>
      <!-- 帖子图片 -->
      <view v-if="currentPost.images && currentPost.images.length > 0" class="post-images">
        <image
          v-for="(image, index) in currentPost.images"
          :key="index"
          :src="image"
          mode="aspectFill"
          class="post-image"
          :class="{ 'single-image': currentPost.images.length === 1, 'multi-image': currentPost.images.length > 1 }"
        />
      </view>
      <!-- 帖子类型标签 -->
      <view class="post-tag">#{{ currentPost.type }}</view>
      <!-- 帖子底部操作区 -->
      <view class="post-actions-detail">
        <view class="action-item" @click="handleLike">
          <text :class="['icon', 'like-icon', isLikedState ? 'liked' : '']">❤️</text>
          <text class="count">{{ currentLikeCount }}</text>
        </view>
        <view class="action-item" @click="handleComment">
          <text class="icon comment-icon">💬</text>
          <!-- <text class="count">{{ currentPost.comment }}</text> -->
          <text class="count">{{comments.length }}</text>
        </view>
        <view class="action-item" @click="handleShare">
          <text class="icon share-icon">🔗</text>
          <text class="count">分享</text>
        </view>
      </view>
    </view>
    <view v-else class="loading-text">加载中...</view>

    <!-- 评论区 -->
    <view class="comment-section">
      <view class="comment-input-area">
        <!-- 用当前用户头像 -->
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
import { ref, onMounted } from 'vue'
import { fetchPostDetail } from '@/api/community.js'

// 当前用户信息（关键代码）
const userInfo = ref({
  avatar: '/static/avatar.png',
  nickname: '当前用户'
})

// 当前帖子详情
const postId = ref(null)
const currentPost = ref(null)

// 评论内容与列表
const commentContent = ref('')
const comments = ref([])

// 点赞状态与数量
const isLikedState = ref(false)
const currentLikeCount = ref(0)

onMounted(() => {
  // 读取当前登录用户头像和昵称（关键代码）
  const localUser = uni.getStorageSync('user')
  if (localUser) {
    if (localUser.avatar) userInfo.value.avatar = localUser.avatar
    if (localUser.nickname) userInfo.value.nickname = localUser.nickname
  }

  // 获取url参数
  const pages = getCurrentPages()
  const options = pages[pages.length - 1].options
  postId.value = options.id

  fetchPostDetail(postId.value).then(res => {
    // 1. 取 rows[0]，而不是直接用 data
    const data = res && res.rows && res.rows.length > 0 ? res.rows[0] : null
    if (!data) {
      uni.showToast({ title: '帖子不存在', icon: 'none' })
      currentPost.value = null
      return
    }
    currentPost.value = {
      id: data.id,
      avatar: data.avatar || '/static/avatar.png',
      username: data.nickname || '匿名用户',
      time: data.createTime ? data.createTime.slice(0, 10) : '',
      title: data.title,
      desc: data.content,
      type: data.typeName,
      comment: data.commentCount || 0,
      images: data.imgUrl ? [data.imgUrl] : []
    }
    isLikedState.value = false
    currentLikeCount.value = data.likeCount || 0
  }).catch(error => {
    uni.showToast({ title: '加载帖子失败', icon: 'none' })
    currentPost.value = null
  })

  // 你可以对接真实评论接口，这里留空
  comments.value = [
    // { id: 1, avatar: '/static/avatar.png', username: '评论用户1', time: '1天前', text: '评论内容', likes: 0 }
  ]
})

const handleLike = () => {
  if (isLikedState.value) {
    currentLikeCount.value--
  } else {
    currentLikeCount.value++
  }
  isLikedState.value = !isLikedState.value
  uni.showToast({ title: isLikedState.value ? '点赞成功' : '取消点赞', icon: 'none' })
}

const handleComment = () => {
  uni.pageScrollTo({
    selector: '.comment-input-area',
    duration: 300
  })
}

const handleShare = () => {
  uni.showToast({ title: '分享功能待完善', icon: 'none' })
}

// 发布评论时，使用当前用户头像和昵称（关键代码）
const publishComment = () => {
  if (commentContent.value.trim()) {
    const newComment = {
      id: Date.now(),
      avatar: userInfo.value.avatar,
      username: userInfo.value.nickname || '当前用户',
      time: '刚刚',
      text: commentContent.value.trim(),
      likes: 0
    }
    comments.value.unshift(newComment)
    commentContent.value = ''
    uni.showToast({ title: '评论成功', icon: 'success' })
  } else {
    uni.showToast({ title: '评论内容不能为空', icon: 'none' })
  }
}

const handleCommentLike = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.likes++
    uni.showToast({ title: '点赞评论成功', icon: 'none' })
  }
}

const handleReply = (commentId) => {
  uni.showToast({ title: `回复评论${commentId}功能待完善`, icon: 'none' })
}
</script>
  
  <style scoped>
  .container {
      min-height: 100vh;
      background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
      padding-bottom: 50rpx;
      padding-top: 10rpx;
      box-sizing: border-box;
      color: #222;
  }
  
  /* 头部导航 */
  .header {
      display: flex;
      align-items: center;
      padding: 30rpx 20rpx;
      background-color: #fff;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 100;
  }
  
  .back-icon {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      cursor: pointer;
  }
  
  /* 帖子详情卡片 */
  .post-detail-card {
      background: #fff;
      border-radius: 32rpx;
      margin: 20rpx 18rpx;
      padding: 30rpx 28rpx;
      box-shadow: 0 6rpx 30rpx rgba(120, 160, 120, 0.07);
      display: flex;
      flex-direction: column;
      position: relative;
  }
  
  .post-header {
      display: flex;
      align-items: center;
      margin-bottom: 15rpx;
  }
  
  .avatar {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      background: #e6e6e6;
  }
  
  .user-info {
      display: flex;
      flex-direction: column;
  }
  
  .username {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
  }
  
  .time {
      font-size: 24rpx;
      color: #888;
      margin-top: 6rpx;
  }
  
  .post-title {
      font-weight: 700;
      font-size: 38rpx;
      margin: 10rpx 0 15rpx 0;
      color: #222;
      line-height: 1.4;
  }
  
  .post-desc {
      color: #555;
      font-size: 28rpx;
      margin-bottom: 20rpx;
      line-height: 1.8;
  }
  
  /* 帖子图片 */
  .post-images {
      display: flex;
      flex-wrap: wrap;
      gap: 10rpx;
      margin-bottom: 20rpx;
  }
  
  .post-image {
      border-radius: 16rpx;
      background-color: #f0f0f0;
  }
  
  .single-image {
      width: 100%;
      height: 400rpx;
  }
  
  .multi-image {
      width: calc(50% - 5rpx);
      height: 250rpx;
  }
  
  /* 帖子类型标签 */
  .post-tag {
      display: inline-block;
      background-color: #ffe0b2;
      color: #ff8247;
      padding: 8rpx 20rpx;
      border-radius: 20rpx;
      font-size: 24rpx;
      font-weight: bold;
      margin-top: 10rpx;
      margin-bottom: 20rpx;
      width: fit-content;
  }
  
  /* 帖子底部操作区 */
  .post-actions-detail {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20rpx 0;
      border-top: 1rpx solid #eee;
      margin-top: 20rpx;
  }
  
  .post-actions-detail .action-item {
      display: flex;
      align-items: center;
      color: #888;
      font-size: 28rpx;
      cursor: pointer;
  }
  
  .post-actions-detail .icon {
      font-size: 36rpx;
      margin-right: 10rpx;
  }
  
  .post-actions-detail .like-icon.liked {
      color: #ff0000;
  }
  
  /* 评论区 */
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
  
  .comment-btn::after {
      border: none;
  }
  
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
  
  .loading-text {
      text-align: center;
      padding: 50rpx;
      color: #888;
      font-size: 30rpx;
  }
  </style>
  