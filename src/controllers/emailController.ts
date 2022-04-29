import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const contato = async (req: Request, res: Response) => {

   // Passo 1: Configurar o transport
   let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: "7ae9b405bdeb31",
         pass: "7ea430172aba8f"
      }
   });

   // Passo 2: Configurar a mensagem
   let message = {
      from: 'nao-responda@gmail.com',
      to: process.env.TO,
      replyTo: req.body.from,
      subject: req.body.subject,
      html: req.body.email,
      text: req.body.email
   }

   // Passo 3: Enviar a mensagem
   let info = await transport.sendMail(message);

   console.log('INFO:', info);

   res.json({ success: true });
}