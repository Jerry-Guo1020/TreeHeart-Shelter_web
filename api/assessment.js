import request from '@/utils/request';

// 获取测评题目
export function fetchAssessmentQuestions(assessmentId) {
  return request({
    url: `/assessment/questions/${assessmentId}`,
    method: 'get'
  });
}

// 提交测评结果
export function submitAssessmentResult(assessmentId, score) {
  return request({
    url: '/assessment/submit',
    method: 'post',
    data: { assessmentId, score }
  });
}

// 获取用户测评记录
export function fetchUserAssessmentRecords() {
  return request({
    url: '/assessment/records',
    method: 'get'
  });
}

// 新增：删除用户测评记录
export function deleteUserAssessmentRecord(recordId) {
  return request({
    url: `/assessment/records/${recordId}`,
    method: 'delete' // 使用 DELETE 方法
  });
}