// index.js
// 获取应用实例
const app = getApp()

import vLog from "../../utils/vLog/index.js";

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		canIUseGetUserProfile: false,
		canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
	},
	// 事件处理函数
	bindViewTap() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad() {
		if (wx.getUserProfile){
			this.setData({
				canIUseGetUserProfile: true
			})
		}
	},

	onShow() {
		const that = this
		vLog.log('拥有console的所有用法')
		vLog.log('同console.log使用 不做上报')
		vLog.info('同console.info使用 不做上报')
		vLog.log('report start','第一个参数在控制台会有颜色输出').report()
		vLog.log('obj test ', {a: 1, b: 2, c: 3}).report()
		vLog.info('info', 1234, 'abc', that).report()
		vLog.warn('warn', 123, '警告').report()
		vLog.error('error', '错误').report()
		vLog.log(null)
		vLog.log(undefined)
		vLog.log(NaN)
	},
	getUserProfile(e) {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
			desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				console.log(res)
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		})
	},
	getUserInfo(e) {
		// 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
		console.log(e)
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})
