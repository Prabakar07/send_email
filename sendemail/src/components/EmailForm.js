import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend with the email
      await axios.post('http://localhost:3000/send-welcome-email', { email });
      console.log('Welcome email sent successfully!');
      // Optionally, show a success message to the user
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h2>Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default EmailForm;
