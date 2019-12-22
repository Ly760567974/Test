Page({
  data: {menber:"",
    Fid: "", isfingerPrint: false,
    isfacial: false,},
    put1:function(res){
var number=res.detail.value;
this.setData({
  menber:number,
})
    },
  onLoad: function (options) {
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
        console.log(res);
        var string = res.resultJSON;
        var content = JSON.parse(string);
        var number = content.fid;
        that.setData({
          Fid:number
        })
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
  tap1:function(){var menber=this.data.menber;
  var Fid=this.data.Fid;
  var that=this;
    var db=wx.cloud.database();
switch(menber){
  case "2019210614":{db.collection("Fid1").add({
    data:{
      Fid:Fid
    }
  }); wx.showModal({
    title: '',
    content: '更新成功',
    showCancel: false
  });break;}
  case "2019210615":{
    db.collection("Fid2").add({
      data:{
        Fid:Fid
      }
    });
    wx.showModal({
      title: '',
      content: '更新成功',
      showCancel:false
    });
    break;
  }
  case "2019210616": {
    db.collection("Fid3").add({
      data: {
        Fid: Fid
      }
    });
    wx.showModal({
      title: '',
      content: '更新成功',
      showCancel: false
    }); break;
  }
  case "2019210617": {
    db.collection("Fid4").add({
      data: {
        Fid: Fid
      }
    });
    wx.showModal({
      title: '',
      content: '更新成功',
      showCancel: false
    }); break;
  }
  default:{
    wx.showModal({
      title: '',
      content: '输入的学号错误',
      showCancel:false
    });break;
  }
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