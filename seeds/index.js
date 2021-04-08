const sequelize = require("../config/connection");
const userData = require("./userData");
const projectsData = require("./projectsData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await userData();
  await projectsData();
  console.log(projectsData);

  process.exit(0);
};

seedAll();
