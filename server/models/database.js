var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/framework';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE event (id SERIAL PRIMARY KEY, name TEXT  not null, venue TEXT, date DATE)');
query.on('end', function() {
    client.end();
});