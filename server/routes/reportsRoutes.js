const express = require('express');

const router = express.Router();
const getAllReports = require('../controller/getAllReports');
const addReport = require('../controller/addReport');

router.get('/reports', getAllReports); 
router.post('/addReport', addReport);

module.exports = router;
