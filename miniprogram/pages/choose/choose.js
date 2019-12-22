Page({
  data:{number:"",
  password:""},
  onLoad:function(){var that=this;
    wx.cloud.callFunction({
      name:"callpassWord",
      success:function(res){
        console.log(res);
        var password = res.result.data[res.result.data.length-1].password;
        that.setData({
          password:password
        })
      }
    })
  },
  change1:function(e){
var number=e.detail.value;
this.setData({
number:number
})
  },
  tap1:function(){var number=this.data.number;
  var password=this.data.password;
    if(number==password){
    wx.navigateTo({
      url: '../master/master',
    })
  }
  else{
    wx.showModal({
      title: '',
      content: '输入错误',
      showCancel:false,
    })
  }
  }
})