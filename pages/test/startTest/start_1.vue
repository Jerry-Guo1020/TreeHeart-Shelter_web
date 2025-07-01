<template>
  <view class="bg">
    <view class="intro-card">
      <!-- 标题 -->
      <view class="quiz-title">MBTI 人格类型测试</view>
      <!-- 简要说明 -->
      <view class="quiz-desc">
        总共有 <text class="strong">10</text> 道题，<br />
        需要时间 <text class="strong">10min</text> 左右
      </view>
      <!-- 按钮 -->
      <button class="start-btn" @tap="startQuiz">开始做题！</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    startQuiz() {
      // 跳转到正式答题页，或触发答题逻辑
      // uni.navigateTo({ url: '/pages/quiz/quiz' })
      this.$emit('start');
    }
  }
}
</script>

<style scoped>
.bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.intro-card {
  width: 90vw;
  max-width: 440px;
  min-height: 280px;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 6px 24px 0 #ffd9a066;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 28px 38px 28px;
  box-sizing: border-box;
}
.quiz-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #8f51ff;
  text-align: center;
}
.quiz-desc {
  font-size: 20px;
  color: #444;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.6;
}
.quiz-desc .strong {
  font-weight: bold;
  color: #ff9800;
  font-size: 22px;
}
.start-btn {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  background: #ff9800;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-top: 12px;
  transition: opacity .2s;
  box-shadow: 0 2px 8px 0 #ffd9a044;
}
.start-btn:active {
  opacity: .8;
}
</style>
