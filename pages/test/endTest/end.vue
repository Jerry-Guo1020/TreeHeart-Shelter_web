<template>
  <view class="bg">
    <view class="result-card" v-if="result">
      <!-- 顶部icon和标题 -->
      <view class="result-header">
        <view class="success-icon">
          <text class="iconfont">✔</text>
        </view>
        <view class="result-title">{{ result.title || '测试完成！' }}</view>
        <view class="result-tip">
          {{ result.tip || `您已完成 ${result.assessmentName}。以下是您的测试结果和个性化建议。` }}
        </view>
      </view>
      <!-- 结果区域 -->
      <view class="result-main">
        <view class="type-bar" :style="{ background: result.color || '#8F51FF' }">
          <text class="type-name">{{ result.level }}</text>
        </view>
        <view class="result-desc">
          {{ result.description }}
        </view>
        <view class="advice-title" v-if="advices && advices.length">个性化建议</view>
        <view class="advice-list" v-if="advices && advices.length">
          <view class="advice-item" v-for="(item, idx) in advices" :key="idx">
            <view class="advice-icon">✔</view>
            <view class="advice-text">{{ item }}</view>
          </view>
        </view>
      </view>
      <!-- 按钮 -->
      <view class="btn-row">
        <button class="btn gray" @tap="goBack">返回测试列表</button>
        <button class="btn purple" @tap="onMore">了解更多</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const result = ref(null)
const advices = ref([])

onMounted(() => {
  // H5下获取页面参数
  let params = {}
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    params.assessmentId = Number(urlParams.get('assessmentId'))
    params.score = Number(urlParams.get('score'))
  }

  // 这里应通过你的后端API请求，示例代码如下：
  // let apiResult = await uni.request({ url: '/api/assessment/result', data: params })
  // result.value = apiResult.data.result
  // advices.value = apiResult.data.advices

  // 下面为模拟数据，实际请替换为API返回内容
  const assessmentId = params.assessmentId || 1
  const score = params.score || 0
  if (assessmentId === 1) {
    result.value = {
      title: '恭喜你！测试完成啦！',
      tip: `您已完成 MBTI人格类型测试。以下是您的测试结果和个性化建议。`,
      assessmentName: 'MBTI人格类型测试',
      level: score <= 15 ? '偏内向' : score <= 25 ? '均衡型' : '偏外向',
      color: score <= 15 ? '#4B7BEC' : score <= 25 ? '#32CD9E' : '#FF9200',
      description:
        score <= 15
          ? '你的性格倾向于内向，更喜欢独处或小圈子活动，做事细致踏实。'
          : score <= 25
          ? '你的性格较为均衡，能适应多种环境，外向与内向特质兼具。'
          : '你的性格倾向于外向，喜欢社交、乐于尝试新鲜事物，适应能力较强。',
    }
    advices.value = [
      '参与创意和表达性活动',
      '寻找能让您与他人建立有意义联系的机会',
      '学习如何完成长期项目和处理细节',
      '给自己设定现实的目标和期限'
    ]
  }
  // 可继续添加 assessmentId=2、3（焦虑/抑郁）等分支
})

function goBack() {
  uni.redirectTo({ url: '/pages/test/test' })
}
function onMore() {
  uni.showToast({
  	title: '该功能暂未开放，敬请期待~'
  });
  return;
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

.result-card {
  width: 92vw;
  max-width: 700rpx;
  background: #fff;
  border-radius: 32rpx;
  box-shadow: 0 6px 24px 0 #ffd9a066;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 38rpx 24rpx 32rpx 24rpx;
  box-sizing: border-box;
}

.result-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.success-icon {
  width: 82rpx;
  height: 82rpx;
  border-radius: 50%;
  background: #21d47a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18rpx;
  margin-top: 6rpx;
  box-shadow: 0 4px 18px 0 #21d47a33;
}
.success-icon .iconfont {
  font-size: 48rpx;
  color: #fff;
}
.result-title {
  font-size: 38rpx;
  font-weight: 700;
  color: #222;
  margin-bottom: 10rpx;
}
.result-tip {
  font-size: 25rpx;
  color: #815C41;
  margin-bottom: 14rpx;
  text-align: center;
}

.result-main {
  width: 100%;
  background: #fff;
  border-radius: 18rpx;
  margin-top: 20rpx;
  box-shadow: 0 2px 8px 0 #ffd9a022;
  overflow: hidden;
  padding-bottom: 14rpx;
}

.type-bar {
  width: 100%;
  background: linear-gradient(90deg, #8F51FF 0%, #6D28ED 100%);
  padding: 18rpx 28rpx;
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
  border-radius: 16rpx 16rpx 0 0;
  margin-bottom: 12rpx;
  letter-spacing: 2rpx;
}

.result-desc {
  color: #444;
  font-size: 25rpx;
  padding: 18rpx 24rpx 10rpx 24rpx;
  line-height: 1.55;
  background: #fff;
}

.advice-title {
  font-size: 24rpx;
  font-weight: 600;
  color: #333;
  margin: 12rpx 0 0 24rpx;
}
.advice-list {
  padding: 0 24rpx 0 24rpx;
}
.advice-item {
  display: flex;
  align-items: flex-start;
  gap: 10rpx;
  margin: 10rpx 0;
}
.advice-icon {
  color: #21d47a;
  font-size: 22rpx;
  margin-top: 2rpx;
  width: 28rpx;
  text-align: center;
}
.advice-text {
  color: #444;
  font-size: 23rpx;
  line-height: 1.7;
}

.btn-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 28rpx;
  margin-top: 32rpx;
}
.btn {
  flex: 1;
  max-width: 220rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: 600;
  padding: 0;
  height: 60rpx;
  margin: 0;
  border: none;
  background: #FFD9A0;
  color: #815C41;
  transition: background 0.2s;
}
.btn.purple {
  background: linear-gradient(90deg, #a568ff 0%, #6d28ed 100%);
  color: #fff;
}
.btn:active {
  opacity: 0.87;
}
</style>
