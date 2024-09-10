import React, { useState } from 'react';
import { MDBCard, MDBCardTitle, MDBCardBody, MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function ForgotPassword() {
  const [emailAddress, setEmailAddress] = useState(''); // State to manage the email input
  const [message, setMessage] = useState(''); // State to manage success messages
  const [error, setError] = useState(''); // State to manage error messages

  const handleForgotPassword = async () => {
    setError(''); // Reset error message before making the request
    setMessage(''); // Reset success message before making the request

    try {
      const response = await fetch('http://localhost:1991/api/v1/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is set to JSON
        },
        body: JSON.stringify({ email: emailAddress }), // Send 'email' instead of 'emailAddress' to match the backend
        /*
          Note: The key in the body object was changed from 'emailAddress' to 'email'
          to match what the backend expects in the 'ForgotPasswordRequest' class.
        */
      });

      if (!response.ok) {
        throw new Error('Failed to send reset password email'); // Trigger error handling if the response is not OK
      }

      setMessage('Password reset email has been sent. Please check your inbox.'); // Set success message
    } catch (error) {
      setError('An error occurred. Please try again.'); // Set error message in case of failure
      console.error('Error:', error); // Log the error for debugging purposes
    }
  };

  return (
    <MDBContainer className='d-flex vh-100 justify-content-center align-items-center'>
      <MDBCard className='card-registration' style={{ borderRadius: '15px', width: '500px' }}>
        <MDBCardBody>
          <MDBCardTitle className="text-center mb-4">Forgot Password</MDBCardTitle>

          <MDBInput
            className='mb-4'
            label='Email address'
            type='email'
            value={emailAddress} // Bind the input value to the emailAddress state
            onChange={(e) => setEmailAddress(e.target.value)} // Update state when input changes
            placeholder='Enter your email address' // Placeholder text for the input field
          />

          {message && <p className="text-success mb-4">{message}</p>} // Display success message if present
          {error && <p className="text-danger mb-4">{error}</p>} // Display error message if present

          <a href="/Login" className="text-secondary">Login?</a> // Link to the login page

          <MDBBtn rounded className="mb-4 w-100" onClick={handleForgotPassword}>Reset Password</MDBBtn>
          {/* Button triggers the handleForgotPassword function */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ForgotPassword;
