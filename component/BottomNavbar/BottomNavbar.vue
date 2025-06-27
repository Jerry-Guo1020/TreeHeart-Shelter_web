<template>
  <view class="bottom-nav">
    <view class="nav-btn" @click="switchTab(0)">
      <image :src="iconHome" class="nav-icon" />
      <text>首页</text>
    </view>
    <view class="nav-btn" @click="switchTab(1)">
      <image :src="iconOrder" class="nav-icon" />
      <text>订单</text>
    </view>
    <!-- 中间 logo 仅作展示，无点击事件 -->
    <view class="nav-center-btn">
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
const iconHome = 'http://43.142.21.211:3000/static/fun_1.png'
const iconOrder = 'http://43.142.21.211:3000/static/fun_2.png'
const iconTest = 'http://43.142.21.211:3000/static/fun_3.png'
const iconUser = 'http://43.142.21.211:3000/static/fun_4.png'

// 跳转方法
function switchTab(idx) {
  if (idx === 0) {
    uni.reLaunch({ url: '/pages/home/home' })
  } else if (idx === 1) {
    uni.navigateTo({ url: '/pages/order/order' })
  } else if (idx === 2) {
    uni.navigateTo({ url: '/pages/test/test' })
  } else if (idx === 3) {
    uni.navigateTo({ url: '/pages/profile/profile' })
  }
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 72px;
  background: #F2D3C6; /* 主体淡粉色 */
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  z-index: 999;
  box-shadow: 0 -2px 24px rgba(252,94,101,0.07), 0 -1px 6px #CDE97D;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

.nav-btn {
  flex: 1;
  text-align: center;
  color: #815C41;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.92;
}

.nav-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 2px;
  filter: drop-shadow(0 1px 2px #F2D3C6);
}

.nav-center-btn {
  position: relative;
  top: -28px;
  background: #815C41;
  box-shadow: 0 4px 12px rgba(252,94,101,0.16);
  border-radius: 50%;
  width: 66px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 6px solid #F2D3C6;
}

.center-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  justify-content: center;
}
</style>
