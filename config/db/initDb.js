var sqlite3 = require('sqlite3')
  , path    = require('path');

var sqliteFile = './db/pois.sqlite';

var initDb = false;
if (!path.existsSync(sqliteFile)) {
    initDb = true;
}

var db = new sqlite3.Database(sqliteFile, function(err) {
    if(initDb) {
        db.run('CREATE TABLE "pois" ("id" INTEGER PRIMARY KEY  NOT NULL ,"idOrigin" TEXT,"idGoogle" TEXT,"name" TEXT,"description" TEXT,"tel" TEXT,"mail" TEXT,"address" TEXT,"web" TEXT,"type" INTEGER,"longitude" TEXT,"latitude" TEXT)');
    }
});

module.exports = db;
