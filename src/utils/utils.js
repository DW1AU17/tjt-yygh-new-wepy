// let a = 0;
// // 定时器 (控制频繁操作)
// let timer;
// let duration = 180000;
// function interval(time = 10000 ) {
//   timer = setInterval(() => {
//     a = 0
//     if (time === duration) {
//       clearInterval(timer)
//       interval(10000)
//     }
//   }, time)
// }

// 获取明天时间, 并算出之后一段时间的日期
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + 1
  return [year,month, day].map(formatNumber).join('-') 
 
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getDates(days, todate = formatDate(new Date())) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
let id = 1; 
function dateLater(dates, later) {
  let dateObj = {id:id++};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = month + '-' + dayFormate;
  dateObj.week = show_day[day];
  dateObj.searchDate = yearDate+''+ month +''+ dayFormate;
  return dateObj;
}


// 日期比较, 判断是否为之前的数据
function isHistory(compareDate) {
  let now = new Date()
  let currentDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() // 当前日期
  let currentDayTimestamp = new Date(`${currentDate} 00:00:00`).getTime() // 当日时间戳
  let compareTimestamp = new Date(compareDate).getTime() // 比较日期的时间戳
  // 历史数据 返回true 
  if (compareTimestamp < currentDayTimestamp) return true
  return false
}

// 处理身份证号, 手机号
function handleNum(num) {
  if (num.length === 11) {
    return num.slice(0,3) + '****' + num.slice(7)
  } else if (num.length === 18) {
    return num.slice(0,6) + '********' + num.slice(14)
  } else {
    return num
  }
}

// 获取默认就诊人
function defaultPerson() {
  if(wx.getStorageSync('userInfo')) {
    let personInfo = wx.getStorageSync('userInfo') || []
    let arr = []
    if (personInfo && personInfo.length > 0) {
      personInfo.forEach(item => {
        let obj = {
          ...item,
          patPhone: handleNum(item.patPhone),
          patIdentityNum: handleNum(item.patIdentityNum)
        }
        arr.push(obj)
      })
      return arr
    }
  }
  return []
}

// 提示框
function showToast(msg, time = 2000, icon) {
  wx.showToast({
    title: msg,
    icon: icon,
    duration: time
  });
}

export {
  isHistory,
  getDates,
  handleNum,
  defaultPerson,
  showToast
}