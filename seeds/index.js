const sequelize = require('../config/connection');
const userData = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await userData();

  process.exit(0);
};

seedAll();