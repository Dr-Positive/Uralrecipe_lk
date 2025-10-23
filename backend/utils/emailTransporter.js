import nodemailer from 'nodemailer'; 

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASSWORD,
  },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 30000,
    tls: {
      rejectUnauthorized: false,
    },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Ошибка SMTP при verify:', error);
  } else {
    console.log('SMTP настроен правильно');
  }
});

console.log('MAIL_LOGIN:', process.env.MAIL_LOGIN);
console.log('MAIL_PASSWORD:', process.env.MAIL_PASSWORD ? '***' : 'undefined');

export default transporter;