
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , poisController = require('./controllers/poisController');

var app = module.exports = express.createServer();

require('./config/configure')(app);

// Routes

app.get('/', routes.index);
app.get('/poi/:id', poisController.poi);
app.get('/suggest', poisController.suggest);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
