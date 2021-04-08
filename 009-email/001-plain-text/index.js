const nodemailer = require('nodemailer');
const config = require('config');

(async () => {

  const transport = nodemailer.createTransport(config.get('mailer'));

  const message = await transport.sendMail({
    from: config.get('mailer.auth.user'),
    to: 'alvera.douglas73@ethereal.email',
    subject: 'Message subject',
    text: 'Hello world!'
  });

  console.log(message);

})
().catch(e => {
  console.log(e.message);
  process.exit(1);
});
