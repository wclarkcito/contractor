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

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in && req.session.user_type === "homeowner") {
      res.redirect('/profile');
      return;
    }
    else if (req.session.logged_in && req.session.user_type === "contractor") {
      res.redirect('/contProfile');
      return;
    }
    res.render('login');
  });

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Projects }],
    // });
    // const user = userData.get({ plain: true });
    // console.log(user)
    if (req.session.user_type === 'contractor'){


      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Projects }],
        where: {contractor_id: req.session.user_id}
      });
      const user = userData.get({ plain: true });
      console.log(user)

      res.render('contractor', {
        ...user,
        logged_in: true
      });
    } else {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Projects }],
        where: {homeowner_id: req.session.user_id}
      });
      const user = userData.get({ plain: true });
      console.log(user)
      res.render('profile', {
        ...user,
        logged_in: true
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/contProfile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Projects }],
    });

    const user = userData.get({ plain: true });

    res.render('contProfile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/contractor', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Projects }],
    });
    
    const user = userData.get({ plain: true });
    console.log(user)
    const projectData = await Projects.findAll();
    const projects = projectData.map((project) => project.get({ plain: true }));


    res.render('contractor', {
      ...user,
      projects, // delete later if need to remove unclaimed projects
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const projectData = await Projects.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });
    console.log(project);
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;