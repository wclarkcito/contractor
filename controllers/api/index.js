const router = require('express').Router();
const userRoutes = require('./userRoutes');
//const projectsRoutes = require('./projectsRoutes');

// These routes start with /api
router.use('/users', userRoutes);
//router.use('/projects', projectRoutes);

module.exports = router;
