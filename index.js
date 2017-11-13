const express       = require('express');
const app           = express();
const nodemailer    = require('nodemailer');
const bodyParser    = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: 'triori@gmail.com',
            pass: 'Troll3263985'
        }
    });
      
    const mailOptionsToClient = {
        from: 'triori@gmail.com',
        to: `${req.body.email}`,
        subject: 'Japan Candy',
        text: `Спасибо за обращение, администрация с вами свяжется в ближайшее время`
    };

    const mailOptionsToAdmin = {
        from: 'triori@gmail.com',
        to: 'triori@gmail.com',
        subject: 'Japan Candy',
        text: `${req.body.message}`
    };



    transporter.sendMail(mailOptionsToClient)
    .then(info => transporter.sendMail(mailOptionsToAdmin))
    .then(info => res.render('index'))
    .catch(err => res.send(err))
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         console.log('______________\n', error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});