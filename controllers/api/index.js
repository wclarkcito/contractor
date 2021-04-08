const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");

// These routes start with /api
router.use("/users", userRoutes); // api/users
router.use("/projects", projectRoutes); // api/projects

module.exports = router;
