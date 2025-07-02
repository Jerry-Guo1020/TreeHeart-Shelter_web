import request from '@/api/request.js'; // 假设你有一个统一的请求工具

// 获取测评题目
export const fetchAssessmentQuestions = async (assessmentId) => {
  // TODO: 请替换为你的后端实际接口
  // 假设后端接口为 GET /assessment/questions?assessmentId=1
  // 返回数据格式：{ code: 200, msg: 'success', data: { questions: [{ id: 1, content: '...', options: '["A. ..", "B. .."]' }] } }
  try {
    const res = await request.get(`/assessment/questions?assessmentId=${assessmentId}`);
    return res;
  } catch (error) {
    console.error('fetchAssessmentQuestions API error:', error);
    // 模拟数据，用于前端开发和测试
    if (assessmentId == 1) { // MBTI
      return {
        code: 200,
        msg: 'success',
        data: {
          questions: [
            { id: 1, content: '你更喜欢的生活方式是？', options: '["A. 有计划地进行", "B. 随机应变", "C. 视情况而定", "D. 无所谓"]' },
            { id: 2, content: '在社交场合你会觉得？', options: '["A. 精力充沛", "B. 较为自在", "C. 略感压力", "D. 很疲惫"]' },
            { id: 3, content: '你做决定时更依赖？', options: '["A. 逻辑分析", "B. 情感感受", "C. 他人建议", "D. 随机选择"]' },
            { id: 4, content: '你更喜欢哪种工作环境？', options: '["A. 有规则有秩序", "B. 灵活自由", "C. 充满挑战", "D. 温馨安静"]' },
            { id: 5, content: '与人交往时你倾向于？', options: '["A. 主动发起对话", "B. 静静倾听", "C. 看情况", "D. 很少参与"]' },
            { id: 6, content: '遇到问题你更习惯？', options: '["A. 自己思考解决", "B. 向朋友倾诉", "C. 上网查资料", "D. 求助他人"]' },
            { id: 7, content: '你认为自己更像？', options: '["A. 理性主义者", "B. 感性主义者", "C. 两者兼有", "D. 不好说"]' },
            { id: 8, content: '当遇到新环境时你？', options: '["A. 积极适应", "B. 慢慢适应", "C. 略感不安", "D. 害怕改变"]' },
            { id: 9, content: '你喜欢的活动是？', options: '["A. 团体活动", "B. 小范围聚会", "C. 独自休息", "D. 没特别喜好"]' },
            { id: 10, content: '你的时间观念更偏向？', options: '["A. 守时准时", "B. 稍微拖延", "C. 视具体情况", "D. 随性无所谓"]' },
          ]
        }
      };
    } else if (assessmentId == 2) { // 焦虑自评
      return {
        code: 200,
        msg: 'success',
        data: {
          questions: [
            { id: 11, content: '我感到手脚发抖', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 12, content: '我容易心慌或紧张', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 13, content: '我容易出汗', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 14, content: '我觉得头晕或头痛', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 15, content: '我难以入睡或早醒', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 16, content: '我容易感到疲劳或无力', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 17, content: '我经常担心自己的健康', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 18, content: '我对未来感到担忧', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 19, content: '我感到坐立不安', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 20, content: '我觉得很难专注或集中注意力', options: '["A. 从不", "B. 偶尔", "C. 经常", "D. 总是"]' },
          ]
        }
      };
    } else if (assessmentId == 3) { // 抑郁自评
      return {
        code: 200,
        msg: 'success',
        data: {
          questions: [
            { id: 21, content: '我感到心情低落', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 22, content: '我对平时喜欢的活动失去兴趣', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 23, content: '我觉得自己没有价值', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 24, content: '我觉得精力不足，容易疲惫', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 25, content: '我感到难以入睡或早醒', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 26, content: '我觉得食欲减退', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 27, content: '我觉得做事提不起劲', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 28, content: '我感到内心空虚', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 29, content: '我难以集中注意力', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
            { id: 30, content: '我有自杀或伤害自己的念头', options: '["A. 没有", "B. 偶尔", "C. 经常", "D. 总是"]' },
          ]
        }
      };
    }
    return { code: 500, msg: '模拟数据：未找到对应测评题目' };
  }
};

// 提交测评结果
export const submitAssessmentResult = async (assessmentId, totalScore) => {
  // TODO: 请替换为你的后端实际接口
  // 假设后端接口为 POST /assessment/submit
  // 请求体格式：{ assessmentId: 1, score: 25 }
  // 返回数据格式：{ code: 200, msg: 'success', data: { level: '均衡型', report: '你的性格较为均衡...' } }
  try {
    const res = await request.post('/assessment/submit', { assessmentId, score: totalScore });
    return res;
  } catch (error) {
    console.error('submitAssessmentResult API error:', error);
    // 模拟数据，用于前端开发和测试
    if (assessmentId == 1) { // MBTI
      let level, report;
      if (totalScore >= 0 && totalScore <= 15) {
        level = '偏内向';
        report = '你的性格倾向于内向，更喜欢独处或小圈子活动，做事细致踏实。';
      } else if (totalScore >= 16 && totalScore <= 25) {
        level = '均衡型';
        report = '你的性格较为均衡，能适应多种环境，外向与内向特质兼具。';
      } else { // 26-40
        level = '偏外向';
        report = '你的性格倾向于外向，喜欢社交、乐于尝试新鲜事物，适应能力较强。';
      }
      return { code: 200, msg: '提交成功', data: { level, report } };
    } else if (assessmentId == 2) { // 焦虑自评
      let level, report;
      if (totalScore >= 0 && totalScore <= 13) {
        level = '无焦虑';
        report = '你的焦虑水平处于正常范围，无需担心，保持积极的生活状态。';
      } else if (totalScore >= 14 && totalScore <= 20) {
        level = '轻度焦虑';
        report = '你有轻度焦虑表现，建议适当休息、调整心态，关注情绪变化。';
      } else if (totalScore >= 21 && totalScore <= 30) {
        level = '中度焦虑';
        report = '你的焦虑情绪较明显，建议多与他人交流、合理减压。';
      } else { // 31-40
        level = '重度焦虑';
        report = '你的焦虑指数较高，请及时寻求专业心理帮助，关注身心健康。';
      }
      return { code: 200, msg: '提交成功', data: { level, report } };
    } else if (assessmentId == 3) { // 抑郁自评
      let level, report;
      if (totalScore >= 0 && totalScore <= 13) {
        level = '无抑郁';
        report = '你的情绪状态良好，未见明显抑郁症状，请继续保持健康的生活习惯。';
      } else if (totalScore >= 14 && totalScore <= 20) {
        level = '轻度抑郁';
        report = '你有轻度抑郁倾向，建议调整作息、适当锻炼，关注内心变化。';
      } else if (totalScore >= 21 && totalScore <= 30) {
        level = '中度抑郁';
        report = '你的抑郁情绪较明显，建议主动寻求家人、朋友或心理咨询师帮助。';
      } else { // 31-40
        level = '重度抑郁';
        report = '你的抑郁风险较高，请尽快联系专业心理医生，积极寻求支持和治疗。';
      }
      return { code: 200, msg: '提交成功', data: { level, report } };
    }
    return { code: 500, msg: '模拟数据：未找到对应测评结果' }; // 补充完整
  }
};