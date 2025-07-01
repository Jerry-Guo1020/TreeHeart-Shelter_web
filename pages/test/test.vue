<template>
	<view class="container">
		<!-- 顶部介绍卡片 -->
		<view class="card">
			<view class="title">心理测评</view>
			<view class="content">
				探索各种心理评估测试，了解自己的性格特点、情绪状态和睡眠质量
			</view>
		</view>

		<!-- 快捷入口四色块 -->
		<view class="quick-row">
			<view v-for="item in quickList" :key="item.text" class="quick-btn" @tap="onQuickTap(item)">
				<view class="quick-icon-box" :style="{ background: item.bg }">
					<text class="quick-icon-emoji">{{ item.emoji }}</text>
				</view>
				<view class="quick-text" :style="{ color: item.textColor }">{{ item.text }}</view>
			</view>
		</view>

		<!-- 测评卡片 -->
		<view class="test-list">
			<view class="test-card" v-for="item in testCardList" :key="item.title">
				<view class="img-section">
					<image :src="item.img" class="test-img" mode="aspectFill" />
					<view class="card-type-tag" :style="{ background: item.typeColor }">
						{{ item.type }}
					</view>
					<view class="img-title">{{ item.title }}</view>
				</view>
				<view class="card-desc">{{ item.desc }}</view>
				<view class="card-info">
					<view class="info-item">🕒 {{ item.time }}</view>
					<view class="info-item">📄 {{ item.count }}题</view>
					<view class="info-item">🔥 {{ item.popularity }}%人气</view>
				</view>
				<button class="start-btn" @tap="onStartTest(item)">开始测试</button>
			</view>
		</view>
	</view>
	<BottomNavbar :current="0" />
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'

	const quickList = ref([{
			text: '性格测试',
			emoji: '🧠',
			bg: '#CDE97D',
			textColor: '#ff7700'
		},
		{
			text: '焦虑测试',
			emoji: '💧',
			bg: '#00ABFF',
			textColor: '#005076'
		},
		{
			text: '抑郁测试',
			emoji: '💤',
			bg: '#FA9FB4',
			textColor: '#ff89af'
		},
		{
			text: '睡眠质量',
			emoji: '🌙',
			bg: '#ffcad8',
			textColor: '#FC5E65'
		}
	])

	const testCardList = ref([{
			type: '性格测试',
			typeColor: '#FF9200', // 橙
			title: 'MBTI 人格类型测试',
			img: 'http://43.142.21.211:3000/static/test_1.jpg',
			desc: '迈尔斯-布里格斯性格类型指标（MBTI）是一种流行的人格测试，帮助您了解自己的性格特点和与他人交往的方式。',
			time: '15分钟',
			count: 20,
			popularity: 95,
			url: '/pages/test/startTest/start_1'
		},
		{
			type: '焦虑测试',
			typeColor: '#00ABFF', // 亮蓝
			title: '焦虑自评量表',
			img: 'http://43.142.21.211:3000/static/test_2.png',
			desc: '焦虑自评量表（SAS）是一种用于评估个体焦虑水平的工具，帮助您了解自己的焦虑状态。',
			time: '10分钟',
			count: 20,
			popularity: 88,
			url: '/pages/test/startTest/start_2'
		},
		{
			type: '抑郁测试',
			typeColor: '#FA9FB4', // 糖果粉
			title: '抑郁自评量表',
			img: 'http://43.142.21.211:3000/static/test_3.png',
			desc: '抑郁自评量表（SDS）是一种用于评估个体抑郁症状的工具，帮助您了解自己的情绪状态。',
			time: '10分钟',
			count: 20,
			popularity: 85,
			url: '/pages/test/startTest/start_3'
		},
	])

	function onQuickTap(item) {
		uni.showToast({
			title: item.text,
			icon: 'none'
		})
	}

	function onStartTest(item) {
		if (!item.url) {
			uni.showToast({
				title: '该功能暂未开放，敬请期待~'
			});
			return;
		}
		uni.navigateTo({
			url: item.url
		})
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: calc(72px + env(safe-area-inset-bottom, 24px));
	}

	.card {
		background-color: whitesmoke;
		margin: 32rpx 0 28rpx 0;
		padding: 36rpx 26rpx 28rpx 26rpx;
		border-radius: 20px;
		box-shadow: 0 4px 20px rgba(255, 146, 0, 0.07);
		text-align: center;
		width: 85%;
	}

	.title {
		font-size: 38rpx;
		font-weight: 600;
		color: #FF9200;
		margin-bottom: 18rpx;
		letter-spacing: 2rpx;
	}

	.content {
		font-size: 26rpx;
		color: #815C41;
	}

	/* 快捷入口四色块 */
	.quick-row {
		width: 700rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx 0 40rpx 0;
	}

	.quick-btn {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.quick-icon-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 12rpx;
	}

	.quick-icon-emoji {
		font-size: 40rpx;
		text-align: center;
	}

	.quick-text {
		font-size: 25rpx;
		font-weight: 500;
		text-align: center;
		margin-top: 4rpx;
		letter-spacing: 2rpx;
		font-weight: bolder;
	}

	/* 测评卡片：固定宽度&高度，加大更显内容感 */
	.test-list {
		width: 700rpx;
		display: flex;
		flex-direction: column;
		gap: 32rpx;
		align-items: center;
		margin-top: 18rpx;
		margin-bottom: 32rpx;
	}

	.test-card {
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0 8rpx 36rpx rgba(0, 172, 255, 0.11);
		width: 700rpx;
		height: 550rpx;
		margin-bottom: 12rpx;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* 大图区域 */
	.img-section {
		position: relative;
		width: 100%;
		height: 250rpx;
		/* 更高大 */
		overflow: hidden;
		border-radius: 30rpx 30rpx 0 0;
		background: #f6f6f6;
	}

	.test-img {
		width: 100%;
		height: 250rpx;
		object-fit: cover;
		display: block;
		border-radius: 30rpx 30rpx 0 0;
	}

	.card-type-tag {
		position: absolute;
		left: 20rpx;
		top: 20rpx;
		color: #fff;
		font-size: 24rpx;
		padding: 8rpx 26rpx;
		border-radius: 18rpx;
		font-weight: 500;
		opacity: 0.96;
		letter-spacing: 2rpx;
	}

	.img-title {
		position: absolute;
		left: 20rpx;
		bottom: 20rpx;
		font-size: 34rpx;
		color: #fff;
		font-weight: bold;
		z-index: 2;
		text-shadow: 0 2rpx 12rpx rgba(80, 60, 30, 0.15);
		letter-spacing: 3rpx;
	}

	/* 描述区 */
	.card-desc {
		padding: 28rpx 22rpx 12rpx 22rpx;
		color: #815C41;
		font-size: 25rpx;
		min-height: 60rpx;
		line-height: 1.55;
		background: #fff;
	}

	/* 信息区 */
	.card-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 30rpx;
		padding: 0 22rpx 0 22rpx;
		margin-bottom: 14rpx;
	}

	.info-item {
		display: flex;
		align-items: center;
		color: #FF9200;
		font-size: 23rpx;
		margin-right: 12rpx;
		font-weight: 500;
	}

	/* 按钮区 */
	.start-btn {
		margin: 0 22rpx 22rpx 22rpx;
		border-radius: 32rpx;
		background: linear-gradient(90deg, #FF9200 0%, #FA9FB4 100%);
		color: #fff;
		font-size: 28rpx;
		height: 62rpx;
		line-height: 62rpx;
		text-align: center;
		font-weight: bold;
		border: none;
		box-shadow: 0 4rpx 18rpx rgba(252, 94, 101, 0.12);
		letter-spacing: 2rpx;
	}

	.start-btn:active {
		background: #FC5E65;
		color: #fff;
	}
</style>