<template>
  <view class="container" ref="containerRef">
    <view class="avatar-box">
      <image class="avatar" src="http://43.142.21.211:3000/static/头像.png" alt="树洞吉祥物图片"></image>
    </view>
    <view class="title">大学生心理树洞</view>
    <view class="subtitle">不必强撑坚强<br>「心理树洞」做你无声的倾听者</view>
  </view>
</template>

<script>
export default {
  name: 'Welcome',
  onLoad() {
    // 页面加载完成后，开始动画跳转
    setTimeout(() => {
      // 使用 ref 添加动画类
      const container = this.$refs.containerRef;
      if (container && container.$el) {
        container.$el.classList.add('fade-out');
      }

      // 动画结束后跳转到下一页
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/login/login',
        });
      }, 2000); // 等动画结束后跳转
    }, 1000); // 页面加载 1 秒后开始动画
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  max-width: auto;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fade-in 2s ease-out forwards;
}

/* 淡出动画 */
.fade-out {
  animation: fade-out 2s ease-in forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.avatar-box {
  margin-top: 0;
  margin-bottom: 0;
}

.avatar {
  width: 260rpx;
  height: 260rpx;
  border-radius: 50%;
  background: #fff;
}

.title {
  font-size: 44rpx;
  color: #FF9900;
  font-weight: bold;
  margin-top: 40rpx;
  margin-bottom: 400rpx;
}

.subtitle {
  position: absolute;
  bottom: 60rpx;
  width: 100%;
  text-align: center;
  color: #FFA940;
  font-size: 24rpx;
  line-height: 40rpx;
}
</style>
