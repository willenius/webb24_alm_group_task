const { DataTypes, UniqueConstraintError } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    // unikt användarnamn och utrymme för en profilbild, validate testar så att det är en http.
    unique: true,
    validate: {
      isUrl: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // sätter email till unik och säkerställer att det är i email format
    unique: true,
    isEmail: true
  },
});

module.exports = User;
