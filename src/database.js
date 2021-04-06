const _ = require('lodash-id');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
db._.mixin({
  first: function (array) {
    return array[0];
  }
})
db.defaults({ games: [], name: "Bowling game" }).write();

module.exports = db;