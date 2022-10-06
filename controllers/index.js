const router = require('express').Router();
const homeRouter = require('./home-routes');

const apiRoutes = require('./api/index');

router.use('/', homeRouter);
router.use('/api', apiRoutes);
router.use((req, res)=> {
    res.status(404).end();
});

module.exports = router;