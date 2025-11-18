const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// ✅ body-parser middleware (use with router)
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route examples
router.get('/:id/:name', (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  res.send(`<h1>name=${name}, id=${id}</h1>`);
});

router.get('/login', (req, res) => {
  res.cookie('name', 'express');
  res.cookie('age', '1min');
  res.end();
});

router.use('/register', (req, res) => {
  res.status(200);
  res.sendFile(__dirname + '/views/login.html');
});

router.get('/user', (req, res) => {
  res.sendFile(__dirname + '/bodyparser/form.html');
});

// ✅ POST route (with working req.body)
router.post('/user', (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  res.send(`<h3>User registered with Name: ${name} and Password: ${password}</h3>`);
});

module.exports = router;
