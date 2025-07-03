<template>
  <view class="post-actions">
    <view class="action-item" @click="handleLike">
      <text :class="['icon', 'like-icon', isLikedState ? 'liked' : '']">❤️</text>
      <text class="count">{{ currentLikeCount }}</text>
    </view>
    <view class="action-item" @click="handleComment">
      <text class="icon comment-icon">💬</text>
      <text class="count">{{ commentCount }}</text>
    </view>
    <view class="action-item" @click="handleCollect">
      <text class="icon collect-icon">⭐</text>
      <text class="count">{{ collectCount }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true,
  },
  likeCount: {
    type: [String, Number],
    default: 0,
  },
  commentCount: {
    type: [String, Number],
    default: 0,
  },
  collectCount: {
    type: [String, Number],
    default: 0,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['like', 'comment', 'collect']);

// 内部状态，用于管理点赞数和点赞状态
const currentLikeCount = ref(props.likeCount);
const isLikedState = ref(props.isLiked);

// 监听 props 变化，同步内部状态
watch(() => props.likeCount, (newVal) => {
  currentLikeCount.value = newVal;
});
watch(() => props.isLiked, (newVal) => {
  isLikedState.value = newVal;
});

const handleLike = () => {
  // 模拟点赞/取消点赞逻辑
  if (isLikedState.value) {
    // 假设 '万' 是字符串，需要特殊处理
    currentLikeCount.value = (typeof currentLikeCount.value === 'string' && currentLikeCount.value.endsWith('万'))
      ? (parseFloat(currentLikeCount.value) - 0.1).toFixed(1) + '万' // 简单处理万
      : parseInt(currentLikeCount.value) - 1;
  } else {
    currentLikeCount.value = (typeof currentLikeCount.value === 'string' && currentLikeCount.value.endsWith('万'))
      ? (parseFloat(currentLikeCount.value) + 0.1).toFixed(1) + '万'
      : parseInt(currentLikeCount.value) + 1;
  }
  isLikedState.value = !isLikedState.value;

  // 触发父组件的事件，传递帖子ID和新的点赞状态
  emit('like', props.postId, isLikedState.value);

  uni.showToast({
    title: isLikedState.value ? '点赞成功' : '取消点赞',
    icon: 'none',
    duration: 1000
  });
};

const handleComment = () => {
  emit('comment', props.postId); // 触发评论事件，由父组件处理跳转
};

const handleCollect = () => {
  emit('collect', props.postId);
  uni.showToast({
    title: '收藏功能待完善',
    icon: 'none',
    duration: 1000
  });
};
</script>

<style scoped>
.post-actions {
  display: flex;
  gap: 36rpx;
  color: #aaa;
  font-size: 22rpx;
  margin-top: 6rpx;
}

.action-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon {
  font-size: 28rpx; /* 调整图标大小 */
  margin-right: 8rpx;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
}

/* 点赞图标的默认和激活状态 */
.like-icon {
  color: #aaa; /* 默认灰色 */
}
.like-icon.liked {
  color: #ff0000; /* 点赞后的红色 */
  transform: scale(1.2); /* 点赞后的放大效果 */
}

/* 评论图标 */
.comment-icon {
  color: #aaa;
}

/* 收藏图标 */
.collect-icon {
  color: #aaa;
}

.count {
  font-size: 22rpx;
}
</style>