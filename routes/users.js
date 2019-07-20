const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const auth = require('./middleware');

router.post('/register', (req, res, next) => {

  let newUser = new User({
    name: (req.body.name || null),
    email: (req.body.email || null),
    username: (req.body.username || null),
    password: (req.body.password || null)
  });


  if (!newUser.name || !newUser.email || !newUser.username || !newUser.password) {
    return res.json({success: false, msg: "Please fill out all fields, missing: " + newUser})
  }
  

  User.getUserByUsername(newUser.username, (err, user) => {
    if (err) throw err;

    if(user){
      return res.json({success: false, msg: 'User already registered'});
    } 
    
    User.addUser(newUser, (err, user) => {
      if(err) {
        return res.json({success: false, msg: 'Failed to register user', err: err.errors});
      } else {
        return res.json({success: true, msg: 'User registered'});
      }
    });
  });

});

router.post('/authenticate', (req, res, next) => {

  const username = req.body.username || null;
  const password = req.body.password || null;

  if (!username|| !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.status(400).json({ msg: 'User Does not exist' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign(
            {id : user.id }, 
            'rosebud', 
            { expiresIn: 604800 },
            (err, token) => {

              if(err) throw err;

              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  username: user.username,
                  email: user.email
                }

              });
            }
          );


      } else {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
    });
  });
});

router.get('/user', auth, (req, res) => {

  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))

});


module.exports = router;
