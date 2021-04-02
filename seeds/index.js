const sequelize = require('../config/connection');
const homeownerData = require('./homeownerData');
const contractorData = require('./contractorData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await homeownerData();

  await contractorData();

  process.exit(0);
};

seedAll();