const express = require('express');
const router = express.Router();

const usersHandler = require('./handler/users');

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.post('/logout', usersHandler.logout);
router.put('/update-profile/:id', usersHandler.update);
router.get('/get-user/:id', usersHandler.getUser);
router.get('/', usersHandler.getUsers);


module.exports = router;
