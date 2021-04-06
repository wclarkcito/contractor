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

});

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Nodemailer",
        link: MAIN_URL,
    },
});

const signup = (req, res) => {
    console.log(req.body)
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
const getBill = (req, res) => {
    const { name, userEmail } = req.body;

    let response = {
        body: {
            name,
            intro: "Your bill has arrived!",
            table: {
                data: [
                    {
                        item: "MERN stack book",
                        description: "A mern stack book",
                        price: "$10.99",
                    },
                ],
            },
            outro: "Looking forward to do more business with you",
        },
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "transaction",
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

module.exports = {signup, getBill,};

