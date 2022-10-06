const router = require('express').Router();
const homeRouter = require('./home-routes.js');

const apiRoutes = require('./api');

router.use('/', homeRouter);
router.use('/api', apiRoutes);
router.use((req, res)=> {
    res.status(404).end();
});

module.exports = router;