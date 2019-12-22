Page({
  data:{number:"",
    menber1:"",
    menber2: "",
    menber3: "",
    menber4: "",
  },
  onLoad:function(){var that=this;
wx.cloud.callFunction({
  name:"callMenber1",
success:function(res){
  var menber1=res.result.data[0].number;console.log(menber1);
  that.setData({
    menber1:menber1
  })
}
});
    wx.cloud.callFunction({
      name: "callMenber2",
      success: function (res) {
        var menber2 = res.result.data[0].number;
        that.setData({
          menber2: menber2
        })
      }
    });
    wx.cloud.callFunction({
      name: "callMenber3",
      success: function (res) {
        var menber3 = res.result.data[0].number;
        that.setData({
          menber3: menber3
        })
      }
    });
    wx.cloud.callFunction({
      name: "callMenber4",
      success: function (res) {
        var menber4 = res.result.data[0].number;
        that.setData({
          menber4: menber4
        })
      }
    })
  },
  put1:function(res){
var number=res.detail.value;
this.setData({
  number:number
})
  },
  tap1:function(){
    var number=this.data.number;
    var menber1=this.data.menber1;
    var menber2 = this.data.menber2;
    var menber3 = this.data.menber3;
    var menber4 = this.data.menber4;
    if(number==menber1){
      wx.navigateTo({
        url: 'menber1/menber1',
      })
    }
    else if (number == menber2) {
      wx.navigateTo({
        url: 'menber2/menber2',
      })
    }
    else if (number == menber3) {
      wx.navigateTo({
        url: 'menber3/menber3',
      })
    }
    else if (number == menber4) {
      wx.navigateTo({
        url: 'menber4/menber4',
      })
    }
    else{
      wx.showModal({
        title: '',
        content: '输入学号错误',
        showCancel:false
      })
    }
  }
})