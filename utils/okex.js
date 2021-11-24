const _ = require('lodash');
const { inputData } = require('./input')

function getTimeStemp(time) {
    return new Date(time).getTime();
}

function getSETime(startTime, endTime, interval, size) {
    const t = new Date().getTime();
    const int = interval * 60 * 1000;
    const st = getTimeStemp(startTime);
    const et = endTime === 'now' ? t : getTimeStemp(endTime);
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
        const o = { start: ISOst, end: ISOet };
        time.push(o);
    }
    return time
}


async function getOkexMD(sTime, eTime, pair, dbName) {
    const timeLIst = getSETime(sTime, eTime, 1, 180);
    const base = 'http://www.okex.com/api/spot/v3/instruments/';
    const allUrl = [];
    _.forEach(pair, l => {
        _.forEach(timeLIst, m => {
            // console.log(l,m.to)
            const url = [`${base}${l}/candles?granularity=86400&start=${m.start}&end=${m.end}`,l]
            allUrl.push(url);
            // console.log(url)
            
        })
    })
    // console.log(allUrl) 
    await inputData(allUrl, dbName,'OKEX','SPOT')
}

module.exports = {
    getOkexMD
}
