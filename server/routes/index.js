var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = 'postgres://localhost:5432/framework'; // require(path.join(__dirname, '../', '../', 'config'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});



// Create Event
router.post('/api/v1/event', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        ticketLink: req.body.ticketLink,
        posterImage: req.body.posterImage,
        presalePrice: req.body.presalePrice,
        doorsalePrice: req.body.doorsalePrice,
        lineUp: req.body.lineUp,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        name: req.body.name,
        venue: req.body.venue,
        date: req.body.date
    };

    console.log(data);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO event (name, venue, date, presale_price, doorsale_price, end_time, start_time, line_up, ticket_link) values($1, $2, $3, $4, $5, $6, $7, $8, $9)", [data.name, data.venue, data.date, data.presalePrice,
            data.doorsalePrice, data.endTime, data.startTime,
            data.lineUp, data.ticketLink
        ]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM event ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

// read event
router.get('/api/v1/event', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        console.log("yoooooooooooo");
        // connection errors
        if (err) {

            done();
            console.log('errrr', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM event ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
        console.log('Pronbleem is neit hier');
    });


});

// update event
router.put('/api/v1/event/:event_id', function(req, res) {
    var results = [];

    // Grab data from the URL parameters
    var id = req.params.event_id;

    // Grab data from http request
    var data = {
        name: req.body.name,
        venue: req.body.venue,
        date: req.body.date,
    };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        // SQL Query > Update Data
        client.query("UPDATE event SET name=($1), venue=($2), date=($3) WHERE id=($4)", [data.name, data.venue, data.date, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM event ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.delete('/api/v1/event/:event_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.event_id;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM event WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM event ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

router.delete('/api/v1/event/:event_id', function(req, res) {
    var results = [];

    // Grab data from the URL parameters
    var id = req.params.event_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
    });

    // SQL Query > Delete Data
    client.query("DELETE FROM event WHERE id=($1)", [id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM event ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        return res.json(results);
    });

});

module.exports = router;