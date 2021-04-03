const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, MAIN_URL } = require("../config");

app.post("/email", (req, res) => {
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
})

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


const mailOptions = {
    from: process.env.EMAIL,
    to: "dioncleung@gmail.com",
    subject: `PORTFOLIO CONTACT: ${req.body.subject} from ${req.body.firstName}`,
    text: `Here is a message from your portfolio!
    From: ${req.body.firstName} ${req.body.lastName ? req.body.lastName : "Doe"
        } \n
    Email: ${req.body.emailAddress ? req.body.emailAddress : "no email address given"
        } \n
    Subject: ${req.body.subject} \n
    Message: ${req.body.message} \n
    Phone number: ${req.body.phNum ? req.body.phNum : "no return number left"
        } \n
    Contact method(s): email? ${req.body.email ? "Yes" : "No"}; call? ${req.body.call ? "Yes" : "No"
        }; text? ${req.body.text ? "Yes" : "No"} \n
    Received at: ${Date(req.body.date)}
    `,
    // replyTo: `${req.body.emailAddress}`,
};





// const getBill = (req, res) => {
//     const { name, userEmail } = req.body;

//     let response = {
//         body: {
//             name,
//             intro: "Your bill has arrived!",
//             table: {
//                 data: [
//                     {
//                         item: "MERN stack book",
//                         description: "A mern stack book",
//                         price: "$10.99",
//                     },
//                 ],
//             },
//             outro: "Looking forward to doing more business with you",
//         },
//     };

//     let mail = MailGenerator.generate(response);

//     let message = {
//         from: EMAIL,
//         to: userEmail,
//         subject: "transaction",
//         html: mail,
//     };

//     transporter
//         .sendMail(message)
//         .then(() => {
//             return res
//                 .status(200)
//                 .json({ msg: "you should receive an email from us" });
//         })
//         .catch((error) => console.error(error));
// };

module.exports = {
    nodemailer,
    Mailgen,
};