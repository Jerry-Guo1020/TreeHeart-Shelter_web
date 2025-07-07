import request from '@/api/request.js'

/**
 * 游客登录，openid 为唯一标识（比如微信获取到的 openid 或本地唯一字符串）
 * @param {string} nickname 
 * @param {string} avatar 
 * @param {string|null} openid 可选（首次可以 null，注册后每次都带）
 */
export const guestLogin = (nickname, avatar, openid = null) => {
  return request.post('/api/user/guest-login', {
    openid,
    nickname,
    avatar
  });
};

/**
 * 更新用户信息
 * @param {object} data 包含要更新的用户信息的对象，例如 { nickname: '新昵称', sex: '男' }
 */
export const updateUserInfo = (data) => {
  const openid = uni.getStorageInfoSync('openId');
  
  if(!openid) {
	  console.log("没有获取得到哦")
	  return
  }
  console.log("当前账户信息已获取成功！")
  return request.post('api/userinfo', { openid });
  
  
};


/**
 * 获取当前用户信息
 */
export const getCurrentUser = (data) => {
  const openid = uni.getStorageSync('openId');
  
  if(!openid) {
	  console.log("没有获取得到哦")
	  return
  }
  return request.post('/userinfo', { params: { openid } });

  
};

export const apiRegister = async () => {
	const randomName = await getRandomName()
	const randomAvatarUrl = getRandomAvatarUrl(randomName)
	const randomOpenId = getRandomOpenId(13)
	
	const data = {
		  "params": {
		    "userTypeId": 1,
		    "openid": randomOpenId,
		    "nickname": randomName,
		    "avatar": randomAvatarUrl,
		    "username": randomName,
		    "sex": "男",
		    "grade": "大二",
		    "college": "计算机学院",
		    "subCollege": "软件工程系",
		    "major": "软件工程",
		    "isNewUser": 1
		  }
	}
	
	await request.post("/register", data)
	return data;
}

export const apiLogin = async (openId) => {
	return request.post("/login", {
		  "params": {
			  "openId": openId
		  }
	})
}

export const getRandomName = async () => {
  // GET https://api.mir6.com/api/sjname
  return new Promise((resolve, reject) => {
    uni.request({
      url: "https://api.mir6.com/api/sjname", // 请求的接口地址
      method: "GET", // 请求方式
      dataType: "text", // <--- Add this line
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      sslVerify: true, // 验证 SSL 证书
      success: ({ data, statusCode, header }) => {
        if (statusCode === 200) {
          // 通常接口成功会返回 data 对象，其中可能包含需要的名称信息
          // 假设返回的数据结构是 { code: 0, name: 'xxx' } 或直接是名称字符串
          // 请根据实际返回的接口文档调整这里的解析逻辑
          resolve(data); // 或者 reject(new Error('Unexpected data structure'));
        } else {
          reject(new Error(`Request failed with status code ${statusCode}`));
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};

export const getRandomAvatarUrl = (name) => {
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`;
};

function getRandomOpenId(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    return randomString;
}