<template>
	<view class="activity-page-bg">
		<!-- 搜索栏 -->
		<view class="header-search-wrap">
		  <view class="header-search-bar">
		    <img
			  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRleHQtaWNvbiBsdWNpZGUtdGV4dCI+PHBhdGggZD0iTTE1IDE4SDMiLz48cGF0aCBkPSJNMTcgNkgzIi8+PHBhdGggZD0iTTIxIDEySDMiLz48L3N2Zz4="
		      class="icon-svg"
		      style="width: 24px; height: 24px;"
		    />
		    <input class="search-input" v-model="searchVal" placeholder="搜索心理活动/俱乐部/关键字" @input="onSearch" />
		    <img
		      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlYXJjaC1pY29uIGx1Y2lkZS1zZWFyY2giPjxwYXRoIGQ9Im0yMSAyMS00LjM0LTQuMzQiLz48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PC9zdmc+"
		      class="icon-svg scan-icon"
		      style="width: 24px; height: 24px;"
		    />
		  </view>
		</view>


		<!-- 轮播图 -->
		<swiper class="banner-swiper" :indicator-dots="true" :autoplay="true" interval="2800" circular>
			<swiper-item v-for="(img, idx) in banners" :key="idx">
				<image :src="img" class="banner-img" mode="aspectFill" />
			</swiper-item>
		</swiper>

		<!-- 九宫格类型（icon用image） -->
		<view class="type-grid">
			<view v-for="(type, idx) in activityTypes" :key="type.name" class="type-grid-item"
				:class="{ active: typeIdx === idx }" @tap="onTypeSelect(idx)">
				<image class="type-icon" :src="type.icon" mode="aspectFit" />
				<text class="type-label">{{ type.name }}</text>
			</view>
		</view>

		<!-- 活动列表 -->
		<view class="activity-list">
			<view v-for="item in filteredActivities" :key="item.id" class="activity-card" @tap="goDetail(item)"
				:class="{ active: activeId===item.id }" @touchstart="activeId=item.id" @touchend="activeId=null"
				@mouseleave="activeId=null">
				<view class="img-block">
					<image :src="item.cover" class="cover-img" mode="aspectFill" />
					<view class="card-tag" :style="{background:item.tagColor}">{{ item.tag }}</view>
				</view>
				<view class="content-block">
					<view class="main-title">{{ item.title }}</view>
					<view class="sub-title">{{ item.subTitle }}</view>
					<view class="info-row">
						<text class="info-icon">🗓️</text>
						<text class="info-txt">{{ item.time }}</text>
						<text class="split">|</text>
						<text class="info-icon">📍</text>
						<text class="info-txt">{{ item.place }}</text>
					</view>
					<view class="club-row">
						<image :src="item.clubAvatar" class="club-avatar" />
						<text class="club-name">{{ item.clubName }}</text>
						<text class="audience-tag">{{ item.audience }}</text>
					</view>
					<view class="bottom-row">
						<view class="avatars">
							<image v-for="(av, idx) in item.avatars" :key="idx" :src="av" class="avatar-img" />
							<text class="joined">{{ item.joined }}</text>
						</view>
						<button class="signup-btn" @tap.stop="onSignup(item)">立即报名</button>
					</view>
				</view>
			</view>
			<view v-if="filteredActivities.length === 0" class="empty-tips">
				<image src="https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/empty-box.png" class="empty-img" />
				<text>暂无匹配活动</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		activities
	} from '@/data/activities.js'

	// 用图片加载SVG，全部橙色
	const activityTypes = [
		{
				name: "热门活动",
				icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZsYW1lLWljb24gbHVjaWRlLWZsYW1lIj48cGF0aCBkPSJNOC41IDE0LjVBMi41IDIuNSAwIDAgMCAxMSAxMmMwLTEuMzgtLjUtMi0xLTMtMS4wNzItMi4xNDMtLjIyNC00LjA1NCAyLTYgLjUgMi41IDIgNC45IDQgNi41IDIgMS42IDMgMy41IDMgNS41YTcgNyAwIDEgMS0xNCAwYzAtMS4xNTMuNDMzLTIuMjk0IDEtM2EyLjUgMi41IDAgMCAwIDIuNSAyLjV6Ii8+PC9zdmc+"
			},
		{
			name: "全部",
			icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXJlY2VpcHQtdGV4dC1pY29uIGx1Y2lkZS1yZWNlaXB0LXRleHQiPjxwYXRoIGQ9Ik00IDJ2MjBsMi0xIDIgMSAyLTEgMiAxIDItMSAyIDEgMi0xIDIgMVYybC0yIDEtMi0xLTIgMS0yLTEtMiAxLTItMS0yIDFaIi8+PHBhdGggZD0iTTE0IDhIOCIvPjxwYXRoIGQ9Ik0xNiAxMkg4Ii8+PHBhdGggZD0iTTEzIDE2SDgiLz48L3N2Zz4="
		},
		{
			name: "心理讲座",
			icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXByZXNlbnRhdGlvbi1pY29uIGx1Y2lkZS1wcmVzZW50YXRpb24iPjxwYXRoIGQ9Ik0yIDNoMjAiLz48cGF0aCBkPSJNMjEgM3YxMWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlYzIi8+PHBhdGggZD0ibTcgMjEgNS01IDUgNSIvPjwvc3ZnPg=="
		},
		{
			name: "户外体验",
			icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRlbnQtdHJlZS1pY29uIGx1Y2lkZS10ZW50LXRyZWUiPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIyIi8+PHBhdGggZD0ibTE0IDUgMy0zIDMgMyIvPjxwYXRoIGQ9Im0xNCAxMCAzLTMgMyAzIi8+PHBhdGggZD0iTTE3IDE0VjIiLz48cGF0aCBkPSJNMTcgMTRIN2wtNSA4aDIwWiIvPjxwYXRoIGQ9Ik04IDE0djgiLz48cGF0aCBkPSJtOSAxNCA1IDgiLz48L3N2Zz4="
		},
		{
			name: "情绪减压",
			icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhYnktaWNvbiBsdWNpZGUtYmFieSI+PHBhdGggZD0iTTEwIDE2Yy41LjMgMS4yLjUgMiAuNXMxLjUtLjIgMi0uNSIvPjxwYXRoIGQ9Ik0xNSAxMmguMDEiLz48cGF0aCBkPSJNMTkuMzggNi44MTNBOSA5IDAgMCAxIDIwLjggMTAuMmEyIDIgMCAwIDEgMCAzLjYgOSA5IDAgMCAxLTE3LjYgMCAyIDIgMCAwIDEgMC0zLjZBOSA5IDAgMCAxIDEyIDNjMiAwIDMuNSAxLjEgMy41IDIuNXMtLjkgMi41LTIgMi41Yy0uOCAwLTEuNS0uNC0xLjUtMSIvPjxwYXRoIGQ9Ik05IDEyaC4wMSIvPjwvc3ZnPg=="
		},
		{
			name: "艺术疗愈",
			icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhbGV0dGUtaWNvbiBsdWNpZGUtcGFsZXR0ZSI+PHBhdGggZD0iTTEyIDIyYTEgMSAwIDAgMSAwLTIwIDEwIDkgMCAwIDEgMTAgOSA1IDUgMCAwIDEtNSA1aC0yLjI1YTEuNzUgMS43NSAwIDAgMC0xLjQgMi44bC4zLjRhMS43NSAxLjc1IDAgMCAxLTEuNCAyLjh6Ii8+PGNpcmNsZSBjeD0iMTMuNSIgY3k9IjYuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxMC41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIi8+PGNpcmNsZSBjeD0iNi41IiBjeT0iMTIuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjcuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg=="
		},
		{
			name: "志愿服务",
			icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhhbmQtaGVhcnQtaWNvbiBsdWNpZGUtaGFuZC1oZWFydCI+PHBhdGggZD0iTTExIDE0aDJhMiAyIDAgMSAwIDAtNGgtM2MtLjYgMC0xLjEuMi0xLjQuNkwzIDE2Ii8+PHBhdGggZD0ibTcgMjAgMS42LTEuNGMuMy0uNC44LS42IDEuNC0uNmg0YzEuMSAwIDIuMS0uNCAyLjgtMS4ybDQuNi00LjRhMiAyIDAgMCAwLTIuNzUtMi45MWwtNC4yIDMuOSIvPjxwYXRoIGQ9Im0yIDE1IDYgNiIvPjxwYXRoIGQ9Ik0xOS41IDguNWMuNy0uNyAxLjUtMS42IDEuNS0yLjdBMi43MyAyLjczIDAgMCAwIDE2IDRhMi43OCAyLjc4IDAgMCAwLTUgMS44YzAgMS4yLjggMiAxLjUgMi44TDE2IDEyWiIvPjwvc3ZnPg=="
		}
	]

	const typeIdx = ref(0)

	const searchVal = ref('')
	const activeId = ref(null)

	const banners = [
		"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
		"https://picsum.photos/seed/banner1/600/260",
		"https://picsum.photos/seed/banner2/600/260"
	]

	function onSearch() {}

	function onTypeSelect(idx) {
		typeIdx.value = idx
	}
	const filteredActivities = computed(() => {
		let acts = activities
		if (typeIdx.value !== 0) acts = acts.filter(a => a.type === activityTypes[typeIdx.value].name)
		if (searchVal.value) acts = acts.filter(a => a.title.includes(searchVal.value) || a.subTitle.includes(
			searchVal.value))
		return acts
	})

	function goDetail(item) {
		uni.navigateTo({
			url: '/pages/activity/activityDetail?id=' + item.id
		})
	}

	function onSignup(item) {
		uni.showModal({
		  title: '确认报名',
		  content: `确定要报名参加「${item.title}」吗？`,
		  confirmText: '确认报名',
		  cancelText: '再想想',
		  success: (res) => {
		    if (res.confirm) {
		      uni.showToast({
		        title: '报名成功',
		        icon: 'success'
		      })
		    }
		  }
		})
	}
	
	
	
