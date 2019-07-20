const Pool = require('pg').Pool
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')
const pool = new Pool({
  user:"postgres",
  host: "db",
  database: "taxidata",
  password: "postgres",
  port: "5432"
})


const getCostHour = (req, res) => {

    let id = parseInt(req.params.id);
    if (isNaN(id)) id = 0;
    
    let newquery = 'SELECT AVG(TOTALCOST), PICKUPZONE FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = $1 GROUP BY PICKUPZONE';
    
    pool.query(newquery, [id], (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).json(results.rows);
    })
  }
  
  const getAvgTime = (req, res) => {
  
    // let id = parseInt(req.params.id);
    // if (isNaN(id)) id = 0;
    
    // let newquery = 'SELECT (extract(hour FROM DROPOFFTIME)*60*60 + extract(minutes FROM DROPOFFTIME)*60 + extract(seconds FROM DROPOFFTIME) - (extract(hour FROM DROPOFFTIME)*60*60 + extract(minutes FROM DROPOFFTIME)*60 + extract(seconds FROM PICKUPTIME))) AS TIME, PICKUPZONE FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = $1';
    // let newquery = 'SELECT AVG(extract(minutes FROM (DROPOFFTIME - PICKUPTIME))*60 + extract(seconds FROM (DROPOFFTIME - PICKUPTIME))) AS DIFF, PICKUPZONE FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = 13 GROUP BY PICKUPZONE';
    // let newquery = 'SELECT ((extract(minutes FROM (DROPOFFTIME - PICKUPTIME))*60 + extract(seconds FROM (DROPOFFTIME - PICKUPTIME))) AS DIFF FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = 13';
    let newquery = 'SELECT  AVG(DROPOFFTIME - PICKUPTIME) AS DIFF, PICKUPZONE FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = 13 GROUP BY PICKUPZONE';
    
    pool.query(newquery, (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).json(results.rows);
    })
  }

  const getAvgTimes = (req, res) => {
  
    let id = parseInt(req.params.id);
    if (isNaN(id)) id = 0;
    
    // let newquery = 'SELECT (extract(hour FROM DROPOFFTIME)*60*60 + extract(minutes FROM DROPOFFTIME)*60 + extract(seconds FROM DROPOFFTIME) - (extract(hour FROM DROPOFFTIME)*60*60 + extract(minutes FROM DROPOFFTIME)*60 + extract(seconds FROM PICKUPTIME))) AS TIME, PICKUPZONE FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = $1';
    // let newquery = 'SELECT AVG(extract(minutes FROM (DROPOFFTIME - PICKUPTIME))*60 + extract(seconds FROM (DROPOFFTIME - PICKUPTIME))) AS DIFF, PICKUPZONE FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = 13 GROUP BY PICKUPZONE';
    // let newquery = 'SELECT ((extract(minutes FROM (DROPOFFTIME - PICKUPTIME))*60 + extract(seconds FROM (DROPOFFTIME - PICKUPTIME))) AS DIFF FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = 13';
    let newquery = 'SELECT  AVG(extract(minute FROM (DROPOFFTIME - PICKUPTIME))*60 - extract(second FROM (DROPOFFTIME - PICKUPTIME))) AS AVG, PICKUPZONE FROM YELLOWTRIP WHERE extract(hour FROM PICKUPTIME) = $1 GROUP BY PICKUPZONE';
    
    pool.query(newquery, [id], (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).json(results.rows);
    })
  }

  module.exports = {
    getCostHour,
    getAvgTime,
    getAvgTimes
  }