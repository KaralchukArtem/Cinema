const express = require('express');
const router = express.Router();

router.get('/tic', (req, res) => {
    res.send('Hel33lo');
});

module.exports = router;