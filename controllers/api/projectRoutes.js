const router = require('express').Router();
const { Projects } = require('../../models');
const withAuth = require('../../utils/auth')

// Returns a list of all projects
// Route located at /api/projects
router.get("/", async (req, res) => {
    try {
      const getAllProjects = await Projects.findAll();
      res.status(200).json(getAllProjects);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Returns a specific project by id
// Route located at /api/projects/:id
router.get("/:id", async (req, res) => {
    try {
      const getOneProject = await Projects.findByPk(req.params.id, {
      });
      res.status(200).json(getOneProject);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Creates a project
// Route located at /api/projects
router.post('/', async (req, res) => {
    try {
      const addProject = await Projects.create(req.body);
        res.status(200).json(addProject);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Updates contractor_id on project when contractor bids
// Route located at /api/projects
router.put('/:id', withAuth, async (req, res) => {
try {
    const updatedProject = await Projects.update({
        // new info
        contractor_id: req.body.contractor_id
    }, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(updatedProject);
} catch (err) {
    res.status(500).json(err);
  }
})

// Deletes a project by id
// Route located at /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleteProject = await Projects.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;