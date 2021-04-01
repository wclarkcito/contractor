const router = require('express').Router();
const { Contractor } = require('../../models');

// Returns a list of all contractors
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
      const addContractor = await Contractor.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(addContractor);
      });
    } catch (error) {
      res.status(500).json(err);
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