import transporter from "../config/email.js";

export const sendStudentCredentials = async ({
  email,
  name,
  password,
}) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email configuration is missing");
  }

  await transporter.sendMail({
    from: `"IMS Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your IMS Student Account is Approved",
    html: `
      <h2>Welcome to IMS, ${name}!</h2>

      <p>Your student account has been approved successfully.</p>

      <h3>Your Login Credentials</h3>

      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>

      <p>You can now log in to the Internship Management System.</p>

      <p>Please keep your login credentials secure.</p>

      <br />
      <p>Regards,<br />IMS Team</p>
    `,
  });
};
