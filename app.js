
/**
 * Module dependencies.
 */

var express        = require('express')
  , sqlite3        = require('sqlite3')
  , path             = require('path')
  , fs             = require('fs')
  , routes         = require('./routes')
  , poisController = require('./controllers/poisController');

var sqliteFile = './db/pois.sqlite';

var initDb = false;
// Is it a directory?
if (!path.existsSync(sqliteFile)) {
    initDb = true;
}

var db = new sqlite3.Database(sqliteFile, function(err) {
    if(initDb) {
        require('./config/db/initDb')(db);
    }
});

var app = module.exports = express.createServer();

require('./config/configure')(app);

// Routes

app.get('/', routes.index);
app.post('/suggest', poisController.suggest);
app.get('/poi/:id', poisController.poi);
app.get('/weather', poisController.weather);
app.get('/events', poisController.events);
app.get('/googleplaces', poisController.googleplaces);
app.get('/yelp', poisController.yelp);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
