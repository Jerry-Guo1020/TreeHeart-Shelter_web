import request from '@/api/request.js';

// 获取测评题目
export function fetchAssessmentQuestions(assessmentId) {
  return request.post('/textinfo', {params:{assessmentId}})
}

// 提交测评结果
export function submitAssessmentResult(assessmentId, totalScore) {
  return request.post('/textend', {
	  params:{
		  assessmentId,
		  totalScore
		  }})
  }

// 获取用户测评记录
export function fetchUserAssessmentRecords(openid) {
  return request.post('/texthistory', { params: { openid } });
}



// 获取用户测评记录之后呢，我要将这个记录插入到我的数据库，当然一切的前提是我先要获取这个openid 以这个openid的账户插入进去
export function insertUserAssessmentRecord({uid, assessmentId, totalScore, level, report}) {
	return request.post('/textinto', {
		params: {
			uid,
			assessmentId,
			totalScore,
			level,
			report
		}
	})
}

// 新增：删除用户测评记录

export function deleteUserAssessmentRecord(recordId, openid) {
  return request.post('/deletetext', {
    params: {
      id: recordId,
      openid: openid 
    }
  });
}