const router = require('express').Router();
const { Projects } = require('../../models');
const withAuth = require('../../utils/auth')

router.get("/", async (req, res) => {
    try {
      const getAllProjects = await Projects.findAll();
      res.status(200).json(getAllProjects);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Returns a list of a specefic user by id
// Route located at /api/users/:id
// router.get("/:id", async (req, res) => {
//     try {
//       const getOneUser = await User.findByPk(req.params.id, {
//       });
//       res.status(200).json(getOneUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//add project
// route located at /api/projects
router.post('/', async (req, res) => {
    try {
      const addProject = await Projects.create(req.body);
        res.status(200).json(addProject);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// route located at /api/projects
// -- need to add "authentication"
router.put('/:id', async (req, res) => {
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

module.exports = router;