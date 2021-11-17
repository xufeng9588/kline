const fs = require('fs');
const { getresult } = require('./utils/huobi');

function getData(){
    setInterval(() => {
        const result = getHuoBiResult();
        // console.log(result)
        const t = result[0];
        console.log(t)
    }, 1*60*1000);
}
getData()