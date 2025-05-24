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
    unique: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // sätter email till unik och säkerställer att det är i email format
    unique: true,
    isEmail: true
  },
});


// skapar relation mellan modellerna där Users kan läggas in i Accomodation modellen,
// Om en user raderas kommer deras Accomodation också göra det.
module.exports = User;
