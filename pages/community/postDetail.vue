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
                <image v-for="(image, index) in currentPost.images" :key="index" :src="image" mode="aspectFill"
                    class="post-image"
                    :class="{ 'single-image': currentPost.images.length === 1, 'multi-image': currentPost.images.length > 1 }" />
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
                    <text class="count">{{ currentPost.comment }}</text>
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
                <image src="/static/avatar.png" class="comment-avatar" />
                <textarea v-model="commentContent" placeholder="在这里写下你的想法..." class="comment-textarea" auto-height />
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
import { ref, onMounted, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const postId = ref(null);
const currentPost = ref(null);
const commentContent = ref('');
const comments = ref([]);

// 模拟帖子数据 (与 community.vue 中的数据保持一致，这里仅为演示)
const mockPosts = [
    {
        id: 1,
        avatar: '/static/avatar.png',
        username: '星光不问少年',
        time: '1小时前',
        title: '铁饭碗3k，新公司4k，选择哪个好？',
        desc: '首先可以把3K和4K两家公司进行对比，工作时间、岗位内容、发展空间等都要考虑，不能只看工资。工作时间、岗位内容、发展空间等都要考虑，不能只看工资。工作时间、岗位内容、发展空间等都要考虑，不能只看工资。',
        like: '19.9万',
        comment: 101,
        collect: 1,
        isLiked: false,
        type: '学业压力',
        images: ['/static/post_image_1.png', '/static/post_image_2.png'],
    },
    {
        id: 2,
        avatar: '/static/avatar.png',
        username: '南风知我意',
        time: '3小时前',
        title: '大家有没有情绪低落的时候？',
        desc: '最近压力好大，情绪一直上不来，有没有好的排解方式呀？最近压力好大，情绪一直上不来，有没有好的排解方式呀？最近压力好大，情绪一直上不来，有没有好的排解方式呀？',
        like: 8,
        comment: 12,
        collect: 0,
        isLiked: false,
        type: '情绪情感',
        images: ['/static/post_image_3.png'],
    },
    {
        id: 3,
        avatar: '/static/avatar.png',
        username: '小王同学',
        time: '昨天',
        title: '如何快速适应大学生活？',
        desc: '刚进大学觉得很迷茫，求学长学姐们支招！刚进大学觉得很迷茫，求学长学姐们支招！刚进大学觉得很迷茫，求学长学姐们支招！',
        like: 22,
        comment: 9,
        collect: 5,
        isLiked: false,
        type: '生活适应',
        images: [],
    },
];

// 模拟评论数据
const mockComments = [
    {
        id: 1,
        postId: 1,
        avatar: '/static/avatar.png',
        username: 'Dr. Christopher Denesik',
        time: '3天前',
        text: 'Molestias contra conscendo earum cito derelinquo collum contigo aqua dolorem. Tot spectaculum coniecto conturbo creber.',
        likes: 7,
    },
    {
        id: 2,
        postId: 1,
        avatar: '/static/avatar.png',
        username: 'Gwen Hackett',
        time: '7天前',
        text: 'Bis deripio id ocer comburo est usus. Tabella denuncio ceno. Aureus thorax accommodo vehemens strues nihil velum adicio eos voluptate.',
        likes: 0,
    },
    {
        id: 3,
        postId: 1,
        avatar: '/static/avatar.png',
        username: 'Malcolm Williamson',
        time: '3天前',
        text: 'Depulso sperno tolero animi socius thermae circumvenio utroque compono eaque. Accommodo voluptatem vobis deleniti.',
        likes: 5,
    },
    {
        id: 4,
        postId: 2,
        avatar: '/static/avatar.png',
        username: '评论者A',
        time: '1天前',
        text: '这个帖子很有帮助！',
        likes: 2,
    },
];

// 帖子点赞状态和数量的内部管理
const isLikedState = ref(false);
const currentLikeCount = ref(0);

onLoad((options) => {
    if (options.id) {
        postId.value = parseInt(options.id);
        fetchPostDetail(postId.value);
        fetchComments(postId.value);
    }
});

// 模拟获取帖子详情
const fetchPostDetail = (id) => {
    const post = mockPosts.find(p => p.id === id);
    if (post) {
        currentPost.value = post;
        isLikedState.value = post.isLiked;
        currentLikeCount.value = post.like;
    } else {
        console.error('Post not found:', id);
    }
};

// 模拟获取评论
const fetchComments = (id) => {
    comments.value = mockComments.filter(c => c.postId === id);
};

const goBack = () => {
    uni.navigateBack();
};

const handleLike = () => {
    // 模拟点赞/取消点赞逻辑
    if (isLikedState.value) {
        currentLikeCount.value = (typeof currentLikeCount.value === 'string' && currentLikeCount.value.endsWith('万'))
            ? (parseFloat(currentLikeCount.value) - 0.1).toFixed(1) + '万'
            : parseInt(currentLikeCount.value) - 1;
    } else {
        currentLikeCount.value = (typeof currentLikeCount.value === 'string' && currentLikeCount.value.endsWith('万'))
            ? (parseFloat(currentLikeCount.value) + 0.1).toFixed(1) + '万'
            : parseInt(currentLikeCount.value) + 1;
    }
    isLikedState.value = !isLikedState.value;

    uni.showToast({
        title: isLikedState.value ? '点赞成功' : '取消点赞',
        icon: 'none',
        duration: 1000
    });
};

const handleComment = () => {
    // 滚动到评论区
    uni.pageScrollTo({
        selector: '.comment-input-area',
        duration: 300
    });
};

const handleShare = () => {
    uni.showToast({
        title: '分享功能待完善',
        icon: 'none',
        duration: 1000
    });
};

const publishComment = () => {
    if (commentContent.value.trim()) {
        const newComment = {
            id: comments.value.length + 1, // 简单生成ID
            postId: postId.value,
            avatar: '/static/avatar.png', // 假设当前用户头像
            username: '当前用户', // 假设当前用户昵称
            time: '刚刚',
            text: commentContent.value.trim(),
            likes: 0,
        };
        comments.value.unshift(newComment); // 添加到评论列表顶部
        commentContent.value = ''; // 清空输入框
        uni.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 1000
        });
    } else {
        uni.showToast({
            title: '评论内容不能为空',
            icon: 'none',
            duration: 1000
        });
    }
};

const handleCommentLike = (commentId) => {
    const comment = comments.value.find(c => c.id === commentId);
    if (comment) {
        comment.likes++; // 模拟点赞
        uni.showToast({
            title: '点赞评论成功',
            icon: 'none',
            duration: 500
        });
    }
};

const handleReply = (commentId) => {
    uni.showToast({
        title: `回复评论 ${commentId} 功能待完善`,
        icon: 'none',
        duration: 1000
    });
};
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
    /* 头部背景色 */
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
    /* 单张图片高度 */
}

.multi-image {
    width: calc(50% - 5rpx);
    /* 两张图片并排 */
    height: 250rpx;
    /* 多张图片高度 */
}

/* 帖子类型标签 */
.post-tag {
    display: inline-block;
    background-color: #ffe0b2;
    /* 浅橙色背景 */
    color: #ff8247;
    /* 橙色文字 */
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
    /* 确保按钮文字垂直居中 */
    height: auto;
    /* 适应内容高度 */
}

.comment-btn::after {
    border: none;
    /* 移除uni-app按钮默认边框 */
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