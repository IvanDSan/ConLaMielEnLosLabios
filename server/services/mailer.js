import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verificación de email',
    html: `<p>Por favor, verifica tu correo electrónico haciendo clic en el siguiente <a href=${process.env.FRONTEND_URL}verify?token=${verificationToken}>enlace</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo de verificación:', error);
    throw new Error('No se pudo enviar el correo de verificación');
  }
};

export const sendRecoveryPassword = async (email, newPassword) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verificación de email',
    text: `Tu nueva contraseña es: ${newPassword}\n Puedes volver a modificarla desde tu perfil de usuario.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo de verificación:', error);
    throw new Error('No se pudo enviar el correo de verificación');
  }
};
