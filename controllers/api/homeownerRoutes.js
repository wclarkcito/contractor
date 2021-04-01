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
      res.status(200).json(addHomeowner);
    } catch (error) {
      res.status(500).json(err);
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