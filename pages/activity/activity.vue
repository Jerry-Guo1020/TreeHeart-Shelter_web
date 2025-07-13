<template>
	<view class="activity-page-bg">
		<!-- 搜索栏 -->
		<view class="header-search-wrap">
			<view class="header-search-bar">
				<text class="iconfont">&#xe651;</text>
				<input class="search-input" v-model="searchVal" placeholder="搜索心理活动/俱乐部/关键字" @input="onSearch" />
				<text class="iconfont scan-icon">&#xe614;</text>
			</view>
		</view>

		<!-- 九宫格活动类型选择 -->
		<view class="type-grid">
			<view v-for="(type, idx) in activityTypes" :key="type.name" class="type-grid-item"
				:class="{ active: typeIdx === idx }" @tap="onTypeSelect(idx)">
				<image :src="type.icon" class="type-icon" />
				<text class="type-label">{{ type.name }}</text>
			</view>
		</view>

		<!-- 大轮播图 -->
		<swiper class="banner-swiper" :indicator-dots="true" :autoplay="true" interval="2800" circular>
			<swiper-item v-for="(img, idx) in banners" :key="idx">
				<image :src="img" class="banner-img" mode="aspectFill" />
			</swiper-item>
		</swiper>

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

	// 1. 九宫格活动类型
	const activityTypes = [{
			name: "全部",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type0.png"
		},
		{
			name: "团体辅导",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type1.png"
		},
		{
			name: "心理讲座",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type2.png"
		},
		{
			name: "心理游戏",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type3.png"
		},
		{
			name: "户外体验",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type4.png"
		},
		{
			name: "成长训练",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type5.png"
		},
		{
			name: "情绪减压",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type6.png"
		},
		{
			name: "艺术疗愈",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type7.png"
		},
		{
			name: "亲子活动",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type8.png"
		},
		{
			name: "志愿服务",
			icon: "https://cdn.jsdelivr.net/gh/jerry-guo-static/assets/type9.png"
		},
	]
	const typeIdx = ref(0) // 默认选中“全部”

	const searchVal = ref('');
	const activeId = ref(null)

	// 2. 轮播banner
	const banners = [
		'http://43.142.21.211:3000/static/banner-psy.png', 
		'http://43.142.21.211:3000/static/banner-psy.png',
		'http://43.142.21.211:3000/static/banner-psy.png',
		'http://43.142.21.211:3000/static/activity-2.jpg'
	]

	// 3. 十个活动数据，覆盖所有类型
	const activities = ref([{
			id: 1,
			tag: '进行中',
			tagColor: '#FFA940',
			cover: 'http://43.142.21.211:3000/static/activity-1.jpg',
			title: '团体成长辅导营',
			subTitle: '团队共成长',
			time: '07.10 09:00-11:30',
			place: '心理中心A区',
			clubAvatar: '/static/club1.png',
			clubName: '成长俱乐部',
			audience: '18岁+',
			avatars: ['/static/avatar1.png', '/static/avatar2.png'],
			joined: '18/30',
			type: '团体辅导'
		},
		{
			id: 2,
			tag: '优选推荐',
			tagColor: '#FFD77B',
			cover: 'http://43.142.21.211:3000/static/activity-2.jpg',
			title: '自信心提升讲座',
			subTitle: '激发自信表达',
			time: '07.15 14:00-15:30',
			place: '报告厅',
			clubAvatar: '/static/club2.png',
			clubName: '阳光心理团',
			audience: '不限',
			avatars: ['/static/avatar3.png'],
			joined: '12/40',
			type: '心理讲座'
		},
		{
			id: 3,
			tag: '火热招募',
			tagColor: '#FF7C6A',
			cover: 'http://43.142.21.211:3000/static/activity-3.jpg',
			title: '心理剧互动游戏',
			subTitle: '解锁趣味角色',
			time: '07.20 15:00-17:00',
			place: '活动室B',
			clubAvatar: '/static/club3.png',
			clubName: '温暖之家',
			audience: '女生优先',
			avatars: ['/static/avatar2.png'],
			joined: '19/30',
			type: '心理游戏'
		},
		{
			id: 4,
			tag: '优选推荐',
			tagColor: '#FFD77B',
			cover: 'http://43.142.21.211:3000/static/activity-2.jpg',
			title: '户外心理拓展',
			subTitle: '自然疗愈体验',
			time: '07.25 09:30-17:00',
			place: '森林公园',
			clubAvatar: '/static/club1.png',
			clubName: '成长俱乐部',
			audience: '不限年龄',
			avatars: ['/static/avatar1.png'],
			joined: '30/40',
			type: '户外体验'
		},
		{
			id: 5,
			tag: '火热招募',
			tagColor: '#FF7C6A',
			cover: 'http://43.142.21.211:3000/static/activity-1.jpg',
			title: '积极心理成长训练',
			subTitle: '自我探索',
			time: '07.22 10:00-12:00',
			place: '成长坊202',
			clubAvatar: '/static/club2.png',
			clubName: '阳光心理团',
			audience: '限新生',
			avatars: ['/static/avatar4.png'],
			joined: '15/20',
			type: '成长训练'
		},
		{
			id: 6,
			tag: '进行中',
			tagColor: '#FFA940',
			cover: 'http://43.142.21.211:3000/static/activity-3.jpg',
			title: '情绪减压团体',
			subTitle: '一起释放压力',
			time: '07.30 19:00-21:00',
			place: '心理中心B区',
			clubAvatar: '/static/club1.png',
			clubName: '成长俱乐部',
			audience: '18岁+',
			avatars: ['/static/avatar3.png'],
			joined: '10/24',
			type: '情绪减压'
		},
		{
			id: 7,
			tag: '优选推荐',
			tagColor: '#FFD77B',
			cover: 'http://43.142.21.211:3000/static/activity-2.jpg',
			title: '绘画艺术疗愈',
			subTitle: '艺术助力心灵',
			time: '08.02 15:30-17:30',
			place: '艺术教室',
			clubAvatar: '/static/club2.png',
			clubName: '阳光心理团',
			audience: '不限',
			avatars: ['/static/avatar2.png'],
			joined: '22/30',
			type: '艺术疗愈'
		},
		{
			id: 8,
			tag: '进行中',
			tagColor: '#FFA940',
			cover: 'http://43.142.21.211:3000/static/activity-1.jpg',
			title: '亲子心理互动营',
			subTitle: '亲子共成长',
			time: '08.10 09:00-12:00',
			place: '多功能厅',
			clubAvatar: '/static/club3.png',
			clubName: '温暖之家',
			audience: '家长&孩子',
			avatars: ['/static/avatar5.png'],
			joined: '25/35',
			type: '亲子活动'
		},
		{
			id: 9,
			tag: '火热招募',
			tagColor: '#FF7C6A',
			cover: 'http://43.142.21.211:3000/static/activity-3.jpg',
			title: '人际沟通训练营',
			subTitle: '提升沟通力',
			time: '08.15 10:00-12:00',
			place: '心理中心A区',
			clubAvatar: '/static/club1.png',
			clubName: '成长俱乐部',
			audience: '18岁+',
			avatars: ['/static/avatar1.png'],
			joined: '16/28',
			type: '人际社交'
		},
		{
			id: 10,
			tag: '优选推荐',
			tagColor: '#FFD77B',
			cover: 'http://43.142.21.211:3000/static/activity-2.jpg',
			title: '志愿者心理服务',
			subTitle: '助人亦自助',
			time: '08.20 13:30-16:00',
			place: '服务中心',
			clubAvatar: '/static/club2.png',
			clubName: '阳光心理团',
			audience: '志愿者',
			avatars: ['/static/avatar3.png'],
			joined: '12/25',
			type: '志愿服务'
		},
	])

	function onSearch() {}

	function onTypeSelect(idx) {
		typeIdx.value = idx
	}
	const filteredActivities = computed(() => {
		if (typeIdx.value === 0) return activities.value // 全部
		const typeName = activityTypes[typeIdx.value].name
		return activities.value.filter(a => a.type === typeName)
	})

	function goDetail(item) {
		uni.navigateTo({
			url: '/pages/activity/activityDetail?id=' + item.id
		})
	}

	function onSignup(item) {
		uni.showToast({
			title: '报名成功',
			icon: 'success'
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
		grid-template-columns: repeat(5, 1fr);
		gap: 12rpx 0;
		background: none;
	}

	.type-grid-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 8rpx 0;
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