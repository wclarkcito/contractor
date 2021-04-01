const router = require('express').Router();
const { Contractor } = require('../../models');

// Returns a list of all contractors
// route starts at /api/contractors
router.get("/", async (req, res) => {
    try {
      const getAllContractors = await Contractor.findAll({
      });
      res.status(200).json(getAllContractors);
    } catch (error) {
      res.status(500).json(err);
    }
  });

// Returns a list of a specefic contractor by id
// route starts at /api/contractors/:id
router.get("/:id", async (req, res) => {
    try {
      const getOneContractor = await Contractor.findByPk(req.params.id, {
      });
      res.status(200).json(getOneContractor);
    } catch (error) {
      res.status(500).json(err);
    }
  });

// Adds a new contractor
router.post('/', async (req, res) => {
    try {
      const addContractor = await Contractor.create(req.body);

      req.session.save(() => {
        req.session.user_id = addContractor.id;
        req.session.logged_in = true;
  
        res.status(200).json(addContractor);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Contractor login  
router.post('/login', async (req, res) => {
  try {
    const userData = await Contractor.findOne({ where: { email: req.body.email } });

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

// Contractor logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Updates a contractor by id
router.put('/:id', async (req, res) => {
    try {
      const updateContractor = await Contractor.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(updateContractor);
    } catch (error) {
      res.status(500).json(err);
    }
  });

// Deletes a contractor by id
router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
      const deleteContractor = await Contractor.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(deleteContractor);
    } catch (error) {
      res.status(500).json(err);
    }
  });

module.exports = router;