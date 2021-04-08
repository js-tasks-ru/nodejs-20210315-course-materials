const nodemailer = require('nodemailer');
const config = require('config');
const templates = require('./templates');

(async () => {

  const transport = nodemailer.createTransport(config.get('mailer'));

  const html = templates.welcome({username: "User Name", homeUrl: "http://localhost:3000/"});

  console.log(html);

  const message = await transport.sendMail({
    from: config.get('mailer.auth.user'),
    to: 'alvera.douglas73@ethereal.email',
    subject: 'Message subject',
    html
  });

  console.log(message);

})
().catch(e => {
  console.log(e.message);
  process.exit(1);
});

