// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var yun=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
return await yun.collection("password").get();
}