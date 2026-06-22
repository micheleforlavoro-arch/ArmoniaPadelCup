import nodemailer from "nodemailer";

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "armoniapadelcup@gmail.com",
        pass: "vptg zkuz vxdj ujve",
      },
    });

    console.log("Sending email...");
    const info = await transporter.sendMail({
      from: "armoniapadelcup@gmail.com",
      to: "armoniapadelcup@gmail.com",
      subject: "Test Vercel",
      text: "Funziona?",
    });

    console.log("Email sent!", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testEmail();
