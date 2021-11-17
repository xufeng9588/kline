const axios = require('axios');
const _ = require('lodash');
const { config } = require('../config/index');
const async = require('async');
const await = require('await');
const echarts = require('echarts');
// const { GridComponent } = require('echarts/components');
// const { CandlestickChart } = require('echarts/charts');
// const { CanvasRenderer } = require('echarts/renderers');



function getTimeStemp(time){
    return new Date(time).getTime();
}

function getSETime(startTime,endTime,interval,size){
    const n = new Date().getTime();
    const int = interval * 60 * 1000; //s时间颗粒度
    const st =  getTimeStemp(startTime);//开始时间
    const et = endTime==='now'?n:getTimeStemp(time); //结束时间
    // console.log(st,et)
    const dataGap = size * int;
    const number = Math.round((et-st)/dataGap)+1;
    const time = [];
    for (let index = 0; index < number; index++) {
        const startTime = st - (dataGap * index);
        const endTime = et - (dataGap * index);
        const sTime = Math.round(startTime/1000);
        const eTime = Math.round(endTime/1000);
        const o = {from:sTime,to:eTime};
        time.push(o);
        // console.log(sTime,eTime)
    }
    return time
    // console.log(startTime,endTime,et,st,dataGap,Math.round((et-st)/dataGap))
}


async function getMarketData(){
    const timeLIst = getSETime('2021-10-5','now',1,120);
    const pairs = ['BTC-USDT','ETH-USDT'];
    const base = 'http://api.hbdm.com/linear-swap-ex/market/history/kline';
    const allUrl = [];
    _.forEach(pairs,l=>{
        _.forEach(timeLIst,m=>{
            // console.log(l,m.to)
            const url = `${base}?contract_code=${l}&period=1min&size=120&from=${m.from}&to=${m.to}`
            allUrl.push(url);
            // console.log(url)
        })
    })
    // console.log(allUrl) 
    const allData = [];
    _.forEach(allUrl,n=>{
        axios.get(n)
        .then(function(res){
            const data = res.data;
            allData.push(data);
            // console.log(data)
        })
    })

    // return new Promise(resolve=>{
    //     setTimeout(()=>{
    //         resolve()
    //     console.log(allData)
    //     return allData
    //     },5000)
    // })
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            // console.log(allData);
            resolve(allData);
        }, 2000);
    });
    return promise;

    // // setTimeout(()=>{
    //     console.log(allData)
    //     return allData
    // // },5000)
}

function getHuoBiResult(){

getMarketData().then(function(res){
    const data = res[3];
    const candle = [];
    // console.log(data)
    _.forEach(data,l => {
        _.forEach(l,n => {
            // console.log(n)
            // const type = {id:n.id,open:n.open,close:n.close,low:n.low,high:n.high,amount:n.amount,vol:n.vol,trade_turnover:n.trade_turnover,count:n.count};
            const k = {time:n.id,open:n.open,close:n.close,low:n.low,high:n.high};
            // const ks = [{close:'x',open:'xx',time:'ff'},{}]
            candle.push(k);
        })
    });
    setTimeout(()=>{
        console.log(candle)
    },2000);
    // chart(candle)
    // echarts.use([GridComponent, CandlestickChart, CanvasRenderer]);
    // var chartDom = document.getElementById('main');
    // var myChart = echarts.init(chartDom);
    // var option;
    // option = {
    //     xAxis: {},
    //     yAxis: {},
    //     series: [
    //       {
    //         type: 'candlestick',
    //         data: [candle[0]]
    //       }
    //     ]
    //   };
    //   option && myChart.setOption(option);
})
}
getHuoBiResult()






// async function dataProcessing(){
//         const aldata = await getMarketData();
//         setTimeout(() => {
//             console.log(aldata)     
//         }, 5000);
//         // _.forEach(aldata,d => {
//         // const data = d[3];
//         // console.log(data)
//         // _.forEach(data,a => {
//         //     const type = {id:a[0],open:a[1],close:a[2],low:a[3],high:a[4],amount:a[5],vol:a[6],trade_turnover:a[7],count:a[8]}
//         //     console.log(type)
//         // })
//     // });
// }
// dataProcessing()
// console.log(3)



// async function load1(){
//     setTimeout(() => {
//         return '执行了load1'
//     }, 3000);

// }
// async function load2(){
//     return '执行了load2'
// }

// async function load(){
//     const loda1 = await load1();
//     const loda2 = await load2();
//     console.log(loda1,loda2)
// }



/**
 * 
 * 2021-8-9 2021-8-15
 * 
 * 
 * [
 * {from:xx,to:xx},
 * {from:xx,to:xx},
 * ]
 */


module.exports = {
    getSETime,
    getMarketData,
    getHuoBiResult
}