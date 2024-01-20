const express = require('express');

const router = express.Router()

module.exports = router;


//Get all Method
router.get((req, res) => {
    res.send('<H1>Get All API</H1>')
})

