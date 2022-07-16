const express = require('express');
const router = express();
const cors = require('cors');
const pool =  require('../config/db.js');

router.use(cors());
router.use(express.json());

router.get('/schedule', async (req, res) => {
    pool.getConnection((err, conn) => {
        if(err) throw err;
        try {
            const qry = `SELECT f.airline, f.flight_no, a.from_city, a.date_time FROM flight f INNER JOIN arrival a ON f.flight_no = a.flight_no`;
            conn.query(qry, (err, result) => {
                conn.release();
                if(err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch(err) {
            console.log(err);
            res.end();
        }
    });
});

router.post('/addEntry', async (req, res) => {
    const pilot_id = req.body.pilot_id;
    const pilot_name = req.body.pilot_name;
    const airline = req.body.airline;
    const flight_no = req.body.flight_no;
    const from_city = req.body.from_city;
    const arrival = req.body.arrival;

    const oldDate = new Date(arrival);
    const offset = oldDate.getTimezoneOffset()
    const newDate = new Date(oldDate.getTime() - (offset*60*1000))
    const dateArr = newDate.toISOString().split('T');
    const date_time = dateArr[0] + ' ' + dateArr[1].substring(0,8);
    
    pool.getConnection((err,conn) => {
        conn.beginTransaction(err => {
            if(err) throw err;
            conn.query(`INSERT IGNORE INTO pilot VALUES (?,?)`, [pilot_id, pilot_name], (err, result) => {
                if(err) conn.rollback();
            }).on('error', err => console.log(err.code));
            conn.query(`INSERT IGNORE INTO flight VALUES (?,?)`, [flight_no, airline], (err, result) => {
                if(err) conn.rollback();
            }).on('error', err => console.log(err.code));
            conn.query(`INSERT INTO arrival VALUES (?,?,?,?)`, [date_time, from_city, pilot_id, flight_no], (err, result) => {
                if(err) conn.rollback();
                conn.commit(err => {
                    if(err) conn.rollback();
                    conn.release();
                });
            }).on('error', err => console.log('\n' + err.sqlMessage + '\n'));
        });
    });
});

module.exports = router;