const Pool = require('pg').Pool
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')
const pool = new Pool({
  user:"postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: "5432"
})

const getYellowTrips = (req, res) => {
  // query first 10,000 until stream is implemented

  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream('SELECT * FROM YELLOWTRIP')
    const stream = client.query(query)
    //release the client when the stream is finished
    stream.on('end', done)
    stream.pipe(JSONStream.stringify()).pipe(res)
  })

  // pool.query('SELECT * FROM YELLOWTRIP', function(err, sqlRes) {
  //   res.send(JSON.stringify(sqlRes.rows));
  // })
}


const getYellowTrip = (req, res) => {

  let id = parseInt(req.params.id)
  if (isNaN(id)) id = 0
  pool.query('SELECT * FROM YELLOWTRIP WHERE TRIPID = $1', [id], (err, results) => {
      if (err) {
          throw err
      }
      res.status(200).json(results.rows)
  })
}

const getGreenTrips = (req, res) => {
    // query first 10,000 until stream is implemented
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = new QueryStream('SELECT * FROM GREENTRIP')
      const stream = client.query(query)
      //release the client when the stream is finished
      stream.on('end', done)
      stream.pipe(JSONStream.stringify()).pipe(res)
    })
}



const getGreenTrip = (req, res) => {

  let id = parseInt(req.params.id)

  if (isNaN(id)) id = 0

  pool.query('SELECT * FROM GREENTRIP WHERE TRIPID = $1', [id], (err, results) => {
      if (err) {
          throw err
      }
      res.status(200).json(results.rows)
  })
}

const getFHVTrips = (req, res) => {
  // query first 10,000 until stream is implemented
  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream('SELECT * FROM FHVTRIP')
    const stream = client.query(query)
    //release the client when the stream is finished
    stream.on('end', done)
    stream.pipe(JSONStream.stringify()).pipe(res)
  })

}

const getFHVTrip = (req, res) => {

let id = parseInt(req.params.id)

if (isNaN(id)) id = 0

pool.query('SELECT * FROM FHVTRIP WHERE TRIPID = $1', [id], (err, results) => {
    if (err) {
        throw err
    }
    res.status(200).json(results.rows)
})
}

module.exports = {
  getYellowTrips,
  getYellowTrip,
  getGreenTrips,
  getGreenTrip,
  getFHVTrips,
  getFHVTrip
}