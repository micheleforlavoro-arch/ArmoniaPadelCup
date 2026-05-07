import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    email, 
    teamName, 
    p1_name, 
    p1_surname, 
    p2_name, 
    p2_surname, 
    phone, 
    level, 
    payment 
  } = req.body;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials missing. Skipping confirmation email.");
    return res.status(200).json({ status: "skipped", message: "SMTP not configured" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Conferma Iscrizione - Armonia Padel Cup",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #1a1a1a; border-radius: 16px; background-color: #ffffff; color: #1a1a1a;">
          <h2 style="color: #000; text-transform: uppercase; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #A5D8FF; padding-bottom: 10px;">Ciao ${p1_name}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">Siamo felici di confermarti che la richiesta di iscrizione per la squadra <strong>${teamName}</strong> è stata ricevuta con successo.</p>
          <p style="font-size: 16px; line-height: 1.6;">Lo staff valuterà i dettagli e ti invierà una conferma definitiva a breve.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 12px; margin: 25px 0;">
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #666; letter-spacing: 1px;">Riepilogo Iscrizione:</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Squadra:</td><td style="padding: 8px 0; font-weight: bold;">${teamName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Capitano:</td><td style="padding: 8px 0; font-weight: bold;">${p1_name} ${p1_surname}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Giocatore 2:</td><td style="padding: 8px 0; font-weight: bold;">${p2_name} ${p2_surname}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Livello:</td><td style="padding: 8px 0; font-weight: bold;">${level}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0; font-weight: bold;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Telefono:</td><td style="padding: 8px 0; font-weight: bold;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Metodo Pagamento:</td><td style="padding: 8px 0; font-weight: bold; text-transform: capitalize;">${payment}</td></tr>
            </table>
          </div>

          <p style="font-size: 14px; color: #ef4444; font-weight: 500; background-color: #fef2f2; padding: 12px; border-radius: 8px;">
            <strong>Nota:</strong> Se hai sbagliato a inserire qualche dato, ti preghiamo di contattarci il prima possibile al numero <strong>3477187888</strong> o via email a <strong>armoniacup8@gmail.com</strong>.
          </p>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">Questo è un messaggio automatico, non rispondere a questa email.</p>
          <p style="font-size: 14px; font-weight: bold; text-align: center; color: #000; margin-top: 5px;">Armonia Padel Cup 2026</p>
        </div>
      `,
    });

    res.json({ status: "ok", message: "Email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: "error", message: "Failed to send email" });
  }
}
