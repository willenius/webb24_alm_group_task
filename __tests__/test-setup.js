// test-setup.js
process.env.NODE_ENV = "test";
const sequelize = require("../src/config/database");
const User = require("../src/models/User");
const Accomodation = require("../src/models/Accomodation")
// TODO: Add Accomodation model

beforeAll(async () => {
  await sequelize.sync({force: true});
});

beforeEach(async () => {
  await User.destroy({
    where: {}
  })
  await Accomodation.destroy({
    where: {}
  })
})

afterAll(async () => {
  await sequelize.close();
});

module.exports = { sequelize, User, Accomodation};