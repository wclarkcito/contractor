const { User } = require("../models");

const users = [
  {
    name: "Sal",
    email: "sal@hotmail.com",
    password: "password12345",
  },
  {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password12345",
  },
  {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    password: "password12345",
  },
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

const userData = () => User.bulkCreate(users, {
  individualHooks: true,
  returning: true,
});

module.exports = userData;
