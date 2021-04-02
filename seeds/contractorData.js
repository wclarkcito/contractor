const { Contractor } = require("../models");

const contractors = [
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
];

const contractorData = () => Contractor.bulkCreate(contractors, {
  individualHooks: true,
  returning: true,
});

module.exports = contractorData;
