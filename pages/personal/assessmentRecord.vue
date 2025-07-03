<template>
  <view class="container">
    <view class="page-title">我的测评记录</view>

    <view v-if="loading" class="loading-overlay">
      <text>加载中...</text>
    </view>
    <view v-else-if="records.length === 0" class="no-records">
      <text>暂无测评记录</text>
    </view>
    <view v-else class="records-list">
      <view class="record-card" v-for="record in records" :key="record.id">
        <view class="card-header">
          <view class="card-section1">
            <text class="assessment-name">{{ record.assessmentName }}</text>
            <text class="record-time">{{ formatTime(record.createTime) }}</text>
          </view>
          <!-- 新增：删除按钮 -->
          <text class="delete-btn" @click="handleDelete(record.id)">删除</text>
        </view>
        <view class="card-content">
          <view class="score-level">
            <text class="level" :style="{ color: getLevelColor(record.level) }">等级：{{ record.level }}</text>
          </view>
          <view class="report-title">测评建议：</view>
          <view class="report-content">{{ record.report }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
// 导入新的删除API函数
import { fetchUserAssessmentRecords, deleteUserAssessmentRecord } from '@/api/assessment.js';

const records = ref([]);
const loading = ref(true);

onShow(async () => {
  loading.value = true;
  try {
    const res = await fetchUserAssessmentRecords();
    if (res.code === 200 && res.data) {
      records.value = res.data;
    } else {
      uni.showToast({
        title: res.msg || '获取记录失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('加载测评记录异常:', error);
    uni.showToast({
      title: '网络错误，无法加载记录',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
});

// 新增：处理删除记录的函数
const handleDelete = (recordId) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条测评记录吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          const deleteRes = await deleteUserAssessmentRecord(recordId);
          if (deleteRes.code === 200) {
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            });
            // 从本地记录数组中移除已删除的记录，更新UI
            records.value = records.value.filter(record => record.id !== recordId);
          } else {
            uni.showToast({
              title: deleteRes.msg || '删除失败',
              icon: 'none'
            });
          }
        } catch (error) {
          console.error('删除测评记录异常:', error);
          uni.showToast({
            title: '网络错误，删除失败',
            icon: 'none'
          });
        }
      }
    }
  });
};

const formatTime = (timeString) => {
  if (!timeString) return '';
  const date = new Date(timeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const getLevelColor = (level) => {
  // 根据等级返回不同的颜色，可以根据实际情况调整
  if (level.includes('高')) return '#FF0000'; // 红色
  if (level.includes('中')) return '#FFA500'; // 橙色
  if (level.includes('低')) return '#008000'; // 绿色
  return '#8F51FF'; // 默认紫色
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  padding: 30rpx;
  box-sizing: border-box;
}

.page-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.loading-overlay,
.no-records {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  /* 适当高度 */
  font-size: 32rpx;
  color: #666;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.record-card {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 6rpx 24rpx 0 rgba(255, 217, 160, 0.4);
  padding: 30rpx;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #eee;
}

.card-section1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;

}

.assessment-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #8f51ff;
  flex-grow: 1;
}

.record-time {
  font-size: 26rpx;
  color: #999;
}

/* 新增：删除按钮样式 */
.delete-btn {
  font-size: 26rpx;
  color: #FF0000;
  /* 红色 */
  margin-left: 20rpx;
  padding: 8rpx 16rpx;
  border: 1rpx solid #FF0000;
  border-radius: 10rpx;
  cursor: pointer;
}

.card-content {
  font-size: 30rpx;
  color: #555;
}

.score-level {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15rpx;
}

.level {
  font-weight: bold;
}

.report-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.report-content {
  font-size: 28rpx;
  line-height: 1.6;
  color: #666;
  white-space: pre-wrap;
  /* 保留报告中的换行符 */
}
</style>