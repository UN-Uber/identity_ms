const router = require('express').Router();
const jwtService = require('../services/jwtService');


router.post('/verifyToken',jwtService.verifyToken, (req, res) => {
    const response = {
        user: req.verified.user,
        generatedAt: new Date(req.verified.iat),
        expiresIn: new Date(req.verified.exp)
    }
    res.json(response);
});

router.post('/generateToken', (req, res) => {
    const user = req.body.user;
    const token = jwtService.generateToken(user);
    res.json(token);
});

module.exports = router;