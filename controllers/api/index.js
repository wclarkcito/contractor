const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

// These routes start with /api
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
