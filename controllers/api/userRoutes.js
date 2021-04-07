const router = require('express').Router();
const { User } = require('../../models');
// const { signup, getBill } = require('../../controller/appController');
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
    console.log(userData)
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
  console.log("email to contractor")
  // console.log(req)
  const { userEmail, name } = req.body;

  // sign up the user .....

  // then send the email
  let response = {
    body: {
      name,
      intro: "Your post on Projectimator has been accepted. You will soon be contacted by the contractor about the completion of your project. Thank you!",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "signup successful",
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
  console.log("email to contractor")
  console.log(req.body)
  const { userEmail, name } = req.body;
  console.log(userEmail)
  console.log(name)
  // sign up the user .....

  // then send the email
  let response = {
    body: {
      name,
      intro: "Project has been accepted thank you",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "signup successful",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then((data) => {
      console.log(data)
      return res
        .status(200)
        .json({ msg: "project accepted" });
    })
    .catch((error) => console.error(error));



})







// Deletes a user by id
// // Route located at /api/users/:id
// router.delete('/:id', async (req, res) => {
//     try {
//       const deleteUser = await User.destroy({
//         where: {
//           id: req.params.id
//         }
//       });
//       res.status(200).json(deleteUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// Returns a list of all users
// Route located at /api/users/
// router.get("/", async (req, res) => {
//     try {
//       const getAllUsers = await User.findAll();
//       res.status(200).json(getAllUsers);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// Returns a specific user by id
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

// Return only contractors
// Route located at /api/users/contractors
// router.get("/contractors", async (req, res) => {
//   try {
//     const getContractors = await User.findAll({
//       where: {
//         user_type: 'contractor',
//       }
//     });
//     res.status(200).json(getContractors);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Return only homeowners
// Route located at /api/users/homeowners
// router.get("/homeowners", async (req, res) => {
//   try {
//     const getHomeowners = await User.findAll({
//       where: {
//         user_type: 'homeowner',
//       }
//     });
//     res.status(200).json(getHomeowners);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;