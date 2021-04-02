const { User } = require("../models");

const users = [
  {
    name: "Sal",
    email: "sal@hotmail.com",
    password: "password12345",
    user_type: "homeowner"
  },
  {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password12345",
    user_type: "homeowner"
  },
  {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    password: "password12345",
    user_type: "homeowner"
  },
  {
    name: "John",
    email: "john@hotmail.com",
    password: "password12345",
    user_type: "contractor"
  },
  {
    name: "Jane",
    email: "jane@gmail.com",
    password: "password12345",
    user_type: "contractor"
  },
  {
    name: "Sally",
    email: "sally@aol.com",
    password: "password12345",
    user_type: "contractor"
  },
];

const userData = () => User.bulkCreate(users, {
  individualHooks: true,
  returning: true,
});

module.exports = userData;
