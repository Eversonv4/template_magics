const { INTEGER, STRING, DOUBLE } = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
});

module.exports = User;
