const async = require('async');
const { transformKLine, transformPG } = require('./transform');
const { request } = require('../../rates/utils/request')
// const { kLine } = require('../../database/influxdb/Table_Structure/index')
const { kLinePG } = require('../../database/postgres/Table_Structure/index');
const { postgresLink } = require('../../database/postgres/pg');
const { influxLink } = require('../../database/influxdb/influx');
const { DBLink } = require('../../database/link_influx');
const kLine = require('../schema/kLine.json')

async function inputData(allUrl, dbName, exchange, type) {
    return async.mapLimit(allUrl, 1, async (d) => {
        const data = await request(d[0]);
        const dbLink = new DBLink(host = 'localhost', port = 8086, database = 'bfs');
        dbLink.loadModelConfigs([kLine]);
        // const { database, tableName, host, field } = kLine;
        if (dbName === 'influx') {
            var handleData = await transformKLine(exchange, d[1], type, data);
            // console.log(handleData)
            await dbLink.batchUpsert('kLine', handleData, { batchN: 1});
            return
            const kLine = new influxLink({
                database: database,
                tableName: tableName,
                host: host,
                data: handleData,
                field: field
            })
            await kLine.influxDB();
        } else if (dbName === 'postgres') {
            const { database, tableName, host, field, values } = kLinePG;
            const hd = await transformKLine(exchange, d[1], type, data);
            var handleData = await transformPG(hd);
            const kLine = new postgresLink({
                database: database,
                tableName: tableName,
                host: host,
                data: handleData,
                field: field,
                values: values
            })
            await kLine.pgDBinput();
        } else return
    }, (err, res) => {
        if (err) throw err
    })
}

module.exports = {
    inputData
}