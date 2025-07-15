<template>
  <view class="bottom-nav">
    <view class="nav-btn" @click="switchTab(0)">
      <image :src="iconHome" class="nav-icon" />
      <text>首页</text>
    </view>
    <view class="nav-btn" @click="switchTab(1)">
      <image :src="iconOrder" class="nav-icon" />
      <text>动态</text>
    </view>
    <view class="nav-center-btn" @click="switchTab(4)">
      <image src="http://43.142.21.211:3000/static/logo.png" class="center-icon" />
    </view>
    <view class="nav-btn" @click="switchTab(2)">
      <image :src="iconTest" class="nav-icon" />
      <text>心理测评</text>
    </view>
    <view class="nav-btn" @click="switchTab(3)">
      <image :src="iconUser" class="nav-icon" />
      <text>我的</text>
    </view>
  </view>
</template>

<script setup>
// 图标资源
const iconHome = 'http://43.142.21.211:3000/static/home_1.png'
const iconOrder = 'http://43.142.21.211:3000/static/home_2.png'
const iconTest = 'http://43.142.21.211:3000/static/home_3.png'
const iconUser = 'http://43.142.21.211:3000/static/home_4.png'

function switchTab(idx) {
  if (idx === 0) {
    uni.reLaunch({ url: '/pages/home/home' })
  } else if (idx === 1) {
    uni.redirectTo({ url: '/pages/community/community' })
  } else if (idx === 2) {
    uni.redirectTo({ url: '/pages/test/test' })
  } else if (idx === 3) {
    uni.redirectTo({ url: '/pages/personal/personal' })
  } else if (idx === 4) {
    uni.navigateTo({ url: '/pages/activity/activity' })
  }
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 72px;
  background: #ffd0a9;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  z-index: 999;
  box-shadow: 0 -2px 24px rgba(255,146,0,0.06);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* 新增底部安全区 */
  padding-bottom: env(safe-area-inset-bottom, 22px); /* 优先支持 iPhone X等机型的底部安全区，默认22px */
}


/* 统一icon和字体色调，不用深棕色块 */
.nav-btn {
  flex: 1;
  text-align: center;
  color: #755f44;         /* 柔和棕色，不重 */
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.95;
}
.nav-btn:active text,
.nav-btn:focus text {
  color: #FF9200 !important;
}
.nav-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 2px;
  filter: drop-shadow(0 1px 2px #FFD9A0);
}

.nav-center-btn {
  position: relative;
  top: -28px;
  background: linear-gradient(135deg, #FFD9A0 60%, #FF9200 100%);
  border-radius: 50%;
  width: 66px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 6px solid #FFF6ED;
  /* 让悬浮logo更有治愈活力感 */
}

.center-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  justify-content: center;
}
</style>