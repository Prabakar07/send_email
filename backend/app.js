const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Route to send welcome email
app.post('/send-welcome-email', (req, res) => {
  const { email } = req.body;

  // Create a nodemailer transporter with Gmail SMTP configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prabakarsv7@gmail.com', // Your Gmail email address
      pass: 'fmcn zwtk brkv bvjp      ' // Your app-specific password generated for Nodemailer
    }
  });

  const mailOptions = {
    from: 'prabakarsv7@gmail.com',
    to: email,
    subject: 'Welcome to our Newsletter!',
    text: `Welcome to our newsletter! We're excited to have you on board.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending welcome email:', error);
      res.status(500).json({ error: 'Failed to send welcome email' });
    } else {
      console.log('Welcome email sent:', info.response);
      res.json({ message: 'Welcome email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
