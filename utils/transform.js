const _ = require('lodash');

async function transformKLine(exchange, pair, type, data) {
    const hd = [];
    _.forEach(data, a => {
        const instrument_ID = `${exchange}_${pair}_${type}`;
        const l = {
            time: a[0],
            exchange: exchange,
            instrument_ID: instrument_ID,
            pair: pair,
            type: type,
            open: a[1],
            high: a[2],
            low: a[3],
            close: a[4]
        };
        hd.push(l);
    })
    return hd
}

async function transformPG(data) {
    const handleData = [];
    _.forEach(data, l => {
        const hd = [l.time, l.exchange, l.instrument_ID, l.pair, l.type, l.open, l.high, l.low, l.close];
        handleData.push(hd)
    })
    return handleData
}

module.exports = {
    transformKLine,
    transformPG
}