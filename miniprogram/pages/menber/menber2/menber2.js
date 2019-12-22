Page({
  data: {
    Fid: "",
    name: "",
    bool1: "",
    isfingerPrint: false,
    isfacial: false,
    bool2: "",
  },
  onLoad: function (options) {
    var that = this;
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        console.log(res)
        for (var i in res.supportMode) {
          if (res.supportMode[i] == 'fingerPrint') {
            console.log("支持指纹识别", res.supportMode[i]);
            that.setData({
              isfingerPrint: true
            })
          } else if (res.supportMode[i] == 'facial') {
            console.log("支持人脸识别", res.supportMode[i]);
          }
        }
      }
    })
    wx.cloud.callFunction({
      name: "callFid2",
      success: function (res) {
        console.log(res);
        var Fid = res.result.data[res.result.data.length - 1].Fid;
        that.setData({
          Fid: Fid
        })
      },
      fail: function () {
        console.log("s");
      }
    })
  },
  tap1: function () {
    var that = this;
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (e) {
        console.log(e);
        var data = JSON.parse(e.rawData); console.log(data);
        var name = data.nickName;
        that.setData({
          name: name,
        })
      }
    })
  },
  tap2: function () {
    var that = this;
    wx.showModal({
      title: '请确定已打开定位',
      content: '请等待6秒',
    })
    wx.getLocation({
      type: "gcj02",
      altitude: "true",
      isHighAccuracy: true, highAccuracyExpireTime: 5000,
      success: function (e) {
        console.log(e);
        var latitude = parseFloat(e.latitude);
        var longitude = parseFloat(e.longitude);
        console.log(latitude);
        console.log(longitude);
        if (latitude > 40.0 && latitude < 40.2 && longitude > 116.0 && longitude < 116.3) {
          that.setData({
            bool1: "是"
          })
        }
        else {
          that.setData({
            bool1: "否"
          })
        }
      }
    })
  },
  // checkIsFingerPrint: function () {
  //   var boole = this.data.isfingerPrint
  //   var txt = "不可以使用指纹识别"
  //   if (boole) {
  //     txt = "可以使用指纹识别"
  //   }
  //   show("提示", txt, false);
  // },
  FingerPrint: function () {
    var that = this;
    var Fid = this.data.Fid;
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '5',
      authContent: '请用指纹',
      success: function (res) {
        var string = res.resultJSON;
        var content = JSON.parse(string);
        var number = content.fid;
        console.log(number);
        console.log(Fid);
        if (number == Fid) {
          that.setData({
            bool2: "是",
          })
        }
        else {
          that.setData({
            bool2: "否",
          })
        }
        console.log("识别成功", res)
        show("提示", "识别成功", false);
      },
      fail(res) {
        console.log("识别失败", res)
        show("提示", "识别失败", false);
      }
    })
  },
  HaveFingerPrint: function () {
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'fingerPrint',
      success(res) {
        if (res.isEnrolled == 1) {
          show("提示", "有指纹", false);
        } else if (res.isEnrolled == 0) {
          show("提示", "无指纹", false);
        }
      },
      fail(res) {
        show("提示", "异常", fail);
      }
    })
  },
  tap3: function () {
    var bool1 = this.data.bool1;
    var bool2 = this.data.bool2;
    var util = require("../util.js");
    var time = util.formatTime(new Date);
    if (bool1 == "是" && bool2 == "是") {
      var db = wx.cloud.database();
      db.collection("menber2").add({
        data: {
          time: time,
          dormitory: "331"
        },
        success: function () {
          wx.showModal({
            title: '哈哈',
            content: '签到成功',
            showCancel: false
          })
        },
        fail: function () {
          wx.showModal({
            title: '',
            content: '异常',
            showCancel: false
          })
        }
      })
    }
    else if (bool1 == "是" && bool2 != "是") {
      wx.showModal({
        title: "不可签到",
        content: "非本人指纹",
        showCancel: false
      })
    }
    else if (bool1 != "是" && bool2 == "是") {
      wx.showModal({
        title: "不可签到",
        content: "不在宿舍",
        showCancel: false
      })
    }
    else if (bool1 != "是" && bool2 != "是") {
      wx.showModal({
        title: "非本人",
        content: "不在宿舍",
        showCancel: false
      })
    }
  }
})
function show(tit, msg, q, succ, fail) {
  wx.showModal({
    title: tit,
    content: msg,
    showCancel: q,
    success: function (res) {
      if (res.confirm) {
        if (succ) {
          succ();
        }
      } else if (res.cancel) {
        if (fail) {
          fail();
        }
      }
    }
  })
}