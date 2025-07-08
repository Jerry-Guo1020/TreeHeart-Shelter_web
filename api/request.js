import { base_url } from './config.js';

function request(method, url, data, options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${base_url}${url}`, 
	  header: {
		  "Authorization": 	"Bearer sk-d05f1c0928f6fa01cd444a3dd2b50cb3"
	  },
      method,
      data,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
		  uni.showToast({
		    title: '网络连接失败，请稍后再试',
		    icon: 'none'
		  });
        reject(err);
      }
    });
  });
}

export default {
  get: (url, data, options) => request("GET", url, data, options),
  post: (url, data, options) => request("POST", url, data, options),
  put: (url, data, options) => request("PUT", url, data, options),
  delete: (url, data, options) => request("DELETE", url, data, options),
};
