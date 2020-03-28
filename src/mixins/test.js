

export default {
  data: {
    timer: null,
    a: 0,
    duration: 180000
  },
  methods: {
    // 定时器 (控制频繁操作)
    interval(time = 10000) {
      this.timer = setInterval(() => {
        a = 0
        if (time === this.duration) {
          clearInterval(this.timer)
          interval(10000)
        }
      }, time)
    },
    // axios请求
    axios(url, options = {}) {
      // (this.a === 0) && this.interval()
      // this.a++
      // if (this.a > 30) {
      //   clearInterval(this.timer)
      //   this.interval(this.duration)
      //   return wx.showToast({ title: `操作频繁,请3分钟后再试`, icon: 'none', duration: this.duration, mask: true })
      // }

      // 公共路径部分
      // const BASE_URl = 'https://ezhenmai.com:7011/app/register/';
      // const BASE_URl = 'http://192.168.1.43:8085/app/register/';
      const BASE_URl = 'http://192.168.1.46:8085/app/register/';
      let method = "get";
      let arr = Object.keys(options)
      if (typeof url === "string") {
        options.url = url
      }
      if (typeof url === "object") {
        options = url
        method = "post"
      }
      if (arr.length > 0) {
        method = "post"
      }
      // 返回一个小程序的请求方式  （wx.request）
      return new Promise((resolve, reject) => {
        wx.request({
          url: BASE_URl + options.url,
          method,
          data: options.data || {},
          success(res) {
            resolve(res.data)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    },
    // 日期格式化
    dealDate(a) {
      return a.substr(0, 4) + "-" + a.substr(4, 2) + "-" + a.substr(6, 2)
    },
    // 获取星期几
    getWhatDay(date) {
      date = new Date(date)
      let week;
      switch (date.getDay()) {
        case 0: return week = "周日"
        case 1: return week = "周一"
        case 2: return week = "周二"
        case 3: return week = "周三"
        case 4: return week = "周四"
        case 5: return week = "周五"
        case 6: return week = "周六"
        default: return week
      }
    }

  },
  created() {
  }
}
