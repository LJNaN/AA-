// index.js
// 获取应用实例
const app = getApp()


Page({
  data: {
    memberCount: 4,
    projectList: []
  },

  clickComputed() {
    wx.navigateTo({
      url: `../result/result?memberCount=${this.data.memberCount}&projectList=${JSON.stringify(this.data.projectList)}`
    })
  },

  inputChange: function (e) {
    if(e.detail.value <= 0 ){
      wx.showModal({
        title: '?',
        content: '?',
        showCancel: false
      })
      this.setData({
        memberCount: 1
      })
      return
    }
    this.setData({
      memberCount: e.detail.value
    })
  },

  projectChange: function (e) {
    const type = e.currentTarget.dataset.type
    const index = e.currentTarget.dataset.index
    const temp = JSON.parse(JSON.stringify(this.data.projectList))
    let target = e.detail.value.replace(" ", "")


    if (type === 'money') {
      if (target < 0) {
        temp[index].value = 0
        this.setData({
          projectList: temp
        })
        wx.showModal({
          title: '?',
          content: '?',
          showCancel: false
        })
        return
      } else {
        temp[index].value = target
      }
    } else if (type === 'member') {
      temp[index].paidMemberId = target
    } else if (type === 'project') {
      temp[index].name = target
    }

    this.setData({
      projectList: temp
    })
  },

  jia: function () {
    const temp = JSON.parse(JSON.stringify(this.data.projectList))
    const last = temp[temp.length - 1]
    let newId = last.id + 1
    if (newId > this.data.memberCount) {
      newId = this.data.memberCount
    }
    temp.push({
      id: last.id + 1,
      name: '活动' + (last.id + 1),
      value: 100,
      paidMemberId: '小伙伴' + newId
    })
    this.setData({
      projectList: temp
    })
  },

  jian: function (e) {
    if (this.data.projectList.length - 1 === 0) {
      wx.showModal({
        title: '提示',
        content: '必须要有一个项目哦',
        showCancel: false
      })
      return
    }
    const index = e.currentTarget.dataset.index
    const temp = JSON.parse(JSON.stringify(this.data.projectList))
    temp.splice(index, 1)
    this.setData({
      projectList: temp
    })
  },

  onShareAppMessage: function () {
    return {
      title: "AA小助手",
      path: '/pages/index/index',
      imageUrl: '/assets/share.png'
    }
  },


  onShareTimeline: function () {
    return {
      title: 'AA小助手',
      path: '/pages/index/index',
      imageUrl: '/assets/share.png'
    }
  },

  onLoad() {
    this.setData({
      projectList: [{
        id: 1,
        name: '火锅',
        value: 320,
        paidMemberId: '提莫'
      }, {
        id: 2,
        name: '剧本杀',
        value: 380,
        paidMemberId: '亚索'
      }, {
        id: 3,
        name: '电影',
        value: 160,
        paidMemberId: '男刀'
      }]
    })
  },
})