import request from '@/api/request.js'

// 帖子类型
export function fetchPostTypes() {
  return request.post('/getposttypes', { params: {} });
}
// 帖子列表
export function fetchPostList({ limit = 10, offset = 0, typeId = null } = {}) {
  let params = { limit, offset }
  if (typeId !== null && typeId !== undefined) params.typeId = typeId
  return request.post('/getcommunity', { params })
}
// 帖子详情
export function fetchPostDetail(postId) {
  return request.post('/getpostdetail', { params: { postId } });
}
// 发帖
export function publishPost({ uid, typeId, title, content, imgId }) {
  return request.post('/createpost', {
    params: { uid, typeId, title, content, imgId }
  });
}

// 图片上传，filePath为uni.chooseImage获取的路径
export function uploadPostImage({ filePath, openid }) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${base_url}/postimg`, // 或 /upload/image 看你后台
      filePath,
      name: 'file',
      formData: {
        browser: 'miniprogram',
        status: 'uploaded',
        token: openid, // 兼容 apisql token 用 openid
        // 你想插入uri可以自己写
      },
      header: {
        Authorization: openid
      },
      success: (res) => {
        let data = {}
        try { data = JSON.parse(res.data) } catch { }
        if (data.code === 200 || data.imgId) resolve(data)
        else reject(data.msg || '图片上传失败')
      },
      fail: reject
    })
  })
}
