<template>
    <view class="container">
        <view v-if="loading" class="loading-overlay">
            <text>加载中...</text>
        </view>
        <view v-else-if="questions.length > 0" class="quiz-card">
            <view class="question-counter">
                {{ currentQuestionIndex + 1 }} / {{ questions.length }}
            </view>
            <view class="question-content">
                {{ questions[currentQuestionIndex].content }}
            </view>
            <view class="options">
                <view v-for="(option, index) in questions[currentQuestionIndex].parsedOptions" :key="index"
                    class="option-item" :class="{ 'selected': selectedOptionIndex === index }"
                    @tap="handleOptionSelect(index)">

                    <view class="option-circle">
                        <text v-if="isSelected(index)">✔</text>
                    </view>
                    <text class="option-text">{{ option }}</text>
                </view>
            </view>
            <button class="next-btn" @tap="nextQuestion">
                {{ currentQuestionIndex === questions.length - 1 ? '提交' : '下一题' }}
            </button>
        </view>
        <view v-else class="no-questions">
            <text>未找到测评题目或加载失败。</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { fetchAssessmentQuestions, submitAssessmentResult } from '@/api/assessment.js'; // 导入API

const assessmentId = ref(null);
const questions = ref([]);
const currentQuestionIndex = ref(0);
const selectedOptionIndex = ref(null); // 当前问题选中的选项索引
const userAnswers = ref([]); // 存储用户每个问题的答案索引
const loading = ref(true);

onLoad(async (options) => {
    if (options.assessmentId) {
        assessmentId.value = options.assessmentId;
        await loadQuestions(options.assessmentId);
    } else {
        uni.showToast({
            title: '缺少测评ID',
            icon: 'none'
        });
        loading.value = false;
    }
});

const loadQuestions = async (id) => {
    loading.value = true;
    try {
        const res = await fetchAssessmentQuestions(id);
        if (res && res.rows && res.rows.length > 0) {
            questions.value = res.rows.map(q => ({
                ...q,
                parsedOptions: q.options // options 已经是数组，无需特殊处理
            }));
            userAnswers.value = new Array(questions.value.length).fill(null);
        } else {
            uni.showToast({
                title: res.msg || '获取题目失败',
                icon: 'none'
            });
        }
    } catch (error) {
        console.error('加载题目异常:', error);
        uni.showToast({
            title: '网络错误，无法加载题目',
            icon: 'none'
        });
    } finally {
        loading.value = false;
    }
};

const handleOptionSelect = (index) => {
    selectedOptionIndex.value = index;
};

// 新增 isSelected 函数
const isSelected = (index) => {
  return selectedOptionIndex.value === index;
};

const nextQuestion = async () => {
    if (selectedOptionIndex.value === null) {
        uni.showToast({
            title: '请选择一个选项',
            icon: 'none'
        });
        return;
    }

    // 记录当前问题的答案
    userAnswers.value[currentQuestionIndex.value] = selectedOptionIndex.value;

    if (currentQuestionIndex.value < questions.value.length - 1) {
        // 切换到下一题
        currentQuestionIndex.value++;
        selectedOptionIndex.value = null; // 重置选中状态
    } else {
        // 最后一题，提交答案
        await submitQuiz();
    }
};

const submitQuiz = async () => {
    uni.showLoading({ title: '提交中...' });

    // 简单的分数计算逻辑：每个选项的索引 + 1 作为分数
    // 例如：A(索引0)=1分, B(索引1)=2分, C(索引2)=3分, D(索引3)=4分
    // 实际项目中，每个选项的分数可能需要从后端获取或有更复杂的计算规则
    let totalScore = userAnswers.value.reduce((sum, answerIndex) => {
        // 确保 answerIndex 不是 null
        return sum + (answerIndex !== null ? (answerIndex + 1) : 0);
    }, 0);

    try {
        const res = await submitAssessmentResult(assessmentId.value, totalScore);
        uni.hideLoading();

        if (res.code === 200) {
            uni.showToast({
                title: '提交成功',
                icon: 'success'
            });
            // 提交成功后，跳转到结果页或返回上一页
            // 假设结果页路径为 /pages/test/result/result，并传递结果数据
            uni.redirectTo({
                url: `/pages/test/endTest/end?assessmentId=${assessmentId.value}&score=${totalScore}&report=${encodeURIComponent(res.data.report)}&level=${encodeURIComponent(res.data.level)}`
            });
        } else {
            uni.showToast({
                title: res.msg || '提交失败',
                icon: 'none'
            });
        }
    } catch (error) {
        uni.hideLoading();
        console.error('提交测评结果异常:', error);
        uni.showToast({
            title: '网络错误，提交失败',
            icon: 'none'
        });
    }
};
</script>

<style scoped>
.container {
    min-height: 100vh;
    background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx;
    box-sizing: border-box;
}

.loading-overlay,
.no-questions {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 32rpx;
    color: #666;
}

.quiz-card {
    width: 90%;
    max-width: 700rpx;
    background: #fff;
    border-radius: 32rpx;
    box-shadow: 0 6rpx 24rpx 0 rgba(255, 217, 160, 0.4);
    padding: 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.question-counter {
    font-size: 36rpx;
    font-weight: bold;
    color: #8f51ff;
    margin-bottom: 30rpx;
}

.question-content {
    font-size: 38rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 50rpx;
    line-height: 1.5;
}

.options {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    margin-bottom: 60rpx;
}

.option-item {
    display: flex; /* 新增 */
    align-items: center; /* 新增 */
    padding: 25rpx 30rpx;
    background: #f8f8f8;
    border-radius: 20rpx;
    font-size: 32rpx;
    color: #555;
    /* text-align: center; 此行可以移除，因为 flex 布局会改变其行为 */
    border: 2rpx solid #eee;
    transition: all 0.2s ease;
}

.option-item.selected {
    background: #fff7e6;
    border-color: #ff9800;
    color: #ff9800;
    font-weight: bold;
}

.option-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #FF9800;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #FF9800;
}
.option-item.selected .option-circle {
  background: #FF9800;
  color: #fff;
}

/* 新增 option-text 样式 */
.option-text {
    flex: 1; /* 让文本占据剩余空间 */
    text-align: left; /* 文本左对齐 */
}

.next-btn {
    width: 80%;
    height: 96rpx;
    border-radius: 48rpx;
    background: #ff9800;
    color: #fff;
    font-size: 36rpx;
    font-weight: bold;
    border: none;
    outline: none;
    margin-top: 20rpx;
    transition: opacity 0.2s;
    box-shadow: 0 4rpx 16rpx 0 rgba(255, 217, 160, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.next-btn:active {
    opacity: 0.8;
}
</style>