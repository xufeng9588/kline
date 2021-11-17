const axios = require('axios');
const _ = require('lodash');

const url = ['https://www.okex.com/api/v5/public/funding-rate?instId=BTC-USD-SWAP'];
_.forEach(url,n=>{
    axios.get(n)
    .then(function(res){
        const data = res.data;
        console.log(data)
    })
})