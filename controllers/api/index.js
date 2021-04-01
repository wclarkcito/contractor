const router = require('express').Router();
const homeownerRoutes = require('./homeownerRoutes');
const contractorRoutes = require('./contractorRoutes');
//const projectRoutes = require('./projectRoutes');

// These routes start with /api
router.use('/homeowners', homeownerRoutes);
router.use('/contractors', contractorRoutes);
//router.use('/projects', projectRoutes);

module.exports = router;