</script>

<style scoped>
	.activity-page-bg {
		min-height: 100vh;
		background: linear-gradient(180deg, #FFD9A0 0%, #FFF6ED 100%);
		padding-bottom: 36rpx;
	}

	.header-search-wrap {
		width: 100%;
		padding: 28rpx 0 14rpx 0;
		display: flex;
		justify-content: center;
		background: transparent;
	}

	.header-search-bar {
		width: 90vw;
		max-width: 700rpx;
		height: 64rpx;
		background: #fff;
		border-radius: 34rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 4rpx 16rpx #ffe3b3;
		padding: 0 22rpx;
		font-size: 29rpx;
	}

	.type-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.iconfont {
		font-family: "iconfont";
		color: #bbb;
		font-size: 30rpx;
	}

	.scan-icon {
		margin-left: 10rpx;
		color: #bdbdbd;
		font-size: 32rpx;
	}

	.search-input {
		flex: 1;
		border: none;
		outline: none;
		background: none;
		font-size: 30rpx;
		color: #222;
		margin-left: 10rpx;
	}

	.type-grid {
		width: 96vw;
		margin: 0 auto 12rpx auto;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12rpx 0;
		background: none;
	}

	.type-grid-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 12rpx 0;
		border-radius: 16rpx;
		transition: background 0.15s;
	}

	.type-grid-item.active {
		background: #FFF5E0;
		box-shadow: 0 4rpx 14rpx #fff2e0;
	}

	.type-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 4rpx;
	}

	.type-label {
		font-size: 22rpx;
		color: #FF9100;
		font-weight: 500;
	}

	.banner-swiper {
		width: 94vw;
		height: 340rpx;
		border-radius: 28rpx;
		margin: 8rpx auto 18rpx auto;
		overflow: hidden;
		box-shadow: 0 6rpx 26rpx #ffefcc;
		background: #fff;
	}

	.banner-img {
		width: 100%;
		height: 100%;
		border-radius: 28rpx;
		object-fit: cover;
		display: block;
	}

	/* 活动卡片等样式用之前那套即可... */
	.activity-list {
		margin-top: 4rpx;
		display: flex;
		flex-direction: column;
		gap: 26rpx;
		padding: 8rpx 0 40rpx 0;
	}

	.activity-card {
		display: flex;
		flex-direction: row;
		background: #fff;
		border-radius: 22rpx;
		box-shadow: 0 6rpx 24rpx rgba(160, 160, 160, 0.08);
		margin: 0 18rpx;
		min-height: 162rpx;
		align-items: stretch;
		position: relative;
		transition: transform 0.13s, box-shadow 0.13s;
	}

	.activity-card.active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 12rpx rgba(140, 140, 140, 0.10);
	}

	.img-block {
		width: 128rpx;
		min-width: 128rpx;
		height: 140rpx;
		position: relative;
		overflow: hidden;
		border-radius: 18rpx 0 0 18rpx;
		background: #f3f3f3;
		margin: 14rpx 0 14rpx 14rpx;
	}

	.cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 18rpx 0 0 18rpx;
	}

	.card-tag {
		position: absolute;
		top: 8rpx;
		left: 10rpx;
		color: #fff;
		font-size: 22rpx;
		font-weight: bold;
		padding: 2rpx 14rpx;
		border-radius: 10rpx;
		opacity: 0.97;
		letter-spacing: 1rpx;
		box-shadow: 0 2rpx 8rpx rgba(255, 169, 64, 0.10);
	}

	.content-block {
		flex: 1;
		padding: 13rpx 13rpx 8rpx 13rpx;
		display: flex;
		flex-direction: column;
		min-width: 0;
		justify-content: stretch;
	}

	.main-title {
		font-size: 30rpx;
		color: #222;
		font-weight: bold;
		line-height: 1.25;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 2rpx;
	}

	.sub-title {
		font-size: 22rpx;
		color: #666;
		margin-bottom: 7rpx;
		line-height: 1.1;
		font-weight: 500;
	}

	.info-row {
		display: flex;
		align-items: center;
		font-size: 23rpx;
		color: #8c8c8c;
		margin-bottom: 2rpx;
	}

	.info-icon {
		margin-right: 2rpx;
	}

	.info-txt {
		color: #888;
	}

	.split {
		color: #d3d3d3;
		margin: 0 7rpx;
	}

	.club-row {
		display: flex;
		align-items: center;
		margin-top: 2rpx;
		margin-bottom: 3rpx;
	}

	.club-avatar {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 1rpx solid #f1f1f1;
		margin-right: 7rpx;
		vertical-align: middle;
	}

	.club-name {
		font-size: 22rpx;
		color: #8a7b7b;
		vertical-align: middle;
		font-weight: 500;
		margin-right: 10rpx;
	}

	.audience-tag {
		background: #FFF2DD;
		color: #FFA940;
		border-radius: 8rpx;
		font-size: 20rpx;
		padding: 2rpx 10rpx;
		margin-left: 6rpx;
	}

	.bottom-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 8rpx;
	}

	.avatars {
		display: flex;
		align-items: center;
	}

	.avatar-img {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 2rpx solid #fff;
		margin-right: -8rpx;
		box-shadow: 0 2rpx 6rpx rgba(200, 200, 200, 0.09);
	}

	.joined {
		font-size: 20rpx;
		color: #39d368;
		margin-left: 10rpx;
		background: #eaffea;
		border-radius: 8rpx;
		padding: 1rpx 8rpx;
	}

	.signup-btn {
		background: #FFA940;
		color: #fff;
		font-size: 24rpx;
		border-radius: 14rpx;
		padding: 0 22rpx;
		font-weight: 600;
		height: 44rpx;
		line-height: 44rpx;
		border: none;
		box-shadow: 0 2rpx 10rpx rgba(140, 140, 140, 0.08);
	}

	.signup-btn:active {
		background: #FFB866;
	}

	.empty-tips {
		width: 100%;
		text-align: center;
		margin-top: 80rpx;
		color: #bbb;
		font-size: 26rpx;
	}

	.empty-img {
		width: 160rpx;
		height: 120rpx;
		display: block;
		margin: 0 auto 14rpx;
		opacity: 0.7;
	}
</style>