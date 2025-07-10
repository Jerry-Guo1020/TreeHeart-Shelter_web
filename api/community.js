import request from '@/api/request.js';

// 获取帖子类型
export function fetchPostTypes() {
  return request.post('/getposttypes', { params: {} });
}

// 获取帖子列表（支持分页和typeId筛选）
export function fetchPostList({ limit = 10, offset = 0, typeId = null } = {}) {
  // 只在 typeId 有效时传递
  let params = { limit, offset }
  if (typeId !== null && typeId !== undefined) params.typeId = typeId
  return request.post('/getcommunity', { params })
}


// 获取单个帖子详情
export function fetchPostDetail(postId) {
  return request.post('/getpostdetail', { params: { postId } });
}

// 发布帖子
export function publishPost({ uid, typeId, title, content, imgId }) {
  return request.post('/createpost', {
    params: { uid, typeId, title, content, imgId }
  });
}
// 点赞帖子
export function likePost({ postId, uid }) {
  return request.post('/likepost', { params: { postId, uid } });
}

// 评论帖子
export function commentPost({ postId, uid, content, parentCommentId = null }) {
  return request.post('/commentpost', {
    params: { postId, uid, content, parentCommentId }
  });
}

// 收藏帖子
export function collectPost({ postId, uid }) {
  return request.post('/collectpost', { params: { postId, uid } });
}

// 删除帖子
export function deletePost({ postId, uid }) {
  return request.post('/deletepost', { params: { postId, uid } });
}

// 上传图片（建议直接用uni.uploadFile）
export function chooseAndUploadImage(filePath) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: '/uploadimage',
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
