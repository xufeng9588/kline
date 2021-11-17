// const echarts = require('echarts');
// const request =  require('request');
// const jsdom = require('jsdom');
// const JSDOM = jsdom.JSDOM
const fetch = require('node-fetch');


fetch('https://api.binance.com/api/v1/exchangeInfo', {
    method: 'get',
}).then(response => response.json()
    .then(data => console.log(data)));
// // 基于准备好的dom，初始化echarts实例
// var document = new JSDOM(body).window.document;
// var myChart = echarts.init(document.getElementById('main'));
// // 绘制图表
// myChart.setOption({
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// });