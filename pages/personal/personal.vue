<template>
	<view class="container">
		<!-- 头像与昵称 -->
		<view class="profile-header">
			<image :src="userInfo.avatar" class="avatar" />
			<view class="username-row">
			  <text class="username">{{ userInfo.username }}</text>
			  <text v-if="userInfo.sex === '男'" class="sex-icon male-icon">♂</text>
			  <text v-else-if="userInfo.sex === '女'" class="sex-icon female-icon">♀</text>
			</view>

			<view class="stats-row">
				<view class="stat-item">
					<text class="stat-num">0</text> <!-- 暂时硬编码，如果后端有关注数再动态获取 -->
					<text class="stat-label">关注</text>
				</view>
				<view class="stat-divider"></view>
				<view class="stat-item">
					<text class="stat-num">0</text> <!-- 暂时硬编码，如果后端有粉丝数再动态获取 -->
					<text class="stat-label">粉丝</text>
				</view>
			</view>
		</view>

		<!-- 卡片区域 -->
		<view class="card">
			<view class="card-row">
				<view class="card-btn favorite">
					<image :src=" BASE_URL + '/static/personal_1.png'" class="card-icon" mode="aspectFit" />
					<text class="card-text">我的收藏</text>
				</view>
				<view class="card-btn settings">
					<image :src=" BASE_URL + '/static/personal_2.png'" class="card-icon" mode="aspectFit" />
					<text class="card-text">设置</text>
				</view>
			</view>
			<view class="card-list">
				<view class="list-btn" @click="toPersonInformation">个人信息</view>
				<view class="list-btn">求助记录</view>
				<view class="list-btn" @click="toassessmentRecord">测试记录</view>
			</view>
		</view>

		<!-- 底部导航 -->
		<BottomNavbar :current="3" />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'
import { getCurrentUser } from '@/api/user.js'
import { BASE_URL } from '@/api/config.js'
import { onShow } from '@dcloudio/uni-app'; // 导入 onShow

const userInfo = ref({
  nickname: '游客',
  avatar: BASE_URL + '/static/头像.png',
  sex: '男'
})

onShow (async () => {
  try {
    const res = await getCurrentUser()
    if (res && res.rows && res.rows.length > 0) {
       userInfo.value = res.rows[0]
      if (!userInfo.value.avatar) {
        userInfo.value.avatar = BASE_URL + '/static/头像.png'
      }
	  // 获取到信息之后，将这个信息保存到storage中~
	  uni.setStorageSync('user', userInfo.value);
    } else {
      console.log('没有东西哦');
    }
  } catch (e) {
    userInfo.value = {
      nickname: '游客',
      avatar: BASE_URL + '/static/头像.png',
      sex: '男'
    };
	// 失败时清空缓存防止脏数据
	uni.removeStorageSync('user');
  }
})

const toPersonInformation = () => {
  uni.navigateTo({
    url: '/pages/personal/personInformation'
  })
}
const toassessmentRecord = () => {
  uni.navigateTo({
    url: '/pages/personal/assessmentRecord'
  })
}
</script>


<style scoped>
	/* 整体背景及居中布局 */
	.container {
		min-height: 100vh;
		background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
		display: flex;

		flex-direction: column;
		align-items: center;
		padding-top: 44rpx;
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom, 24px));
		box-sizing: border-box;
	}

	/* 顶部信息 */
	.profile-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 16rpx;
		margin-bottom: 24rpx;
	}

	.avatar {
		width: 132rpx;
		height: 132rpx;
		border-radius: 50%;
		border: 6rpx solid #5BC481;
		background: #fff;
		margin-bottom: 18rpx;
	}

	.username-row {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.username {
		font-size: 36rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
		color: #333;
		margin-right: 10rpx;
	}

	.sex-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.stats-row {
		display: flex;
		align-items: center;
		margin-top: 8rpx;
		margin-bottom: 4rpx;
	}

	.stat-item {
		text-align: center;
		min-width: 72rpx;
	}

	.stat-num {
		font-size: 26rpx;
		font-weight: 600;
		color: #333;
	}

	.stat-label {
		font-size: 18rpx;
		color: #aaa;
		margin-top: 3rpx;
	}

	.stat-divider {
		width: 2rpx;
		height: 34rpx;
		background: #eee;
		margin: 0 24rpx;
		border-radius: 2rpx;
	}

	/* 卡片主区域 */
	.card {
		width: 92vw;
		max-width: 680rpx;
		min-width: 320rpx;
		background: #fff;
		border-radius: 32rpx 32rpx 0 0;
		box-shadow: 0 6rpx 30rpx rgba(120, 160, 120, 0.07);
		padding: 48rpx 28rpx 36rpx 28rpx;
		margin-top: 8rpx;
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}

	.card-row {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
		margin-bottom: 36rpx;
		gap: 22rpx;
	}

	.card-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 188rpx;
		height: 98rpx;
		border-radius: 24rpx;
		justify-content: center;
		font-size: 22rpx;
		font-weight: 500;
		box-shadow: 0 2rpx 10rpx rgba(120, 160, 120, 0.08);
		cursor: pointer;
		transition: box-shadow 0.2s;
	}

	.card-btn:active {
		box-shadow: 0 0 0 transparent;
		opacity: 0.85;
	}

	.favorite {
		background: #E9F9C2;
	}

	.settings {
		background: #FFD8A1;
	}

	.card-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 10rpx;
	}

	.card-text {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
	}

	.card-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 26rpx;
	}

	.list-btn {
		background: #FFF4E4;
		border-radius: 32rpx;
		padding: 24rpx 0;
		font-size: 24rpx;
		font-weight: 500;
		text-align: center;
		color: #333;
		cursor: pointer;
		transition: background .2s;
	}

	.list-btn:active {
		background: #FFD8A1;
	}

	.sex-icon {
		/* 调整为文本图标的样式 */
		font-size: 26rpx;
		/* 与原图片高度相近的字体大小 */
		line-height: 1;
		/* 确保文本垂直居中 */
		margin-left: 10rpx;
		/* 与昵称保持距离 */
		display: flex;
		/* 使用 flex 确保内容居中 */
		align-items: center;
		justify-content: center;
		width: 26rpx;
		/* 保持宽度，使背景色或边框看起来一致 */
		height: 26rpx;
		/* 保持高度 */
		border-radius: 50%;
		/* 圆形背景 */
		font-weight: bold;
		/* 让符号更明显 */
	}

	.male-icon {
		color: #fff;
		/* 白色符号 */
		background-color: #007bff;
		/* 蓝色背景 */
	}

	.female-icon {
		color: #fff;
		/* 白色符号 */
		background-color: #ff69b4;
		/* 粉色背景 */
	}
</style>