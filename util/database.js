// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   database: "mysql",
//   password: null,
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql", "root", null, {
  dialect: "mysql",
  host: "127.0.0.1",
});

module.exports = sequelize;
