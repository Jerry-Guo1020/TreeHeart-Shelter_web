<template>
  <view class="container">
    <view class="header">
      <image class="back" src="/static/icon-back.png" alt="返回"></image>
      <view class="category-tag">#学业压力</view>
    </view>
    <view class="post-list">
      <view class="post" v-for="(item, idx) in posts" :key="idx">
        <view class="post-header">
          <image class="avatar" src="/static/avatar-main.png" alt="头像"></image>
          <view>
            <view class="post-title">大学生心灵树洞</view>
            <view class="post-time">2025年05月19日 17:46:50</view>
          </view>
        </view>
        <view class="post-tags">
          <view class="post-tag">#树洞倾诉</view>
          <view class="post-tag">六月心事，等你诉说</view>
        </view>
        <view class="post-content">
          六月的风，吹来了弹唱与玩笑，也吹进了每个人的心房。在这个充满活力与希望的月份，大学生心灵树洞向大家发起邀约啦！<br>
          无论是徘徊在分岔路口的小迷茫，或是一场想爆哭的雨后彩虹，一次和朋友的欢乐新聚；还是想和纸笔低语的心情故事……<br>
          都欢迎分享给我们！
        </view>
        <image class="post-img" src="/static/beach.png" alt="沙滩图片"></image>
        <view class="post-actions">
          <image src="/static/icon-comment.png" class="icon" alt="评论"></image>
          <image src="/static/icon-like.png" class="icon" alt="点赞"></image>
          <image src="/static/icon-fav.png" class="icon" alt="收藏"></image>
        </view>
        <view class="comment-list">
          <view class="comment" v-for="(c, i) in comments" :key="i">
            <image class="comment-avatar" :src="c.avatar" alt="头像"></image>
            <view class="comment-name">{{c.name}}</view>
            <view class="comment-content">{{c.content}}</view>
          </view>
        </view>
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
      posts: [1,2], // 示例数据
      comments: [
        { avatar: '/static/avatar1.png', name: '陈树洞', content: '考完试就一定更美好啦！！！' },
        { avatar: '/static/avatar2.png', name: '树小洞2025', content: '未来要干嘛啊？好焦虑……' }
      ]
    }
  }
}
</script>

<style scoped>
/* 结构同home.vue，略有不同，主要多了评论区和顶部返回 */
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  padding-bottom: 120rpx;
}
.header {
  display: flex;
  align-items: center;
  margin: 24rpx 0 24rpx 24rpx;
}
.back {
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
}
.category-tag {
  background: #FFA940;
  color: #fff;
  font-size: 28rpx;
  border-radius: 32rpx;
  padding: 8rpx 32rpx;
  font-weight: bold;
}
.post-list {
  padding: 0 24rpx;
}
.post {
  background: #fff;
  border-radius: 24rpx;
  margin-bottom: 32rpx;
  padding: 32rpx 24rpx;
  box-shadow: 0 8rpx 32rpx #f6e7d6;
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}
.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}
.post-title {
  font-size: 28rpx;
  font-weight: bold;
}
.post-time {
  font-size: 20rpx;
  color: #888;
}
.post-tags {
  display: flex;
  margin: 12rpx 0;
}
.post-tag {
  background: #FFF7E6;
  color: #FF9900;
  border-radius: 24rpx;
  padding: 4rpx 16rpx;
  font-size: 20rpx;
  margin-right: 12rpx;
}
.post-content {
  font-size: 26rpx;
  color: #333;
  margin: 12rpx 0;
  line-height: 1.6;
}
.post-img {
  width: 100%;
  height: 180rpx;
  border-radius: 16rpx;
  margin: 16rpx 0;
  object-fit: cover;
}
.post-actions {
  display: flex;
  align-items: center;
  margin: 8rpx 0;
}
.icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 24rpx;
}
.comment-list {
  margin-top: 16rpx;
}
.comment {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}
.comment-avatar {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  margin-right: 8rpx;
}
.comment-name {
  font-size: 22rpx;
  font-weight: bold;
  margin-right: 8rpx;
}
.comment-content {
  font-size: 22rpx;
  color: #666;
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