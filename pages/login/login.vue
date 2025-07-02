<template>
	<view class="container" ref="containerRef">
		<!-- 顶部区域 -->
		<view class="header">
			<view class="logoBox">
				<view class="logo-box">
					<image class="logo" :src="base_url+'/static/logo.png'" mode="aspectFit" />
				</view>
			</view>
			<view class="main-title">心语树洞心理平台</view>
			<view class="sub-title">关注心灵，共建温暖社区</view>
		</view>

		<!-- 功能模块 + 登录 -->
		<view class="card">
			<!-- 可滚动的功能区 -->
			<scroll-view class="card-scroll" scroll-y>
				<view class="feature-list">
					<view class="feature" v-for="(item, index) in features" :key="index">
						<view class="icon" :style="{ backgroundColor: item.color }">
							<image :src="item.icon" class="icon-img" />
						</view>
						<view class="text-box">
							<view class="feature-title">{{ item.title }}</view>
							<view class="feature-desc">{{ item.desc }}</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 底部固定按钮与提示 -->
			<view class="card-footer">
				<button class="login-button" @click="handleWeChatLogin">
					<image :src="base_url+'/static/login.png'" class="wechat-icon" />
					微信一键登录
				</button>

				<view class="slogan">温柔地对待自己，从心开始</view>

				<view class="agreement">
					登录即代表同意
					<text class="link">《用户协议》</text> 和
					<text class="link">《隐私政策》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { base_url } from '@/api/config.js'
import { guestLogin } from '@/api/user.js' // 导入新的 guestLogin

const handleWeChatLogin = async () => {
  try {
    // 检查本地存储是否有 token，如果有则视为已登录
    const token = uni.getStorageSync('token');
    const storedUser = uni.getStorageSync('user'); // 获取存储的用户信息

    if (token && storedUser && storedUser.id) { // 确保 token 和用户ID都存在
      uni.showToast({
        title: '已登录',
        icon: 'success'
      });
      uni.navigateTo({ url: '/pages/home/home' });
      return; // 已登录，直接返回
    }

    // 如果没有 token，则执行登录逻辑
    let res;
    // {{ edit_1 }}
    // 尝试从本地获取之前游客登录的昵称和头像
    const guestNickname = uni.getStorageSync('guest_nickname');
    const guestAvatar = uni.getStorageSync('guest_avatar');

    if (guestNickname && guestAvatar) {
      // 如果存在，则使用这些信息进行登录
      console.log('使用已存储的游客信息登录:', guestNickname, guestAvatar);
      res = await guestLogin(guestNickname, guestAvatar);
    } else {
      // 否则，进行首次游客登录，让 guestLogin 内部生成随机信息
      console.log('首次游客登录，生成随机信息');
      res = await guestLogin();
    }

    if (res.code === 200) {
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
      // 你可以将 token 和用户信息存储到本地
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('user', res.data.user); // 存储用户信息

      // {{ edit_2 }}
      // 如果是新生成的游客信息，也存储到本地，以便下次直接使用
      if (!guestNickname || !guestAvatar) {
          uni.setStorageSync('guest_nickname', res.data.user.nickname);
          uni.setStorageSync('guest_avatar', res.data.user.avatar);
          console.log('新游客信息已存储:', res.data.user.nickname, res.data.user.avatar);
      }

      uni.navigateTo({ url: '/pages/home/home' });
    } else {
      uni.showToast({
        title: res.msg || '登录失败',
        icon: 'none'
      });
    }
  } catch (err) {
    console.error('登录异常:', err); // 打印详细错误信息
    uni.showToast({
      title: '登录异常',
      icon: 'none'
    });
  }
}

// const handleWeChatLogin = () => {
//   uni.showToast({
//     title: '模拟微信登录成功',
//     icon: 'success'
//   })
//   uni.navigateTo({ url: '/pages/home/home' });
// }

const features = [
  {
    title: '心情树洞',
    desc: '分享情绪点滴，找到倾诉的角落，书写内心故事',
    icon: `${base_url}/static/fun_1.png`,
    color: '#6CA8F1'
  },
  {
    title: '心理测评',
    desc: '涵盖多种心理测试，帮助你更了解自己',
    icon: `${base_url}/static/fun_2.png`,
    color: '#A078F5'
  },
  {
    title: '情感互动',
    desc: '点赞评论他人树洞，共鸣共情，彼此温暖',
    icon: `${base_url}/static/fun_3.png`,
    color: '#FF6B6B'
  },
  {
    title: '活动空间',
    desc: '获取心理活动通知，参与互动收获成长',
    icon: `${base_url}/static/fun_4.png`,
    color: '#41D3A3'
  }
]


</script>

<style scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		align-items: center;
		margin-top: 100rpx;
		text-align: center;
	}

	.logoBox {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo-box {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	/* 设置 image 更小、等比例缩放、铺满不超出 */
	.logo {
		width: 80rpx;
		height: 80rpx;
		object-fit: contain;
	}


	.main-title {
		font-size: 40rpx;
		color: #FF9900;
		font-weight: bold;
	}

	.sub-title {
		font-size: 26rpx;
		color: #FFB84D;
		margin-top: 10rpx;
	}

	/* 整体卡片 */
	.card {
		width: 90%;
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
		padding: 0 30rpx;
		margin-top: 40rpx;
		box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
		box-sizing: border-box;
		overflow: hidden;
	}

	/* 功能滚动区 */
	.card-scroll {
		padding: 40rpx 0;
		box-sizing: border-box;
	}

	/* 功能列表单项 */
	.feature {
		display: flex;
		align-items: flex-start;
		margin-bottom: 30rpx;
	}

	.icon {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 24rpx;
	}

	.icon-img {
		width: 50rpx;
		height: 50rpx;
	}

	.text-box {
		flex: 1;
	}

	.feature-title {
		font-size: 32rpx;
		color: #333;
		font-weight: 600;
	}

	.feature-desc {
		font-size: 26rpx;
		color: #666;
		margin-top: 6rpx;
	}

	/* 底部内容区域 */
	.card-footer {
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 按钮样式 */
	.login-button {
		width: 80%;
		height: 90rpx;
		background-color: #07C160;
		color: #fff;
		border-radius: 45rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.wechat-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 16rpx;
	}

	/* 底部提示语 */
	.slogan {
		margin-top: 20rpx;
		font-size: 26rpx;
		color: #FFA940;
		text-align: center;
		font-weight: 500;
	}

	/* 协议说明 */
	.agreement {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #999;
		text-align: center;
	}

	.link {
		color: #07C160;
		text-decoration: underline;
	}
</style>