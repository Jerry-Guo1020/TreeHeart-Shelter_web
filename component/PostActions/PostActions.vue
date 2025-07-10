<template>
  <view class="container">
    <!-- 顶部介绍卡片 -->
    <view class="info-card-wrap">
      <view class="info_card">
        <view class="info_title">
          <text>心灵社区</text>
        </view>
        <view class="info_content">
          <text>🌱 分享你的心灵故事，与他人交流，共同成长。</text>
        </view>
        <view class="gradient-bar"></view>
      </view>
    </view>

    <!-- 顶部导航栏 横滑 -->
    <scroll-view class="tabbar-scroll" scroll-x :show-scrollbar="false">
      <view class="tabbar">
        <view
          v-for="(tab, idx) in tabs"
          :key="tab"
          :class="['tab-btn', currentTab === idx ? 'active' : '']"
          @click="switchTab(idx)"
        >{{ tab }}</view>
      </view>
    </scroll-view>

    <!-- 动态内容区 -->
    <scroll-view scroll-y class="content-list">
      <view
        v-for="(item, idx) in filteredPosts"
        :key="item.id || idx"
        class="post-card"
        @click="navigateToPostDetail(item.id)"
      >
        <view class="post-header">
          <image :src="item.avatar" class="avatar" />
          <view class="user-info">
            <view class="nickname-row">
              <text class="username">{{ item.nickname }}</text>
              <view class="post-type-tag">{{ item.type }}</view>
            </view>
            <text class="time">{{ item.time }}</text>
          </view>
        </view>
        <view class="post-title" :title="item.title">{{ item.title }}</view>
        <view class="post-desc">{{ item.desc }}</view>
        <PostActions
          :post-id="item.id"
          :like-count="item.like"
          :comment-count="item.comment"
          :collect-count="item.collect"
          :is-liked="item.isLiked"
          @like.stop="handlePostLike"
          @comment.stop="handlePostComment"
          @collect.stop="handlePostCollect"
        />
      </view>
      <view v-if="filteredPosts.length === 0" class="empty-tip">
        <image src="/static/empty.svg" class="empty-img" />
        <text>暂时没有相关内容，快来发帖吧~</text>
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
import { ref, computed, onMounted } from 'vue'
import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'
import PostActions from '@/component/PostActions/PostActions.vue'
import { fetchPostList } from '@/api/community.js'

const tabs = [
  '全部', '学业压力', '情绪情感', '人际交往', '职业规划', '生活适应', '其他类型'
]
const currentTab = ref(0)
const posts = ref([])

function switchTab(idx) {
  currentTab.value = idx
}

function onPublish() {
  uni.navigateTo({
    url: '/pages/community/publish'
  });
}
function navigateToPostDetail(postId) {
  uni.navigateTo({
    url: `/pages/community/postDetail?id=${postId}`
  });
}
function handlePostLike(postId, isLiked) {
  // TODO: 点赞逻辑
}
function handlePostComment(postId) {
  uni.navigateTo({
    url: `/pages/community/postDetail?id=${postId}`
  });
}
function handlePostCollect(postId) {
  // TODO: 收藏逻辑
}

// 类型名称与 typeId 对应
const typeMap = {
  1: '学业压力',
  2: '情绪情感',
  3: '人际交往',
  4: '职业规划',
  5: '生活适应',
  6: '其他类型'
};

const filteredPosts = computed(() => {
  if (currentTab.value === 0) {
    return posts.value;
  } else {
    const selectName = tabs[currentTab.value];
    // 只对比 type 字段
    return posts.value.filter(post => post.type === selectName);
  }
});

onMounted(async () => {
  try {
    // 默认查全部
    const res = await fetchPostList({ limit: 20, offset: 0 });
    // 兼容 rows/data 结构
    const dataArr = Array.isArray(res.rows) ? res.rows : (Array.isArray(res.data) ? res.data : []);
    posts.value = dataArr.map(item => ({
      id: item.id || '', // 必须有id
      avatar: item.avatar || '/static/avatar.png',
      nickname: item.nickname || '匿名用户',
      time: (item.createTime?.split('T')[0]) || '',
      title: item.title || '',
      desc: item.content || '',
      type: item.typeName || '',   // 后台SQL记得AS typeName
      like: Number(item.likeCount) || 0,
      comment: Number(item.commentCount) || 0,
      collect: Number(item.collectCount) || 0,
      isLiked: false,
      images: item.imgUrl ? [item.imgUrl] : []
    }));
  } catch (e) {
    uni.showToast({ title: typeof e === 'string' ? e : (e?.message || '加载失败'), icon: 'none' })
  }
});
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