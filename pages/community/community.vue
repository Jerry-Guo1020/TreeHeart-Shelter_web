<template>
  <view class="container">

    <!-- 顶部介绍卡片 -->
		<view class="info_card">
			<view class="info_title">心灵社区</view>
			<view class="info_content">
				<text>分享你的心灵故事，与他人交流，共同成长。</text>
			</view>
		</view>


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
      <!-- 遍历 filteredPosts 而不是 posts -->
      <view v-for="(item) in filteredPosts" :key="item.id" class="post-card" @click="navigateToPostDetail(item.id)">
        <view class="post-header">
          <image :src="item.avatar" class="avatar" />
          <view class="user-info">
            <text class="username">{{ item.username }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
        </view>
        <view class="post-title">{{ item.title }}</view>
        <view class="post-desc">{{ item.desc }}</view>
        <!-- 新增：显示帖子类型 -->
        <view class="post-type-tag">{{ item.type }}</view>
        <!-- 使用 PostActions 组件，并阻止事件冒泡 -->
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
    </scroll-view>

    <!-- 右下角悬浮按钮 -->
    <view class="fab" @click="onPublish">
      <text class="fab-icon">✏️</text>
    </view>
  </view>
  <BottomNavbar :current="0" />
</template>

<script setup>
import { ref, computed } from 'vue' // 导入 computed
import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'
import PostActions from '@/component/PostActions/PostActions.vue' // 引入新的组件

const tabs = [
  '全部','学业压力', '情绪情感', '人际交往', '职业规划', '生活适应', '其他类型'
]
const currentTab = ref(0)

const posts = ref([
  {
    id: 1, // 添加唯一ID
    avatar: '/static/avatar.png',
    username: '星光不问少年',
    time: '1小时前',
    title: '铁饭碗3k，新公司4k，选择哪个好？',
    desc: '首先可以把3K和4K两家公司进行对比，工作时间、岗位内容、发展空间等都要考虑，不能只看工资。',
    like: '19.9万',
    comment: 101,
    collect: 1,
    isLiked: false, // 添加点赞状态
    type: '学业压力', // 新增类型字段
    images: ['/static/post_image_1.png', '/static/post_image_2.png'], // 新增图片字段
  },
  {
    id: 2,
    avatar: '/static/avatar.png',
    username: '南风知我意',
    time: '3小时前',
    title: '大家有没有情绪低落的时候？',
    desc: '最近压力好大，情绪一直上不来，有没有好的排解方式呀？',
    like: 8,
    comment: 12,
    collect: 0,
    isLiked: false,
    type: '情绪情感', // 新增类型字段
    images: ['/static/post_image_3.png'], // 新增图片字段
  },
  {
    id: 3,
    avatar: '/static/avatar.png',
    username: '小王同学',
    time: '昨天',
    title: '如何快速适应大学生活？',
    desc: '刚进大学觉得很迷茫，求学长学姐们支招！',
    like: 22,
    comment: 9,
    collect: 5,
    isLiked: false,
    type: '生活适应', // 新增类型字段
    images: [], // 没有图片
  },
  {
    id: 4,
    avatar: '/static/avatar.png',
    username: '职场小白',
    time: '2天前',
    title: '职业发展迷茫，求前辈指点',
    desc: '刚毕业，对未来职业发展感到迷茫，不知道如何选择方向。',
    like: 15,
    comment: 5,
    collect: 2,
    isLiked: false,
    type: '职业规划', // 新增类型字段
    images: [],
  },
  {
    id: 5,
    avatar: '/static/avatar.png',
    username: '社交达人',
    time: '1天前',
    title: '如何扩大社交圈？',
    desc: '想认识更多有趣的朋友，有什么好的方法吗？',
    like: 30,
    comment: 20,
    collect: 3,
    isLiked: false,
    type: '人际交往', // 新增类型字段
    images: [],
  },
])

// 计算属性：根据当前选中的tab过滤帖子
const filteredPosts = computed(() => {
  if (currentTab.value === 0) {
    return posts.value; // "全部" tab，显示所有帖子
  } else {
    const selectedType = tabs[currentTab.value];
    return posts.value.filter(post => post.type === selectedType);
  }
});

function switchTab(idx) {
  currentTab.value = idx
}

function onPublish() {
  uni.showToast({
    title: '发帖功能开发中',
    icon: 'none'
  })
}

// 点击卡片跳转到帖子详情页
const navigateToPostDetail = (postId) => {
  uni.navigateTo({
    url: `/pages/community/postDetail?id=${postId}`
  });
};

// 处理点赞事件
const handlePostLike = (postId, isLiked) => {
  const post = posts.value.find(p => p.id === postId);
  if (post) {
    // 这里可以调用后端API来更新点赞状态和数量
    // 示例：await api.updateLikeStatus(postId, isLiked);
    // 成功后更新本地数据
    post.isLiked = isLiked;
    // PostActions组件内部已经更新了likeCount，这里不需要再次更新
    // 如果后端返回了新的likeCount，可以在这里同步
  }
};

// 处理评论事件，跳转到帖子详情页
const handlePostComment = (postId) => {
  uni.navigateTo({
    url: `/pages/community/postDetail?id=${postId}`
  });
};

// 处理收藏事件
const handlePostCollect = (postId) => {
  // 这里可以调用后端API来更新收藏状态
  console.log(`收藏帖子ID: ${postId}`);
};
</script>

<style scoped>
.container {
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  position: relative;
  box-sizing: border-box;
  color: #222;
  padding-bottom: calc(72px + env(safe-area-inset-bottom, 24px));
  
}

/* 顶部tabbar横向滑动（完全不溢出！） */
.tabbar-scroll {
  width: 100vw;
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
  gap: 14rpx;
  padding: 0 18rpx 20rpx 18rpx;     /* 增加底部内边距，确保按钮底部完整显示 */
  margin-top: 18rpx;
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
  padding: 20rpx 0 30rpx 0; /* 增加顶部内边距，从 8rpx 改为 20rpx */
  min-height: 80vh;
  /* 修复内容卡片可能撑出溢出的问题 */
  width: 100vw;
  overflow-x: hidden;
}

.info_card {
  background: #fff;
  border-radius: 32rpx;
  margin: 20rpx 18rpx 0 18rpx;
  padding: 26rpx 20rpx 16rpx 20rpx;
  box-shadow: 0 3rpx 20rpx rgba(200,200,200,0.09);
  display: flex;
  flex-direction: column;
  /* 修复可能溢出 */
  max-width: calc(100vw - 36rpx);
  overflow-x: hidden;
}

.info_title {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 8rpx;
  text-align: center;
}

.info_content {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 14rpx;
  text-align: center;
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
  position: relative; /* 为类型标签定位提供上下文 */
}

/* 新增：帖子类型标签样式 */
.post-type-tag {
  position: absolute;
  top: 26rpx; /* 调整位置 */
  right: 20rpx; /* 调整位置 */
  background-color: #ffe0b2; /* 浅橙色背景 */
  color: #ff8247; /* 橙色文字 */
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  font-weight: bold;
  z-index: 1; /* 确保在其他内容之上 */
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
