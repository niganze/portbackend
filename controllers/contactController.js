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

    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      text: `
        You have a new contact submission:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Your message was sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'There was an error sending the email.' });
  }
};
