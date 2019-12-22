Page({
  data:{
    calculator:[{menber:"2019210614",time:"",dormitory:"331"},
      {menber: "2019210615", time: "",dormitory:"331"},
  {menber: "2019210616", time: ""
,dormitory:"331"},
  {menber: "2019210617", time: "",dormitory:"331"},]
  },
  tap:function(){var that=this;
    wx.cloud.callFunction({
      name:"callMenber1",
      success:function(res){
        var TN = res.result.data[res.result.data.length-1];
        var time1=TN.time;
        var dormitory1=TN.dormitory;
        that.setData({
          "calculator[0].time": time1,
        }) }
    })
    wx.cloud.callFunction({
      name: "callMenber2",
      success: function (res) {
        var TN = res.result.data[res.result.data.length - 1];
        var time2 = TN.time;
        var dormitory1 = TN.dormitory;
        that.setData({
          "calculator[1].time": time2,
        })
      }
    })
    wx.cloud.callFunction({
      name: "callMenber3",
      success: function (res) {
        var TN = res.result.data[res.result.data.length - 1];
        var time3 = TN.time;
        var dormitory1 = TN.dormitory;
        that.setData({
          "calculator[2].time": time3,
        })
      }
    })
    wx.cloud.callFunction({
      name: "callMenber4",
      success: function (res) {
        var TN = res.result.data[res.result.data.length - 1];
        var time4 = TN.time;
        var dormitory1 = TN.dormitory;
        that.setData({
          "calculator[3].time": time4,
        })
      }
    })
  }
})