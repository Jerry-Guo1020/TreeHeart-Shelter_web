<template>
  <view class="bg">
    <view class="quiz-card">
      <!-- 标题 -->
      <view class="quiz-title">{{ quizTitle }}</view>
      <!-- 进度 -->
      <view class="quiz-progress">第 {{ currentIndex + 1 }}/{{ questions.length }} 题</view>
      <!-- 题干 -->
      <view class="question-title">{{ currentQuestion.title }}</view>
      <!-- 选项 -->
      <view class="options-list">
        <view
          v-for="(option, idx) in currentQuestion.options"
          :key="idx"
          class="option-item"
          :class="{ selected: isSelected(idx) }"
          @tap="selectOption(idx)"
        >
          <view class="option-circle">
            <text v-if="isSelected(idx)">✔</text>
          </view>
          <text class="option-text">{{ option }}</text>
        </view>
      </view>
      <!-- 按钮 -->
      <view class="card-footer">
        <button
          class="footer-btn"
          :disabled="currentIndex === 0"
          @tap="prevQuestion"
        >上一题</button>
        <button
          v-if="!isLast"
          class="footer-btn next"
          :disabled="!hasAnswer"
          @tap="nextQuestion"
        >下一题</button>
        <button
          v-else
          class="footer-btn submit"
          :disabled="!hasAnswer"
          @tap="submitQuiz"
        >提交</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      quizTitle: "心理测评",
      currentIndex: 0,
      questions: [
        {
          title: "你最近的心情如何？",
          options: ["很好", "一般", "不太好", "很差"],
          type: "single",
          answer: []
        },
        {
          title: "你常用哪些减压方式？",
          options: ["运动", "听音乐", "聊天", "其他"],
          type: "multiple",
          answer: []
        },
        // ...更多题目
      ]
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || {};
    },
    isMultiple() {
      return this.currentQuestion.type === 'multiple';
    },
    hasAnswer() {
      return this.currentQuestion.answer && this.currentQuestion.answer.length > 0;
    },
    isLast() {
      return this.currentIndex === this.questions.length - 1;
    }
  },
  methods: {
    isSelected(idx) {
      return (this.currentQuestion.answer || []).includes(idx);
    },
    selectOption(idx) {
      if (!this.currentQuestion) return;
      if (this.currentQuestion.type === 'single') {
        this.currentQuestion.answer = [idx];
      } else {
        const pos = this.currentQuestion.answer.indexOf(idx);
        if (pos === -1) {
          this.currentQuestion.answer.push(idx);
        } else {
          this.currentQuestion.answer.splice(pos, 1);
        }
      }
      // 兼容uni-app响应
      this.$forceUpdate && this.$forceUpdate();
    },
    prevQuestion() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) this.currentIndex++;
    },
    submitQuiz() {
      uni.showToast({ title: '已提交', icon: 'success' });
      // 提交逻辑写在这里
    }
  }
};
</script>

<style scoped>
.bg {
  min-height: 100vh;
  width: 100vw;
  /* 渐变背景 */
  background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.quiz-card {
  width: 90vw;
  max-width: 520px;
  min-height: 420px;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 6px 24px 0 #ffd9a066;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 26px 28px 26px;
  box-sizing: border-box;
}
.quiz-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
  text-align: center;
  color: #222;
}
.quiz-progress {
  font-size: 16px;
  color: #999;
  margin-bottom: 22px;
  text-align: center;
}
.question-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 28px;
  width: 100%;
  text-align: center;
}
.options-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}
.option-item {
  display: flex;
  align-items: center;
  background: #FFF6ED;
  border-radius: 22px;
  padding: 16px 20px;
  font-size: 18px;
  color: #222;
  font-weight: 500;
  border: 2px solid transparent;
  transition: all .15s;
  cursor: pointer;
}
.option-item.selected {
  background: #ffb54722;
  border-color: #FF9800;
  color: #FF9800;
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
.card-footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  gap: 16px;
}
.footer-btn {
  flex: 1;
  height: 44px;
  border-radius: 22px;
  background: #ffb547;
  color: #fff;
  font-size: 18px;
  border: none;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 0;
  outline: none;
  transition: opacity .2s;
}
.footer-btn:disabled {
  opacity: .5;
  background: #ffd9a0;
  color: #fff;
}
.footer-btn.next {
  background: #FF9800;
}
.footer-btn.submit {
  background: #ff6b01;
}
</style>
