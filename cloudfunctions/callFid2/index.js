// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var db = cloud.database();
exports.main = async (event, context) => {
  return await db.collection("Fid2").get();
}