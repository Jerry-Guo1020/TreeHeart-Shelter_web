<template>
  <view class="container">
    <!-- 顶部介绍卡片 -->
    <view class="info-card-wrap">
      <view class="info_card">
        <view class="info_title"><text>心灵社区</text></view>
        <view class="info_content">
          <text>🌱 分享你的心灵故事，与他人交流，共同成长。</text>
        </view>
        <view class="gradient-bar"></view>
      </view>
    </view>
    <!-- Tab 栏 -->
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
    <!-- 内容区 -->
    <scroll-view scroll-y class="content-list">
      <view
        v-for="item in posts"
        :key="item.id"
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
      </view>
      <view v-if="posts.length === 0" class="empty-tip">
        <image src="/static/empty.svg" class="empty-img" />
        <text>暂时没有相关内容，快来发帖吧~</text>
      </view>
    </scroll-view>
    <view class="fab" @click="onPublish">
      <text class="fab-icon">✏️</text>
    </view>
    <BottomNavbar :current="0" />
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'
import { fetchPostList, fetchPostTypes } from '@/api/community.js'

// tab 名称与 typeId 绑定
const tabs = ref(['全部'])
const typeIds = ref([null]) // null为全部
const currentTab = ref(0)
const posts = ref([])

// 动态加载 type 名称和 id
onMounted(async () => {
  const res = await fetchPostTypes()
  if (Array.isArray(res.rows)) {
    // 保证和数据库 id 顺序一致
    tabs.value = ['全部', ...res.rows.map(x => x.name)]
    typeIds.value = [null, ...res.rows.map(x => x.id)]
  }
  loadPosts()
})

function getTypeId(tabIdx) {
  return typeIds.value[tabIdx]
}

async function loadPosts() {
  const typeId = getTypeId(currentTab.value)
  const params = { limit: 10, offset: 0 }
  if (typeId !== null) params.typeId = typeId
  const res = await fetchPostList(params)
  // 控制台打印 rows 验证
  console.log('接口返回:', res)
  const data = Array.isArray(res.rows) ? res.rows : []
  posts.value = data.map(item => ({
    ...item,
    avatar: item.avatar || '/static/avatar.png',
    nickname: item.nickname || '匿名用户',
    time: item.createTime ? (item.createTime + '').slice(0, 10) : '',
    title: item.title,
    desc: item.content,
    type: item.typeName,
  }))
}

