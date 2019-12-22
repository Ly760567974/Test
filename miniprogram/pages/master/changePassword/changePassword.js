Page({
  data:{
    Salt:"",
    Salt1:"",
    after:""
  },
  onLoad:function(){
    var that=this;
    wx.cloud.callFunction({
      name:"callSald",
      success:function(res){
        console.log(res);
        var Salt = res.result.data[res.result.data.length-1].Salt;
        that.setData({
          Salt:Salt
        })
      }
    })
  },
  change1:function(res){
    
   var Salt1=res.detail.value;
  this.setData({
Salt1:Salt1
  })
  },
  change2:function(res){
var after=res.detail.value;
this.setData({
  after:after
})
  },
  tap:function(){
    var Salt=this.data.Salt;
    var Salt1=this.data.Salt1;
    console.log(Salt);
    console.log(Salt1);
    var after=this.data.after;
    if(Salt1!=Salt){
      wx.showModal({
        title: '??',
        content: '输入真实身份错误',
        showCancel:false
      })
    }
    else{
      var db=wx.cloud.database();
      db.collection("password").add({
        data:{
          password:after
        },
        success:function(){
          wx.showModal({
            title: '哈哈哈',
            content: '修改成功',
            showCancel:false
          },
          )
        },
        fail:function(){
          wx.showModal({
            title: '111',
            content: '异常',
            showCancel:false
          })
        }
      }
     )
    }
  }
})