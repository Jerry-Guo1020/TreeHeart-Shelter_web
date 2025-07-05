import { getRandomAvatarUrl } from "@/utils/randomData";
import request from '@/api/request.js'; // 假设你有一个统一的请求工具

// 获取当前用户信息
export const getCurrentUser = () => {
  return request.get('/user/current'); // 使用 request.get
};

export const fetchPosts = async () => {
  return request.get("/community/self-post");
};

export const fetchMorePosts = async (lastPostId) => {
  return request.get(`/community/self-post?lastPostId=${lastPostId}`);
};


// guestLogin 现在可以接收可选的 nickname 和 avatar 参数
export const guestLogin = async (existingNickname = null, existingAvatar = null) => {
  let nicknameToUse;
  let avatarToUse;

  if (existingNickname && existingAvatar) {
    // 如果本地已经有存储的昵称和头像，就使用它们
    nicknameToUse = existingNickname;
    avatarToUse = existingAvatar;
  } else {
    // 否则，生成新的随机昵称和头像
    nicknameToUse = await getRandomName();
    avatarToUse = getRandomAvatarUrl(nicknameToUse);
  }

  // 向后端发送请求，注册或登录用户
  return request.post("/login/guest-login", {
    nickname: nicknameToUse,
    avatar: avatarToUse,
  });
};

export const updateUserInfo = async (userInfo) => {
  return request.put("/user/userInfo", userInfo);
};

export const getRandomName = async () => {
  // 发起请求获取随机名称  
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

export const getAvatarUrl = async (id, name) => {
  if (id == 1) {
    return {
      data: {
        data: getRandomAvatarUrl(name),
      },
    };
  }
  return request.get(`/user/avater?id=${id}`);
};

export const updateUserAvatar = async (avatarBase64) => {
  return request.put("/user/avatar", {
    avatar: "data:image/png;base64," + avatarBase64,
  });
};

export const deletePost = async (postId) => {
  return request.delete("/community/post", { id: postId });
};

// 示例：登录接口，用于获取用户信息并存储到本地
export function login(code) {
  return request({
    url: '/auth/login', // 假设你的登录接口是这个
    method: 'post',
    data: { code }
  });
}
