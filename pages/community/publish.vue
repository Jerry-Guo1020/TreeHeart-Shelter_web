<template>
  <view class="container">
    <!-- 页面头部 -->
    <view class="page-header">
      <text class="page-title">发布帖子</text>
      <text class="page-subtitle">分享你的想法、经验或问题与社区成员交流</text>
    </view>

    <!-- 发布表单卡片 -->
    <view class="publish-card">
      <!-- 顶部编辑图标 -->
      <view class="edit-icon-wrapper">
        <view class="edit-icon">
          <text class="icon-pen">✍️</text>
        </view>
      </view>

      <!-- 发布身份 -->
      <view class="publisher-info">
        <image :src="userInfo.avatar" class="publisher-avatar" />
        <view class="publisher-details">
          <text class="publisher-name">{{ userInfo.nickname }}</text>
          <text class="publisher-role">{{ userInfo.role }}</text>
        </view>
      </view>

      <!-- 标题输入 -->
      <view class="form-item">
        <text class="label">标题 (可选)</text>
        <input
          v-model="postTitle"
          class="input-field"
          placeholder="请输入标题 (可选)"
          placeholder-class="placeholder-style"
          maxlength="50"
          confirm-type="done"
        />
      </view>

      <!-- 内容输入 -->
      <view class="form-item">
        <text class="label required">内容</text>
        <textarea
          v-model="postContent"
          class="textarea-field"
          placeholder="分享你的想法..."
          placeholder-class="placeholder-style"
          auto-height
          maxlength="500"
        />
      </view>

      <!-- 标签选择 -->
      <view class="form-item">
        <view class="label-with-action">
          <text class="label">标签</text>
          <view class="action-button" @click="showTagPicker">
            <text class="icon-tag">🔖</text>
            <text>选择标签</text>
          </view>
        </view>
        <view class="tag-display-field" @click="showTagPicker">
          <text v-if="selectedTagName">{{ selectedTagName }}</text>
          <text v-else class="placeholder-style">未选择标签</text>
        </view>
      </view>

      <!-- 图片添加 -->
      <view class="form-item">
        <text class="label">图片</text>
        <view class="image-upload-container">
          <view class="image-preview-list">
            <view v-for="(img, index) in images" :key="index" class="image-preview-item">
              <image :src="img.url" mode="aspectFill" class="uploaded-image" />
              <view class="delete-image" @click.stop="deleteImage(index)">×</view>
            </view>
            <view v-if="images.length < 9" class="image-upload-area" @click="chooseImage">
              <text class="icon-image">🖼️</text>
              <text>添加图片</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作按钮 -->
      <view class="button-group">
        <button class="cancel-btn" @click="cancelPublish">取消</button>
        <button class="publish-btn" @click="submitPost">发布</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { publishPost, fetchPostTypes, uploadPostImage } from '@/api/community.js'
import { getCurrentUser } from '@/api/user.js'
import { base_url } from '@/api/config.js'

const postTitle = ref('')
const postContent = ref('')
const selectedTagId = ref(null)
const selectedTagName = ref('')
const images = ref([])

const userInfo = ref({
  avatar: '/static/avatar.png',
  nickname: '加载中...',
  role: '发布身份'
})
const currentUserId = ref(null)
const availableTags = ref([]) // [{id, name}]

onMounted(async () => {
  try {
    const resUser = await getCurrentUser()
    if (resUser && resUser.rows && resUser.rows.length) {
      const user = resUser.rows[0]
      userInfo.value.avatar = user.avatar || '/static/avatar.png'
      userInfo.value.nickname = user.nickname || '树洞用户'
      userInfo.value.role = '发布身份'
      currentUserId.value = user.openid || user.id
    }
  } catch (e) {
    console.error('获取用户信息失败', e)
  }

  try {
    const resTags = await fetchPostTypes()
    // 假设接口返回 rows: [{id:1, name:'学业压力'}, ...]
    if (resTags && resTags.rows && resTags.rows.length) {
      availableTags.value = resTags.rows
    }
  } catch (e) {
    console.error('获取标签失败', e)
  }
})

const chooseImage = () => {
  const openid = uni.getStorageSync('openid') // 你的 openid
  uni.chooseImage({
    count: 9 - images.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      res.tempFilePaths.forEach((filePath) => {
        uni.uploadFile({
          url: `https://open.apisql.cn/api/tree_api/postimg`, // apisql 配的上传图片接口
          filePath,
          name: 'file', // apisql 里写的 file 字段，必须是 file
          formData: {
            browser: 'miniprogram',   // 你要存数据库的其它字段
            status: 'uploaded'
          },
          header: {
            Authorization: openid     // 直接 header 里带 openid
          },
          success: (uploadRes) => {
            let data = {};
            try {
              data = JSON.parse(uploadRes.data)
            } catch (e) {
              uni.showToast({ title: '上传响应格式错误', icon: 'none' })
              return
            }
            if (data.code === 200 || data.code === 0) {
              images.value.push({
                url: data.data.url || data.data.uri, // 你 SQL 返回的图片链接字段
                imgId: data.data.imgId || data.data.id
              })
            } else {
              uni.showToast({ title: data.message || '上传失败', icon: 'none' })
            }
          },
          fail: () => {
            uni.showToast({ title: '上传失败', icon: 'none' })
          }
        })
      })
    }
  })
}


const deleteImage = (index) => {
  images.value.splice(index, 1)
}

