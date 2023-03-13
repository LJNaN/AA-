// pages/result.js
Page({
  data: {
    memberCount: 0,
    memberList: [],
    projectList: [],
    nameComputed: [],
    sum: 0,
    avg: 0
  },

  clickBack() {
    wx.navigateBack()
  },

  onLoad(options) {
    const {
      memberCount
    } = options
    let projectList = []

    projectList = JSON.parse(options.projectList)
    projectList.forEach(e => {
      e.value = Number(e.value)
    })
    projectList = projectList.filter(e => e.value > 0)

    const memberList = []
    const nameList = projectList.map(e => e.paidMemberId)
    for (let i = 0; i < nameList.length; i++) {
      memberList.push({
        id: nameList[i],
        value: 0,
        cast: 0,
        pai: []
      })
    }
    for (let i = 0; i < memberCount - nameList.length; i++) {
      memberList.push({
        id: '小伙伴' + (nameList.length + i + 1),
        value: 0,
        cast: 0,
        pai: []
      })
    }

    const sumNum = Number(projectList.map(e => e.value).reduce((prev, cur) => {
      return prev + cur
    })).toFixed(0)

    const avgNum = Number(sumNum / memberCount).toFixed(2)

    projectList.forEach(e => {
      const member = memberList.find(e2 => e2.id === e.paidMemberId)
      member.value = e.value
    })


    // const firstPaidMember = memberList.find(e => e.value != 0)
    const max = Math.max(...memberList.map(e => e.value))
    const firstPaidMember = memberList.find(e => e.value === max)

    memberList.forEach(e => {
      e.cast = avgNum - e.value
      if (!e.value) {
        e.pai.push({
          target: firstPaidMember.id,
          value: e.cast
        })
      }
    })

    projectList.forEach(e => {
      const member = memberList.find(e2 => e2.id === e.paidMemberId)
      if (member.id === firstPaidMember.id) return
      else {
        firstPaidMember.cast += member.cast
        firstPaidMember.pai.push({
          target: member.id,
          value: -member.cast
        })
        member.cast = 0
      }
    })

    const firstShouArr = []

    memberList.forEach(e => {
      e.pai.forEach(e2 => {
        if (e2.target === firstPaidMember.id) {
          firstShouArr.push(e2)
        }
      })
    })

    memberList.forEach(e => {
      e.pai.forEach(e2 => {
        e2.value = Number(e2.value.toFixed(2))
      })
      e.pai = e.pai.filter(e2 => e2.value)
    })

    firstShouArr.forEach(e => {
      firstPaidMember.pai.forEach(e2 => {
        if (e.value === e2.value) {
          e.target = e2.target
          const index = firstPaidMember.pai.findIndex(e3 => e3.target === e2.target)
          firstPaidMember.pai.splice(index, 1)
        }
      })
    })


    this.setData({
      memberCount,
      projectList,
      memberList,
      sum: sumNum,
      avg: avgNum
    })
  }
})