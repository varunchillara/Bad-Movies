//Select one db to work with:

//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
// const mongoDb = require('../../db/mongodb')

module.exports = {
  saveMovie: function (movie, callback) {
    console.log('what is sqlDb', sqlDb);
    var con = sqlDb.connection;
    console.log('what is con?', con);
    var queryString = 'INSERT INTO movies (id, title) VALUES(?, ?)';

    // console.log('******************* what is in this movie array???', movie);

    con.query(queryString, movie, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'you have stored movie in database!!!');
      }
    });
  },
  deleteMovie: function (movie, callback) {
    var con = sqlDb.connection;

    var deleteString = 'DELETE FROM movies WHERE id=?';

    con.query(deleteString, movie, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'movie deleted!!!');
      }
    })
  }
}