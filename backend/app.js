const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Object to store OTPs
const otps = {};

// Route to send welcome email with OTP
app.post('/send-welcome-email', (req, res) => {
  const { email } = req.body;

  // Generate a random OTP
  const otp = generateOTP();

  // Store the OTP in the otps object with the email as key
  otps[email] = otp;

  // Create a nodemailer transporter with Gmail SMTP configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prabakarsv7@gmail.com', // Your Gmail email address
      pass: 'tbvz rxad idac bwui      ' // Your app-specific password generated for Nodemailer
    }
  });

  const mailOptions = {
    from: 'prabakarsv7@gmail.com',
    to: email,
    subject: 'Welcome to our Newsletter!',
    text: `Welcome to our newsletter! Your OTP is: ${otp}. Please use this OTP to verify your email address.`
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

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Check if the OTP matches the one stored for the email
  if (otp === otps[email]) {
    // OTP is verified
    console.log('OTP verified successfully!');
    res.json({ message: 'OTP verified successfully' });
  } else {
    // OTP verification failed
    console.error('OTP verification failed');
    res.status(400).json({ error: 'OTP verification failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
