import nodemailer from "nodemailer";

// Helper function to send approval request email
export const sendApprovalEmail = async (userDetails) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.SUPER_ADMIN_EMAIL,
    subject: "Admin Approval Request",
    text: `A new admin user has signed up and requires approval:
           Name: ${userDetails.name}
           Email: ${userDetails.email}`,
  };

  await transporter.sendMail(mailOptions);
};
