const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service : 'google', 
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f12fbd2ec85c76",
        pass: "edd3ffbc4f0a9d"
      }
  });

module.exports = transport;