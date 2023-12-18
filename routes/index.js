const router = require('express').Router();

//import file containing route
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;