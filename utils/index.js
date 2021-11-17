
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

module.exports = {
    getSETime
}