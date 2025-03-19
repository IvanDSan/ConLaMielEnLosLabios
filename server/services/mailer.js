import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verificación de email",
    html: `<p>Por favor, verifica tu correo electrónico haciendo clic en el siguiente <a href="${process.env.FRONTEND_URL}verify?token=${verificationToken}">enlace</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo de verificación:", error);
    throw new Error("No se pudo enviar el correo de verificación");
  }
};

export const sendRecoveryPassword = async (email, newPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recuperación de contraseña",
    text: `Tu nueva contraseña es: ${newPassword}\nPuedes volver a modificarla desde tu perfil de usuario.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo de recuperación:", error);
    throw new Error("No se pudo enviar el correo de recuperación");
  }
};

export const sendContactEmail = async (
  nombre,
  apellido,
  email,
  entidad,
  mensaje
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Nuevo mensaje de contacto",
    html: `
      <h3>Nuevo mensaje de contacto</h3>
      <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Entidad:</strong> ${entidad || "No especificado"}</p>
      <p><strong>Mensaje:</strong> ${mensaje}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el formulario de contacto:", error);
    throw new Error("No se pudo enviar el formulario de contacto");
  }
};
