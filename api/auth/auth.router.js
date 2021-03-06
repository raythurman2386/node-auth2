const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../../data/helpers/user-model');
const protected = require('../middleware/protected');

authRouter
  // POST to register
  .post('/register', async (req, res, next) => {
    try {
      const newUser = await Users.add(req.body);
      return res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  })

  // POST to login
  .post('/login', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findBy({ username });

      const passwordCheck = await bcrypt.compare(password, user.password);

      if (user && passwordCheck) {
        req.session.user = user;

        return res.status(200).json({
          message: `Welcome ${user.username}`
        })
      } else {
        res.status(401).json({ message: "Invalid Credentials" })
      }
    } catch (error) {
      next(error)
    }
  })

  .get('/users', protected(), (req, res, next) => {
    try {
      res.json({ message: 'authorized' })
    } catch (error) {
      next(error)
    }
  })

  .get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        next(err)
      } else {
        res.json({ message: "logged out" })
      }
    })
  })

module.exports = authRouter;