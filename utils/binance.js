const _ = require('lodash');
const async = require('async')
const { inputData } = require('./input')
const { transformKLine, transformPG } = require('./transform');
const { request } = require('../../rates/utils/request')
const { kLine } = require('../../database/influxdb/Table_Structure/index')
const { kLinePG } = require('../../database/postgres/Table_Structure/index');
const { postgresLink } = require('../../database/postgres/pg');
const { influxLink } = require('../../database/influxdb/influx');

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
        const o = { from: sTime, to: eTime };
        time.push(o);
    }
    return time
}


async function getBinanceMD(sTime, eTime, pair, dbName) {
    const timeLIst = getSETime(sTime, eTime, 1, 180);
    const base = 'http://api.binance.com/api/v3/klines';
    const allUrl = [];
    _.forEach(pair, l => {
        const p = l.replace('-','')
        _.forEach(timeLIst, m => {
            // console.log(l,m.to)
            const url = [`${base}?symbol=${p}&interval=1m&startTime=${m.from}&endTime=${m.to}&limit=180`,l]
            allUrl.push(url);
            // console.log(url)
        })
    })
    // console.log(allUrl)
    await inputData(allUrl,dbName,'BINANCE','SPOT');
}
// getMarketData()
module.exports = {
    getBinanceMD
}