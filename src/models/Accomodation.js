const { DataTypes, UniqueConstraintError } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User")

const Accomodation = sequelize.define("Accomodation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adress: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    postalCode: {
        type: DataTypes.INTEGER
    },
    rent: {
        type: DataTypes.INTEGER
    },
    roomNr: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
});
// skapar en relation mellan modellerna där Accomodation tillhör User modellen
Accomodation.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Accomodation, { foreignKey: "userId" ,onDelete: 'CASCADE' });


module.exports = Accomodation;