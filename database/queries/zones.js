const Pool = require('pg').Pool

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "postgres",
    password: "1234",
    port: "5432"
  })

const getZones = (req, res) => {
    pool.query('SELECT * FROM zones', (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}


const getZone = (req, res) => {

    let id = parseInt(req.params.id)

    if (isNaN(id)) id = 0

    pool.query('SELECT * FROM zones WHERE locationid = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getZones,
    getZone
}