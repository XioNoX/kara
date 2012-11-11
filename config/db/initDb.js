module.exports = function(db) {
    db.run('CREATE TABLE "pois" ("id" INTEGER PRIMARY KEY  NOT NULL ,"idOrigin" TEXT,"idGoogle" TEXT,"name" TEXT,"description" TEXT,"tel" TEXT,"mail" TEXT,"address" TEXT,"web" TEXT,"type" INTEGER,"longitude" TEXT,"latitude" TEXT)');
}
