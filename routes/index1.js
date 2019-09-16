
const express = require('express'); 
const router = express.Router(); 

router.get('/index1', async(req, res) => {
    res.render('partials/index1');
});

module.exports = router;