const showTagPicker = () => {
  if (!availableTags.value.length) {
    uni.showToast({ title: '暂无标签', icon: 'none' })
    return
  }
  uni.showActionSheet({
    itemList: availableTags.value.map(t => t.name),
    success: (res) => {
      const tag = availableTags.value[res.tapIndex]
      selectedTagId.value = tag.id
      selectedTagName.value = tag.name
    }
  })
}

const cancelPublish = () => {
  uni.navigateBack()
}

const submitPost = async () => {
  if (!postContent.value.trim()) {
    uni.showToast({ title: '内容不能为空', icon: 'none' })
    return
  }
  if (!selectedTagId.value) {
    uni.showToast({ title: '请选择标签', icon: 'none' })
    return
  }
  if (!currentUserId.value) {
    uni.showToast({ title: '用户未登录', icon: 'none' })
    return
  }
  if (postTitle.value.length > 50) {
    uni.showToast({ title: '标题最长50字', icon: 'none' })
    return
  }
  const postData = {
    uid: currentUserId.value,
    typeId: Number(selectedTagId.value),
    title: postTitle.value,
    content: postContent.value,
    imgId: images.value.length > 0 ? images.value[0].imgId : null
  }
  if (postData.imgId === '' || postData.imgId === undefined) postData.imgId = null

  console.log('发布参数', postData)
  try {
    const res = await publishPost(postData)
    console.log('发布接口返回', res)
    // ======== 适配你 apisql 的实际返回格式 =========
    if (
      (res && res.info && res.info.affectedRows === 1) ||
      (res && res.meta && res.meta.affectedRows === 1)
    ) {
      uni.showToast({ title: '发布成功', icon: 'success' })
      postTitle.value = ''
      postContent.value = ''
      selectedTagId.value = null
      selectedTagName.value = ''
      images.value = []
      setTimeout(() => {
        uni.navigateBack()
      }, 800)
    } else {
      uni.showToast({ title: res.msg || '发布失败', icon: 'none' })
    }
  } catch (e) {
    uni.showToast({ title: '发布失败', icon: 'none' })
  }
}
</script>

<style scoped>
.container {
  padding: 30rpx;
  background: linear-gradient(180deg, #ffe3bb 0%, #fff7ec 100%);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 40rpx;
}

.page-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.page-subtitle {
  font-size: 28rpx;
  color: #666;
}

.publish-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.edit-icon-wrapper {
  position: absolute;
  top: -20rpx;
  right: 30rpx;
  width: 80rpx;
  height: 80rpx;
  background-color: #6a5acd; /* 紫色 */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5rpx 15rpx rgba(106, 90, 205, 0.4);
}

.edit-icon .icon-pen {
  font-size: 40rpx;
  color: #fff;
}

.publisher-info {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.publisher-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  border: 2rpx solid #eee;
}

.publisher-details {
  display: flex;
  flex-direction: column;
}

.publisher-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.publisher-role {
  font-size: 24rpx;
  color: #999;
}

.form-item {
  margin-bottom: 40rpx;
}

.label {
  font-size: 30rpx;
  color: #555;
  margin-bottom: 15rpx;
  display: block;
  font-weight: bold;
}

.label.required::after {
  content: ' *';
  color: #ff4d4f;
  margin-left: 5rpx;
}

.input-field {
  width: 100%;
  height: 80rpx;
  padding: 0 25rpx;
  font-size: 30rpx;
  border-radius: 16rpx;
  border: 1rpx solid #e0e0e0;
  box-sizing: border-box;
  background-color: #f9f9f9;
}

.textarea-field {
  width: 100%;
  min-height: 200rpx;
  padding: 25rpx;
  font-size: 30rpx;
  border-radius: 16rpx;
  border: 1rpx solid #e0e0e0;
  box-sizing: border-box;
  background-color: #f9f9f9;
  line-height: 1.6;
}

.placeholder-style {
  color: #bbb;
}

.label-with-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
}

.action-button {
  display: flex;
  align-items: center;
  background-color: #e6e6fa; /* 淡紫色 */
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  color: #6a5acd;
}

.action-button .icon-tag {
  margin-right: 10rpx;
  font-size: 30rpx;
}

.tag-display-field {
  width: 100%;
  min-height: 80rpx;
  padding: 0 25rpx;
  font-size: 30rpx;
  border-radius: 16rpx;
  border: 1rpx solid #e0e0e0;
  box-sizing: border-box;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  color: #333;
}

.image-upload-container {
  margin-top: 20rpx;
}

.image-preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-preview-item {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx;
  overflow: hidden;
  border: 1rpx solid #eee;
}

.uploaded-image {
  width: 100%;
  height: 100%;
}

.delete-image {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 50%;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  cursor: pointer;
  z-index: 10;
}

.image-upload-area {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed #ccc;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 28rpx;
  cursor: pointer;
  background-color: #f9f9f9;
}

.image-upload-area .icon-image {
  font-size: 60rpx;
  margin-bottom: 10rpx;
  color: #a0a0a0;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 60rpx;
}

.cancel-btn,
.publish-btn {
  flex: 1;
  height: 90rpx;
  border-radius: 50rpx;
  font-size: 34rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10rpx;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #666;
}

.publish-btn {
  background: linear-gradient(90deg, #FF9200 0%, #FA9FB4 100%);
  color: #fff;
}
</style>