const { DataTypes, UniqueConstraintError } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Accomodation = sequelize.define("Accomodation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        },
        validate: {
            len: [5,5]
        },
    },
    rent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        },
    },
    roomNr: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min: 1
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        },
      }
});
// skapar en relation mellan modellerna där Accomodation tillhör User modellen
Accomodation.belongsTo(User, { foreignKey: "userId", onDelete: 'CASCADE' });
User.hasMany(Accomodation, { foreignKey: "userId" , });


module.exports = Accomodation;