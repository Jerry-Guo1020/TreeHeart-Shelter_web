// community.js
import request from '@/api/request.js';

// 1. 获取帖子类型
export function fetchPostTypes() {
  return request.post('/getposttypes', {
    params: {}
  });
}

// 2. 获取帖子列表（支持分页）
export function fetchPostList({ limit = 5, offset = 0, typeId = null } = {}) {
  const params = { limit, offset };
  if (typeId) params.typeId = typeId;
  return request.post('/getcommunity', { params });
}


// 3. 获取单个帖子详情
export function fetchPostDetail(postId) {
  return request.post('/getpostdetail', {
    params: { postId }
  });
}

// 4. 发布帖子
export function publishPost({ typeId, title, content, imgId }) {
  return request.post('/createpost', {
    params: { typeId, title, content, imgId }
  });
}

// 5. 点赞帖子
export function likePost({ postId, uid }) {
  return request.post('/likepost', {
    params: { postId, uid }
  });
}

// 6. 评论帖子
export function commentPost({ postId, uid, content, parentCommentId = null }) {
  return request.post('/commentpost', {
    params: { postId, uid, content, parentCommentId }
  });
}

// 7. 收藏帖子
export function collectPost({ postId, uid }) {
  return request.post('/collectpost', {
    params: { postId, uid }
  });
}

// 8. 删除帖子（需权限）
export function deletePost({ postId, uid }) {
  return request.post('/deletepost', {
    params: { postId, uid }
  });
}

// 9. 上传图片（仍建议用uni.uploadFile，不需要params包裹）
export function chooseAndUploadImage(filePath) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: '/uploadimage', // 如果你uploadFile没用baseURL，需要补全路径
      filePath,
      name: 'file',
      success: (uploadRes) => {
        let data = {};
        try {
          data = JSON.parse(uploadRes.data)
        } catch (e) {
          return reject('上传返回格式错误')
        }
        if (data.code === 200) resolve(data.data)
        else reject(data.msg || '上传失败')
      },
      fail: reject
    })
  })
}
