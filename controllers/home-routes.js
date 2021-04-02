const router = require('express').Router();
const { Projects, User } = require('../models');
const withAuth = require('../utils/auth');

// Home routes are located at /

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const projectData = await Projects.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const projects = projectData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        projects, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', async (req, res) => {
    // try {
    //   // Get all projects and JOIN with user data
    //   const projectData = await Project.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['name'],
    //       },
    //     ],
    //   });
  
    //   // Serialize data so the template can read it
    //   const projects = projectData.map((project) => project.get({ plain: true }));
  
    //   // Pass serialized data and session flag into template
    //   res.render('homepage', { 
    //     projects, 
    //     logged_in: req.session.logged_in 
    //   });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
    res.render('login')
  });

  router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Projects }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/contractor', async (req, res) => {
    // try {
    //   // Get all projects and JOIN with user data
    //   const projectData = await Project.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['name'],
    //       },
    //     ],
    //   });
  
    //   // Serialize data so the template can read it
    //   const projects = projectData.map((project) => project.get({ plain: true }));
  
    //   // Pass serialized data and session flag into template
    //   res.render('homepage', { 
    //     projects, 
    //     logged_in: req.session.logged_in 
    //   });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
    res.render('contractor')
  });
module.exports = router;