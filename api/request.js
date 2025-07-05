import { base_url } from './config.js';

function request(method, url, data, options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${base_url}${url}`, 
      method,
      data,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
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
