const { getBinanceMD } = require('./utils/binance');
const { getOkexMD } = require('./utils/okex')


async function getData(exchange) {
    const pairs = ['BTC-USDT','ETH-USDT']
    if (exchange === 'binance') {
        await getBinanceMD('2021-11-19', '2021-11-23', pairs, 'influx');
    }else if(exchange==='okex'){
        await getOkexMD('2021-11-19', '2021-11-23', pairs, 'influx')
    }
}
getData('binance')