const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require('dotenv').config();
const { EMAIL, MAIN_URL } = require("../../config");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,

  secure: false,
  auth: {
    user: process.env.DUMMY_NAME,
    pass: process.env.DUMMY_PASSWORD
  },

});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Projectimator",
    link: MAIN_URL,
  },
});

// Creates a new user
// Route located at /api/users/
router.post('/', async (req, res) => {
  try {
    const addUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = addUser.id;
      req.session.logged_in = true;
      req.session.user_type = addUser.user_type;

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
      req.session.user_type = userData.user_type;

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

// Node Mailer routes
// Route located at /api/users/signup
router.post('/signup', (req, res) => {
  const { userEmail, name } = req.body;
  // sign up the user .....
  // then send the email
  let response = {
    body: {
      name,
      // Email to contractor
      intro: "Thank you for accepeting the project. Please reach out to the homeowner for further details. ",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "You have accepted a project on Projectimator",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));



})
// Route located at /api/users/get-the-bill
router.post('/get-the-bill', (req, res) => {
  const { userEmail, name } = req.body;
  let response = {
    body: {
      name,
      // Email to the Homeowner
      intro: "Your post on Projectimator has been accepted. You will soon be contacted by the contractor about the completion of your project. Thank you!",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Project Accepted on Projectimator",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then((data) => {
      return res
        .status(200)
        .json({ msg: "project accepted" });
    })
    .catch((error) => console.error(error));
})

module.exports = router;