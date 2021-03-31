const router = require('express').Router();
const homeownerRoutes = require('./homeownerRoutes');
const contractorRoutes = require('./contractorRoutes');

router.use('/homeowners', homeownerRoutes);
router.use('/contractors', contractorRoutes);

module.exports = router;
