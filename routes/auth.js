const router = require('express').Router();
const jwtService = require('../services/jwtService');


router.post('/verifyToken',jwtService.verifyToken, (req, res) => {
    
    const response = {
        user: req.verified.user,
        id : req.verified.id,
        generatedAt: new Date(req.verified.iat*1000),
        expiresIn: new Date(req.verified.exp*1000)
    }
    res.json(response);
});

router.post('/generateToken', (req, res) => {
    const payload = {
        user: req.body.user,
        id: req.body.id
    }

    const token = jwtService.generateToken(payload);
    res.json(token);
});

module.exports = router;