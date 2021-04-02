const router = require('express').Router();
const { Homeowner } = require('../../models');

// Returns a list of all homeowner
router.get("/", async (req, res) => {
    try {
      const getAllHomeowners = await Homeowner.findAll({
      });
      res.status(200).json(getAllHomeowners);
    } catch (error) {
      res.status(500).json(err);
    }
  });

// Returns a list of a specefic homeowner by id
router.get("/:id", async (req, res) => {
    try {
      const getOneHomeowner = await Homeowner.findByPk(req.params.id, {
      });
      res.status(200).json(getOneHomeowner);
    } catch (error) {
      res.status(500).json(err);
    }
  });

// Adds a new homeowner
router.post('/', async (req, res) => {
    try {
      const addHomeowner = await Homeowner.create(req.body);

      req.session.save(() => {
        req.session.user_id = addHomeowner.id;
        req.session.logged_in = true;
  
        res.status(200).json(addHomeowner);
      });
    } catch (error) {
      res.status(500).json(err);
    }
  });

// Homeowner login  
router.post('/login', async (req, res) => {
  try {
    const userData = await Homeowner.findOne({ where: { email: req.body.email } });

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

// Homeowner logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Updates a homeowner by id
router.put('/:id', async (req, res) => {
    try {
      const updateHomeowner = await Homeowner.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(updateHomeowner);
    } catch (error) {
      res.status(500).json(err);
    }
  });

// Deletes a homeowner by id
router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
      const deleteHomeowner = await Homeowner.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(deleteHomeowner);
    } catch (error) {
      res.status(500).json(err);
    }
  });

  
module.exports = router;