const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.EMAIL,
    subject: 'Thanks for joining in!',
    text: `Welcome ${name} to the team. Let us know how you get along`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.EMAIl,
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}. Hope to see you sometime soon`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
