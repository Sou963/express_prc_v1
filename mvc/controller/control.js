const express = require('express');
const router = express.Router();
const path = require('path');
const { users } = require("../model/user");

router.use(express.urlencoded({ extended: true }));

router.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/form.html'));
});

router.post('/user', (req, res) => {
    const username = req.body.username;
    const password = Number(req.body.password);

    const user = { username, password };
    users.push(user);

    res.status(201).json({
        success: true,
        users,
    });
});

module.exports = router;
