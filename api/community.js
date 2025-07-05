import request from '@/api/request.js';
import { base_url } from '@/api/config.js'; // 导入 base_url

export const fetchPostTypes = () => {
  return request.get('/api/post/types');
};

// 上传图片接口
export const chooseAndUploadImage = (filePath) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${base_url}/api/upload/image`,
      filePath,
      name: 'file',
      success: (uploadRes) => {
        const data = JSON.parse(uploadRes.data)
        if (data.code === 200) resolve({ imgUrl: data.data.url, imgId: data.data.imgId })
        else reject(data.msg)
      },
      fail: reject
    })
  })
}

export const publishPost = (postData) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${base_url}/api/post/create`,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: postData,
      success: (res) => { if (res.data.code === 200) resolve(res.data.data); else reject(res.data.msg) },
      fail: reject
    })
  })
}

export const fetchPostList = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${base_url}/api/post/list`,
      method: 'GET',
      success: (res) => { if (res.data.code === 200) resolve(res.data.data); else reject(res.data.msg) },
      fail: reject
    })
  })
}

export const fetchPostDetail = async (postId) => {
  return request.get(`/api/post/detail?id=${postId}`);
};
