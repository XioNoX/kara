express = require('express');

module.exports = function(app) {
    // Configuration

    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.logger('dev'));
        app.use(express.static(__dirname + '/public'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
    });

    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
      app.use(express.errorHandler());
    });

}
