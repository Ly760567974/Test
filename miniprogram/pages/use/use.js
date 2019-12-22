Page({
  data: {
    name: "",
    bool1: "",
    isfingerPrint: false,
    isfacial: false,
    bool2: "",
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
        var latitude = e.latitude;
        var longitude = e.longitude;
        console.log(latitude);
        console.log(longitude);
        if (latitude == "40.15774305555556" && longitude =="116.28945990668403") {
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
  }, onLoad: function (options) {
    var that = this

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
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '5',
      authContent: '请用指纹',
      success: function (res) {
        var string = res.resultJSON;
        var content = JSON.parse(string);
        var number = content.fid;
        console.log(number);
        if (number == "1753473545") {
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