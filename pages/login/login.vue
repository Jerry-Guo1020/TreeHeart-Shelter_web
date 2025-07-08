<template>
	<view class="container" ref="containerRef">
		<!-- 顶部区域 -->
		<view class="header">
			<view class="logoBox">
				<view class="logo-box">
					<image class="logo" :src="BASE_URL+'/static/logo.png'" mode="aspectFit" />
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
					<image :src="BASE_URL+'/static/login.png'" class="wechat-icon" />
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
import { BASE_URL } from '@/api/config.js'
import { apiLogin, apiRegister } from '@/api/user.js' // 导入新的 

const saveUserInfo = async (data) => {
	uni.setStorageSync("openId", data.openid)
}

const handleWeChatLogin = async () => {
	const openId = await uni.getStorageSync("openId")
	
	// no openid
	if (!openId) {
		const userInfo = await apiRegister();
		console.log(userInfo)
		saveUserInfo(userInfo.params)
	}
	else {
		// yes openid
		const res = await apiLogin(openId);
		const isLogin = res.rows[0].userExists;
		
		if (!isLogin) {
			const userInfo = await apiRegister();
			saveUserInfo(userInfo.params)
		}
	}

	setTimeout(() => {
		uni.showToast({
		    title: '微信登录成功',
		    icon: 'success'
		  })
	  uni.navigateTo({
	    url: '/pages/home/home',
	  });
	}); // 等动画结束后跳转
}
const features = [
  {
    title: '心情树洞',
    desc: '分享情绪点滴，找到倾诉的角落，书写内心故事',
    icon: `${BASE_URL}/static/fun_1.png`,
    color: '#6CA8F1'
  },
  {
    title: '心理测评',
    desc: '涵盖多种心理测试，帮助你更了解自己',
    icon: `${BASE_URL}/static/fun_2.png`,
    color: '#A078F5'
  },
  {
    title: '情感互动',
    desc: '点赞评论他人树洞，共鸣共情，彼此温暖',
    icon: `${BASE_URL}/static/fun_3.png`,
    color: '#FF6B6B'
  },
  {
    title: '活动空间',
    desc: '获取心理活动通知，参与互动收获成长',
    icon: `${BASE_URL}/static/fun_4.png`,
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