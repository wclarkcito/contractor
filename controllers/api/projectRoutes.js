const router = require('express').Router();
const { Projects, User } = require('../../models');
const withAuth = require('../../utils/auth')
const { signup, getBill } = require('../../controller/appController');

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
router.post('/', withAuth, async (req, res) => {
  try {
    const addProject = await Projects.create({
      ...req.body,
      homeowner_id: req.session.user_id
    });
    res.status(200).json(addProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates contractor_id on project when contractor bids
// Route located at /api/projects/:id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const contractor = await User.findByPk(req.session.user_id)
    const project = await Projects.findByPk(req.params.id)
    const homeowner = await User.findByPk(project.homeowner_id)
    console.log(homeowner.email)
    const updatedProject = await Projects.update({
      // new info
      contractor_id: req.session.user_id
    }, {
      where: {
        id: req.params.id
      }
    })
    const bothParties = {
      contractor,
      homeowner
    }
    res.status(200).json(bothParties);
    // res.status(200).json(homeowner);
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