<template>
	<view class="all">
		<!-- 顶部一张树洞照片 -->
		<view class="page">
			<image :src="BASE_URL +'/static/首页第一张.png'" class="top-image" mode="widthFix" />
		</view>

		<!-- 顶部标签区域 -->
		<view class="tags">
			<view class="tag_orange" @click="toxueyeyali">#学业压力</view>
			<view class="tag_pink">#情绪情感</view>
			<view class="tag_yellow">#人际交往</view>
			<view class="tag_purple">#职业规划</view>
			<view class="tag_blue">#生活适应</view>
			<view class="tag_green">#其他类型</view>
		</view>

		<view class="container">
			<!-- 动态卡片内容 -->
			<view class="card">
				<!-- 用户头像 -->
				<view class="user">
					<image :src="BASE_URL +'/static/头像.png'" class="user_logo" mode="aspectFill" />
					<view class="user_info">
						<view class="userName">大学生心理树洞</view>
						<view class="dateTime">2025年6月24日16:05:34</view>
					</view>
				</view>

				<!-- 基础信息 -->
				<view class="info">
					<view class="choiceTag">#情绪情感</view>
					<view class="title">六月心事，等你诉说~</view>
				</view>

				<!-- 内容 -->
				<view class="content">
					六月的风，吹来了蝉鸣与栀子花香，也吹进了每个人的心房。在这个充满活力与希望的月份，大学生心灵树洞向大家发起征稿啦!
					<br />
					无论是你在六月里邂逅的小美好--比如一场浪漫的雨后彩虹，一次和朋友的欢乐野餐还是那些藏在心底的小烦恼-一像是考试的压力，对未来方向的迷茫;
					亦或是你对六月独有的期许与展望……都欢迎分享给我们……
				</view>

				<view class="photo">
					<image src="@/static/image/1.jpg" class="contentPhoto" mode="widthFix" />
				</view>

				<!-- 点赞评论收藏 -->
				<view class="emogi">
					<text>🤍</text>
					<text>⭐</text>
				</view>

				<!-- 评论区 -->
				<view class="talking">
					<!-- 用户一 -->
					<view class="userTalking">
						<view class="userTalkingInfo">
							<image :src="BASE_URL +'/static/头像.png'" class="userTalkLogo" mode="aspectFill" />
							<view class="talkingUserName">陈树洞</view>
						</view>
						<view class="talkAbout">考完试我一定要去海边！！！</view>
						<view class="dateTime">2分钟前</view>
					</view>

					<!-- 用户二 -->
					<view class="userTalking">
						<view class="userTalkingInfo">
							<image :src="BASE_URL +'/static/头像.png'" class="userTalkLogo" mode="aspectFill" />
							<view class="talkingUserName">树小洞2025</view>
						</view>
						<view class="talkAbout">考完试我一定要去海边！！！</view>
						<view class="dateTime">2分钟前</view>
					</view>
				</view>
			</view>
		</view>
		<BottomNavbar :current="0" />
	</view>
</template>

<script setup>
	import BottomNavbar from '@/component/BottomNavbar/BottomNavbar.vue'
	import { BASE_URL } from '@/api/config.js'
	
	const toxueyeyali = () => {
		uni.navigateTo({ url: '/pages/personal/personInformation' })
	}
</script>

<style>
	.all {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		padding-bottom: calc(72px + env(safe-area-inset-bottom, 24px));
		
	}
	
	.container {
		
		
	}
	.page {
		width: auto;
		margin: 0 auto;
		padding-bottom: 10px;
	}

	.top-image {
		width: 100%;
		display: block;
		height: auto;
	}


	.tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 7px;
		gap: 25px;
		border-bottom: 1px solid #f6f6f6;
	}

	.tag_orange {
		border: none;
		border-radius: 20px;
		background-color: #ffdfbc;
		padding: 6px 12px;
		font-size: 14px;
		width: 20%;
		text-align: center;
		color: #ff7700;
		font-weight: bolder;
	}

	.tag_pink {
		border: none;
		border-radius: 50px;
		background-color: #ffcad8;
		padding: 6px 12px;
		font-size: 14px;
		width: 20%;
		text-align: center;
		color: #ff004d;
		font-weight: bolder;
	}

	.tag_yellow {
		border: none;
		border-radius: 50px;
		background-color: #fff4ce;
		padding: 6px 12px;
		font-size: 14px;
		width: 20%;
		text-align: center;
		color: #ffbd00;
		font-weight: bolder;
	}

	.tag_purple {
		border: none;
		border-radius: 50px;
		background-color: #e7cbff;
		padding: 6px 12px;
		font-size: 14px;
		width: 20%;
		text-align: center;
		color: #ae4fff;
		font-weight: bolder;
	}

	.tag_blue {
		border: none;
		border-radius: 50px;
		background-color: #ceedf7;
		padding: 6px 12px;
		font-size: 14px;
		width: 20%;
		text-align: center;
		color: #00a0e9;
		font-weight: bolder;
	}

	.tag_green {
		border: none;
		border-radius: 50px;
		background-color: #ddfed7;
		padding: 6px 12px;
		font-size: 14px;
		width: 20%;
		text-align: center;
		color: #7df625;
		font-weight: bolder;
	}

	.card {
		background-color: white;
		margin: 10px;
		padding: 20px;
		border-radius: 20px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
	}


	.user_logo {
		border-radius: 50px;
		width: 50px;
		height: 50px;
		border: 3px solid #4a9364;
		object-fit: cover;
		/* 确保照片不变形 */
	}

	.user {
		display: flex;
		align-items: center;
	}


	.user_info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 12px;

	}

	.userName {
		font-weight: bold;
		font-size: 14px;
		font-family: "AlimamaFangYuanTiVF Medium", sans-serif;
		color: #333;
		margin-bottom: 4px;
	}

	.dateTime {
		font-size: 9px;
		color: #888;
	}

	.info {
		margin-top: 6px;
		display: flex;
		align-items: center;
		/* 让两个元素在同一行垂直居中 */
		gap: 10px;
		/* 控制间距 */
		margin-bottom: 10px;
	}


	.choiceTag {
		display: inline-block;
		background-color: #f57fa0;
		color: white;
		padding: 4px 10px;
		border-radius: 20px;
		font-size: 8px;

	}

	.title {
		font-weight: bold;
		font-size: 8px;
		color: #333;
	}

	.content {
		font-size: 10px;
	}

	.contentPhoto {
		margin-top: 5px;
		width: 100%;
		display: block;
		height: auto;
	}

	.emogi {
		display: flex;
		justify-content: flex-end;
		margin: 10px;
	}

	.talking {
		background-color: #f2f2f2;
		border-radius: 8px;
	}

	.userTalkingInfo {
		display: flex;
		padding: 10px;

	}

	.userTalkLogo {
		border-radius: 50px;
		width: 20px;
		height: 20px;
		border: 2px solid #4a9364;
		object-fit: cover;
		/* 确保照片不变形 */
	}


	.talkingUserName {
		font-weight: bold;
		font-size: 14px;
		font-family: "AlimamaFangYuanTiVF Medium", sans-serif;
		color: #333;
		margin-bottom: 4px;
	}

	.talkAbout {
		margin-left: 10px;
	}

	.dateTime {
		margin-left: 10px;
	}
</style>