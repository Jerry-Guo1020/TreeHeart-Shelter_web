import { guestLogin } from '../../api/user';

export default {
  data() {
    return {
      // ... 其他数据 ...
    };
  },
  methods: {
    async handleWeChatLogin() {
      try {
        const res = await guestLogin();

        console.log('guestLogin 返回:', res);

        // 检查后端返回的响应结构
        if (res && res.code === 200 && res.data && typeof res.data === 'object' && res.data.user) {
          // 从 res.data.user 中解构用户信息
          const { id, nickname, avatar, isNewUser } = res.data.user;

          if (id && nickname && avatar !== undefined) {
            // 登录成功，将用户信息存储到本地
            uni.setStorageSync('userInfo', { id, nickname, avatar, isNewUser });
            uni.setStorageSync('isLoggedIn', true);

            uni.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            });

            // 根据 isNewUser 判断是否跳转到完善信息页面
            if (isNewUser === 1) {
              uni.redirectTo({
                url: '/pages/register/register'
              });
            } else {
              uni.reLaunch({
                url: '/pages/index/index'
              });
            }
          } else {
            // res.data.user 结构不完整
            console.error('游客登录成功，但返回的用户信息不完整:', res.data.user);
            uni.showToast({
              title: '登录成功，但用户信息异常',
              icon: 'none'
            });
          }
        } else {
          // 后端返回的 code 不是 200，或者 res.data 不存在，或者 res.data.user 不存在
          console.error('游客登录失败或返回数据异常:', res);
          uni.showToast({
            title: res.msg || '登录失败，请重试',
            icon: 'none'
          });
        }
      } catch (error) {
        // 请求过程中发生异常（例如网络错误）
        console.error('登录请求异常:', error);
        uni.showToast({
          title: '网络错误，请检查网络或稍后再试',
          icon: 'none'
        });
      }
    }
  }
};