const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello, go to /cinemas');
});

module.exports = router;
