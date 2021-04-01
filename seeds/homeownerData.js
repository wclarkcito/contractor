const { Homeowner } = require("../models");

const homeowners = [
  {
    name: "John",
    email: "john@hotmail.com",
    password: "password12345",
  },
  {
    name: "Jane",
    email: "jane@gmail.com",
    password: "password12345",
  },
  {
    name: "Sally",
    email: "sally@aol.com",
    password: "password12345",
  },
];

const homeownerData = () => Homeowner.bulkCreate(homeowners);

module.exports = homeownerData;