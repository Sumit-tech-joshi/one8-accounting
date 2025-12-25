import dotenv from "dotenv";
dotenv.config();
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
  fileUrl?: string | null;
}) {
  const subject = `New Quote Request — ${data.firstName} ${data.lastName}`;

  await sgMail.send({
    to: process.env.EMAIL_TO!,
    from: process.env.EMAIL_FROM!, // must be verified sender
    subject,
    text: `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company}
Message: ${data.message}
File: ${data.fileUrl ?? "None"}
`.trim(),
    html: `
      <h2>New Quote Request</h2>
      <p><b>Name:</b> ${data.firstName} ${data.lastName}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Company:</b> ${data.company}</p>
      <p><b>Industry:</b> ${data.industry}</p>
      <p><b>Message:</b><br/>${data.message}</p>
    `,
  });
}