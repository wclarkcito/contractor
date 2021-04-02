const router = require('express').Router();
const { User } = require('../../models');

// Returns a list of all users
// Route located at /api/users/
router.get("/", async (req, res) => {
    try {
      const getAllUsers = await User.findAll();
      res.status(200).json(getAllUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Returns a list of a specefic user by id
// Route located at /api/users/:id
router.get("/:id", async (req, res) => {
    try {
      const getOneUser = await User.findByPk(req.params.id, {
      });
      res.status(200).json(getOneUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Adds a new user
// Route located at /api/users/
router.post('/', async (req, res) => {
    try {
      const addUser = await User.create(req.body);

      req.session.save(() => {
        req.session.user_id = addUser.id;
        req.session.logged_in = true;
  
        res.status(200).json(addUser);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// User login  
// Route located at /api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// User logout
// Route located at /api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Deletes a user by id
router.delete('/:id', async (req, res) => {
    try {
      const deleteUser = await User.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(500).json(err);
    }
  });

module.exports = router;