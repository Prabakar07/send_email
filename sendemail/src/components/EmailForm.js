import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend with the email
      const response = await axios.post('http://localhost:3000/send-welcome-email', { email });
      console.log('Welcome email sent successfully!');
      // Optionally, show a success message to the user
      setVerificationMessage('OTP sent to your email. Please check and enter the OTP below.');
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Optionally, show an error message to the user
      setVerificationMessage('Error sending welcome email. Please try again later.');
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend to verify the OTP
      await axios.post('http://localhost:3000/verify-otp', { email, otp });
      console.log('OTP verified successfully!');
      // Optionally, show a success message to the user
      setVerificationMessage('OTP verified successfully!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Optionally, show an error message to the user
      setVerificationMessage('Error verifying OTP. Please try again.');
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeOtp = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <h2>Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <button type="submit">Subscribe</button>
      </form>

    <br/>

      {verificationMessage && (
        <form onSubmit={handleVerification}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChangeOtp}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
}

export default EmailForm;
