const axios = require('axios');
const _ = require('lodash');

function getTimeStemp(time){
    return new Date(time).getTime();
}

function getSETime(startTime,endTime,interval,size){
    const t = new Date().getTime();
    const int = interval * 60 * 1000;
    const st = getTimeStemp(startTime);
    const et = endTime==='now'?t:getSETime(time);
    const dataGap = size * int;
    const number = Math.round((et - st) / dataGap) + 1;
    const time = [];
    for (let index = 0; index < number; index++) {
        const startTime = st - (dataGap * index);
        const endTime = et - (dataGap * index);
        const sTime = Math.round(startTime);
        const eTime = Math.round(endTime);
        const o = {from:sTime,to:eTime};
        time.push(o);
    }
    return time
}


function getMarketData(){
    const timeLIst = getSETime('2021-10-5','now',1,180);
    const pairs = ['BTCUSDT','ETHUSDT'];
    const base = 'http://api.binance.com/api/v3/klines';
    const allUrl = [];
    _.forEach(pairs,l=>{
        _.forEach(timeLIst,m=>{
            // console.log(l,m.to)
            const url = `${base}?symbol=${l}&interval=1m&startTime=${m.from}&endTime=${m.to}&limit=180`
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
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            // console.log(allData);
            resolve(allData);
        }, 2000);
    });
    return promise;
}

function getBinanceResult(){
    getMarketData().then(function(res){
        const candle = [];
        // console.log(res)
        _.forEach(res,d =>{
            _.forEach(d,a =>{
                const l = {time:a[0],open:a[1],high:a[2],low:a[3],close:a[4]};
                candle.push(l);
            })
        })
        setTimeout(()=>{
            console.log(candle)
        },2000);
    })
}
getBinanceResult()