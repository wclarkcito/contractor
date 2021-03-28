const router = require('express').Router();
const homeownerRoutes = require('./homewonerRoutes');
const contractorRoutes = require('./contractorRoutes');

router.use('/homeowners', homeownerRoutes);
router.use('/contractors', contractorRoutes);

module.exports = router;
