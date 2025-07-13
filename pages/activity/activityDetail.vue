<template>
	<view class="activity-detail-page">
		<image :src="activity.cover" class="detail-cover" />
		<view class="detail-content">
			<view class="tag-row">
				<text class="card-tag" :style="{background:activity.tagColor}">{{ activity.tag }}</text>
				<text class="audience-tag">{{ activity.audience }}</text>
			</view>
			<view class="title">{{ activity.title }}</view>
			<view class="sub-title">{{ activity.subTitle }}</view>
			<view class="info-row">
				<text>🗓️ {{ activity.time }}</text>
				<text class="info-dot">·</text>
				<text>📍{{ activity.place }}</text>
			</view>
			<view class="info-row">
				<image :src="activity.clubAvatar" class="club-avatar" />
				<text class="club-name">{{ activity.clubName }}</text>
			</view>
			<view class="section-title">活动介绍</view>
			<view class="desc">
				本次活动由资深心理导师带领，将通过团体互动、分享与体验，帮助大家释放压力，提升自我认知，结交新朋友。
			</view>
			<view class="avatars-row">
				<image v-for="(av, idx) in activity.avatars" :key="idx" :src="av" class="avatar-img" />
				<text class="joined">{{ activity.joined }}</text>
			</view>
			<button class="signup-btn">立即报名</button>
		</view>
	</view>
</template>
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

	const activity = ref({
		tag: '进行中',
		tagColor: '#FFA940',
		cover: 'http://43.142.21.211:3000/static/activity-1.jpg',
		title: '压力疏导团体体验',
		subTitle: '释放压力，结交新朋友',
		time: '06.30 19:30-21:00',
		place: '心理中心A区',
		clubAvatar: '/static/club1.png',
		clubName: '成长俱乐部',
		audience: '18岁+',
		avatars: ['/static/avatar1.png', '/static/avatar2.png', '/static/avatar3.png'],
		joined: '18/30'
	})
	onLoad((params) => {
		// 你实际用params.id去查详情，填充activity
	})
</script>
<style scoped>
	.activity-detail-page {
		background: #f7fafc;
		min-height: 100vh;
	}

	.detail-cover {
		width: 100%;
		height: 610rpx;
		object-fit: cover;
		display: block;
		border-radius: 0 0 32rpx 32rpx;
	}

	.detail-content {
		padding: 28rpx 24rpx 18rpx 24rpx;
		background: #fff;
		border-radius: 28rpx 28rpx 0 0;
		margin-top: -28rpx;
		position: relative;
		z-index: 2;
	}

	.tag-row {
		display: flex;
		align-items: center;
		gap: 18rpx;
		margin-bottom: 10rpx;
	}

	.card-tag {
		font-size: 22rpx;
		color: #fff;
		border-radius: 8rpx;
		padding: 2rpx 16rpx;
		font-weight: bold;
	}

	.audience-tag {
		background: #FFF2DD;
		color: #FFA940;
		border-radius: 8rpx;
		font-size: 19rpx;
		padding: 1rpx 8rpx;
	}

	.title {
		font-size: 36rpx;
		font-weight: 700;
		color: #222;
		margin: 8rpx 0 4rpx 0;
	}

	.sub-title {
		font-size: 24rpx;
		color: #888;
		margin-bottom: 12rpx;
	}

	.info-row {
		display: flex;
		align-items: center;
		font-size: 22rpx;
		color: #7c7c7c;
		margin-bottom: 6rpx;
	}

	.info-dot {
		color: #ccc;
		margin: 0 9rpx;
	}

	.club-avatar {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 1rpx solid #e1e1e1;
		margin-right: 9rpx;
	}

	.club-name {
		font-size: 22rpx;
		color: #8a7b7b;
		font-weight: 500;
	}

	.section-title {
		margin-top: 18rpx;
		font-size: 25rpx;
		color: #FFA940;
		font-weight: bold;
		margin-bottom: 8rpx;
	}

	.desc {
		font-size: 23rpx;
		color: #555;
		line-height: 1.7;
		margin-bottom: 18rpx;
	}

	.avatars-row {
		display: flex;
		align-items: center;
		margin-bottom: 22rpx;
	}

	.avatar-img {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 2rpx solid #fff;
		margin-right: -8rpx;
	}

	.joined {
		font-size: 20rpx;
		color: #39d368;
		margin-left: 12rpx;
		background: #eaffea;
		border-radius: 8rpx;
		padding: 1rpx 8rpx;
	}

	.signup-btn {
		background: #FFA940;
		color: #fff;
		font-size: 40rpx;
		border-radius: 20rpx;
		padding: 0 38rpx;
		font-weight: 600;
        line-height: 75rpx;
		border: none;
	}

	.signup-btn:active {
		background: #FFB866;
	}
</style>