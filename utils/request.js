import { base_url } from '@/api/config.js'; // 导入你的基础URL配置

const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: base_url + options.url, // 拼接完整的请求URL
      method: options.method || 'GET', // 默认GET请求
      data: options.data || {}, // 请求参数
      header: {
        // 根据你的认证方式添加header，例如：
        // 'Authorization': uni.getStorageSync('token') || '',
        'Content-Type': options.contentType || 'application/json'
      },
      success: (res) => {
        // 统一处理后端返回的业务逻辑错误
        if (res.statusCode === 200) {
          resolve(res.data); // 返回后端实际数据
        } else {
          // 例如，后端返回非200状态码时，可以统一弹窗提示
          uni.showToast({
            title: res.data.msg || '请求失败',
            icon: 'none'
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        // 网络请求失败（例如断网、服务器无响应等）
        uni.showToast({
          title: '网络连接失败，请稍后再试',
          icon: 'none'
        });
        reject(err);
      },
      complete: () => {
        // 请求完成（无论成功或失败）
      }
    });
  });
};

export default request;