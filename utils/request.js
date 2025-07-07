const BASE_URL = 'http://43.142.21.211:3000'; // 确保这里有端口号 :3000

function request(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url, // 拼接完整的 URL
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {},
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
      }
    });
  });
}

export default request;