// pages/list/list.js
const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

Page({
  data: {
    weekWeather: [],
    city: "广州市"
  },
  onPullDownRefresh() {
    this.getWeekWeather(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad(options) {
    console.log('OnLoad l')
    this.setData({
      city: options.city
    })
    this.getWeekWeather()
  },

  getWeekWeather(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: this.data.city,
        time: new Date().getTime()
      },
      success: res => {
        let result = res.data.result
        let weekWeather = []
        for(let i = 0; i < 7; i++){
          let date = new Date()
          date.setDate(date.getDate() + i)
          weekWeather.push({
            day: dayMap[date.getDay()],
            date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            iconPath: "/images/" + result[i].weather + "-icon.png",
            temp: result[i].minTemp + "°-" + result[i].maxTemp + "°",
          })
        }
        this.setData({
          weekWeather : weekWeather
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }
})