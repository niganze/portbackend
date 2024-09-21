import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js'; // Import the Contact model

dotenv.config();

export const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    // Save the contact form data to the database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();

    // Set up the email transporter using Nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to the admin (yourself)
    let adminMailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Admin's email
      subject: `New Contact: ${subject}`,
      text: `
        You have a new contact submission:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Email to the client (confirmation email)
    let clientMailOptions = {
      from: process.env.EMAIL_USER, // Admin's email to send confirmation
      to: email, // Client's email
      subject: 'Thank you for contacting us!',
      text: `
        Hi ${name},

        Thank you for reaching out to us. We have received your message regarding "${subject}" and will get back to you as soon as possible.

        Here is a copy of your message:
        
        "${message}"

        Best regards,
        Alain Niganze
      `,
    };

    // Send confirmation email to client
    await transporter.sendMail(clientMailOptions);

    res.status(200).json({ message: 'Your message was sent successfully, and a confirmation email has been sent to you!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'There was an error sending the email.' });
  }
};

