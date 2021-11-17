const axios = require('axios');
const _ = require('lodash');

function getTimeStemp(time){
    return new Date(time).getTime();
}

function getSETime(startTime,endTime,interval,size){
    const t = new Date().getTime();
    const int = interval * 60 * 1000;
    const st = getTimeStemp(startTime);
    const et = endTime==='now'?t:getSETime(endTime);
    const dataGap = size * int;
    const number = Math.round((et - st) / dataGap) + 1;
    const time = [];
    for (let index = 0; index < number; index++) {
        const startTime = st - (dataGap * index);
        const endTime = et - (dataGap * index);
        const sTime = Math.round(startTime);
        const eTime = Math.round(endTime);
        const sData = new Date(sTime);
        const eData = new Date(eTime);
        const ISOst = sData.toISOString();
        const ISOet = eData.toISOString();
        const o = {start:ISOst,end:ISOet};
        time.push(o);
    }
    return time
}


function getMarketData(){
    const timeLIst = getSETime('2021-10-6','now',1,180);
    const instrument_id = ['BTC-USDT','ETH-USDT'];
    const base = 'http://www.okex.com/api/spot/v3/instruments/';
    const allUrl = [];
    _.forEach(instrument_id,l=>{
        _.forEach(timeLIst,m=>{
            // console.log(l,m.to)
            const url = `${base}${l}/candles?granularity=86400&start=${m.start}&end=${m.end}`
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
// getMarketData()

function getOkexResult(){
    getMarketData().then(function(res){
        // console.log(res)
        _.forEach(res,d =>{
            _.forEach(d,a =>{
                const l = {time:a[0],open:a[1],high:a[2],low:a[3],close:a[4]};
                // const k = [l.time,l.open,l.close,l.high,l.low];
                k.map(function(item,index,array){
                    return item - 0;
                });
                // console.log(k)
            })
        })
    })
}
getOkexResult()