function switchTab(idx) {
  if (currentTab.value !== idx) {
    currentTab.value = idx
    loadPosts()
  }
}
function onPublish() {
  uni.navigateTo({ url: '/pages/community/publish' })
}
function navigateToPostDetail(postId) {
  uni.navigateTo({ url: `/pages/community/postDetail?id=${postId}` })
}
watch(currentTab, () => loadPosts())
</script>
<style scoped>
/* 你的CSS原样保留，略 */
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffe3bb 0%, #fff7ec 100%);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'PingFang SC', 'HarmonyOS Sans', 'Helvetica Neue', Arial, sans-serif;
  padding-bottom: calc(127px + env(safe-area-inset-bottom, 35px));
}
.info-card-wrap {
  width: 100vw;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #ffe3bb 70%, transparent 100%);
  padding-top: 0;
  margin-top: 0;
}
.info_card {
  background: #fff;
  border-radius: 32rpx;
  margin: 18rpx 0 10rpx 0;
  padding: 38rpx 38rpx 26rpx 38rpx;
  width: 87vw;
  max-width: 720rpx;
  min-width: 340rpx;
  box-shadow: 0 6rpx 24rpx rgba(255,170,80,0.09), 0 1rpx 0 rgba(255,184,106,0.12);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.info_title {
  font-size: 38rpx;
  font-weight: 800;
  color: #ff9f43;
  margin-bottom: 7rpx;
  text-align: left;
  letter-spacing: 1rpx;
}
.info_content {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 12rpx;
  line-height: 1.7;
  text-align: left;
  word-break: break-all;
  letter-spacing: .5rpx;
}
.gradient-bar {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 10rpx;
  background: linear-gradient(90deg,#ffb570 15%,#ff8247 70%);
  border-radius: 0 0 20rpx 20rpx;
  opacity: .17;
  pointer-events: none;
}
.tabbar-scroll {
  width: 100vw;
  position: sticky;
  top: 0;
  z-index: 11;
  background: transparent;
  margin-bottom: 3rpx;
}
.tabbar {
  display: flex;
  flex-direction: row;
  gap: 16rpx;
  padding: 0 18rpx 18rpx 18rpx;
  margin-top: 10px;
}
.tab-btn {
  flex: 0 0 auto;
  padding: 15rpx 38rpx;
  font-size: 28rpx;
  border-radius: 999rpx;
  background: #faf4eb;
  color: #aa7a4a;
  font-weight: 500;
  margin-top: 0rpx;
  margin-bottom: 5rpx;
  border: 2rpx solid transparent;
  transition: all .2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 1rpx 8rpx rgba(255,193,140,0.07);
}
.tab-btn.active {
  background: linear-gradient(90deg, #ffbe76 10%, #ff8247 100%);
  color: #fff;
  font-weight: 800;
  border-color: #ffb570;
  box-shadow: 0 2rpx 18rpx rgba(255,130,71,0.13);
  transform: scale(1.07);
}
.content-list {
  min-height: 68vh;
  width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.empty-tip {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 48vh;
  color: #c7a977;
  font-size: 28rpx;
  opacity: .86;
  letter-spacing: 1rpx;
  text-align: center;
}
.empty-img {
  width: 170rpx;
  height: 170rpx;
  margin-bottom: 22rpx;
  filter: grayscale(.12);
}
.post-card {
  background: #fff;
  border-radius: 24rpx;
  margin: 18rpx auto 0 auto;
  padding: 28rpx 28rpx 18rpx 28rpx;
  width: 87vw;
  max-width: 710rpx;
  box-shadow: 0 4rpx 18rpx rgba(255,165,81,0.09), 0 1rpx 0 rgba(255,184,106,0.10);
  display: flex;
  flex-direction: column;
  transition: box-shadow .14s;
  position: relative;
  overflow-x: hidden;
}
.post-card:active {
  box-shadow: 0 8rpx 22rpx rgba(255,130,71,0.14);
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 7rpx;
}
.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 17rpx;
  background: linear-gradient(135deg, #ffe8c2 30%, #fffbe9 100%);
  box-shadow: 0 2rpx 9rpx rgba(255,204,123,.08);
  border: 2rpx solid #ffe7c3;
}
.user-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}
.nickname-row {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
.username {
  font-size: 28rpx;
  color: #f4962b;
  font-weight: 700;
  width: 5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  font-size: 20rpx;
  color: #b9a481;
  margin-top: 3rpx;
}
.post-type-tag {
  position: absolute;
  right: 26rpx;
  top: 24rpx;
  background: linear-gradient(90deg, #ffe0b2 10%, #ffd39a 90%);
  color: #ff8247;
  padding: 4rpx 15rpx;
  border-radius: 16rpx;
  font-size: 21rpx;
  font-weight: bold;
  box-shadow: 0 1rpx 8rpx rgba(255,186,115,0.10);
  border: 2rpx solid #ffe5be;
  z-index: 2;
}
.post-title {
  font-weight: 800;
  font-size: 30rpx;
  margin: 13rpx 0 6rpx 0;
  color: #222;
  line-height: 1.33;
  letter-spacing: .3rpx;
  word-break: break-all;
  max-width: 95%;
}
.post-desc {
  color: #57534e;
  font-size: 25rpx;
  margin-bottom: 15rpx;
  line-height: 1.72;
  letter-spacing: .2rpx;
  word-break: break-all;
  opacity: .96;
}
.fab {
  position: fixed;
  right: 44rpx;
  bottom: 268rpx;
  width: 102rpx;
  height: 102rpx;
  border-radius: 50%;
  background: radial-gradient(circle at 65% 28%, #ffb570 60%, #ff8247 100%);
  box-shadow: 0 8rpx 28rpx rgba(255,130,71,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
  transition: box-shadow .18s, transform .13s;
  animation: fabGlow 2.5s infinite alternate cubic-bezier(.85,0,.13,1);
}
.fab:active {
  box-shadow: 0 5rpx 17rpx rgba(255,130,71,0.27);
  transform: scale(.97);
}
.fab-icon {
  font-size: 58rpx;
  color: #fff;
  filter: drop-shadow(0 2rpx 12rpx #ffb57077);
}
@keyframes fabGlow {
  0% { box-shadow: 0 8rpx 32rpx #ffd19455; }
  100% { box-shadow: 0 16rpx 38rpx #ff824799; }
}
</style>
