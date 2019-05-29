'use strict';

// require modules
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

exports.handler = (event, context, callback) => {

  /** connection.connect()
 * : Every method you invoke on a connection is queued and executed in sequence.
 * connection 성공 시 확인할 것
 * : connection.threadId
 */
  connection.connect();

  /** connection.query()
   * 조인문 사용 시
   * : var options = {sql: '...', nestTables: true};
   * : connection.query(options, function (error, results, fields) { ... }
   */
  connection.query('SELECT * FROM BANK', function (error, results, fields) {
    if (error) {
      console.error('[connection.query]error: ' + error);
      return;
    }

    console.log('[connection.query]results', results);
    console.log('[connection.query]fields', fields);
    callback(null, results);
  });

  /** connection.end()
   * Closing the connection is done using end() which makes sure all remaining queries are executed
   * before sending a quit packet to the mysql server.
   */
  connection.end(function (err) {
    // The connection is terminated now
    if (err) {
      console.error('[connection.end]err: ' + err);
      connection.destroy()
      return;
    }
    console.log('connection ended');
  });

  /** connection.destroy();
   * : immediate Termination of underlying socket. ()= 강제종료)
   */
  // connection.destroy();

  /** connection.beginTransaction()
   * : 트랜젝션관리. commit, rollback 예쩨 포함.
   */
  // connection.beginTransaction(function(err) {
  //      if (err) { throw err; }
  //      connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
  //        if (error) {
  //          return connection.rollback(function() {
  //            throw error;
  //          });
  //        }
  //
  //        var log = 'Post ' + results.insertId + ' added';
  //
  //        connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
  //          if (error) {
  //            return connection.rollback(function() {
  //              throw error;
  //            });
  //          }
  //          connection.commit(function(err) {
  //            if (err) {
  //              return connection.rollback(function() {
  //                throw err;
  //              });
  //            }
  //            console.log('success!');
  //          });
  //        });
  //      });
  //  });
};
