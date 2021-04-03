const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, MAIN_URL } = require("../config");


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,

    secure: false,
    auth: {
        user: "nodemailer478@gmail.com",
        pass: 'contractor478'
    },
    // debug: false,
    // logger: true
});


let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Nodemailer",
        link: MAIN_URL,
    },
});

const signup = (req, res) => {
    const { userEmail, name } = req.body;

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
        .then(() => {
            return res
                .status(200)
                .json({ msg: "you should receive an email from us" });
        })
        .catch((error) => console.error(error));
};







module.exports = {
    transporter,
    MailGenerator,
};