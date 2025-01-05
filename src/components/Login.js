import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCard, MDBCardTitle, MDBCardBody, MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import '../styles/Login.css';
import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode'; // or import * as jwtDecode from 'jwt-decode';
import AnimatedPage from "./AnimatedPage";



function Login() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleLogin = async () => {
    console.log('Attempting to log in with:', { emailAddress, password });
    if (!emailAddress || !password) {
      setErrorMessage('Please enter your email address and password');
      return;
    }
    setErrorMessage('');

    const loginRequest = { emailAddress, password };

    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        console.log('Failed to authenticate:', response);
        throw new Error('Failed to authenticate');
      }

      const responseData = await response.json();
      let token = responseData.token;

      console.log('Token received from server:', token);

      if (typeof token !== 'string') {
        token = String(token);
        console.log('Token after conversion:', token);
      }

      const decodedToken = jwtDecode(token);
      console.log('Decoded Token Payload:', decodedToken);

      if (decodedToken && decodedToken.sub === emailAddress) {
        setAuthUser(responseData);

        // Use the sub field as user identifier
        const userId = decodedToken.sub;
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        console.log('User authenticated and stored token in localStorage');
        navigate('/profile');
      } else {
        setErrorMessage('Invalid token or user data');
        console.log('Invalid token or user data:', decodedToken);
        setTimeout(() => setErrorMessage(''), 5000); 

      }


    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
      setTimeout(() => setErrorMessage(''), 5000); 
    }
  };


  return (
    <AnimatedPage>

    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-70px' }}>
        <MDBContainer className='d-flex vh-100 justify-content-center align-items-center'>
          <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px', width: '500px' }}>
            <MDBCardBody>
              <MDBCardTitle className="text-center mb-4">Login</MDBCardTitle>



              <MDBInput
                className='mb-4'
                label='Email address'
                id='form1'
                type='email'
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder={emailAddress ? emailAddress : ''}
                style={{ marginTop: emailAddress ? '-15px' : '10px', position: 'relative' }}
                labelClass={emailAddress && 'active'}
              />

              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='form2'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={password ? password : ''}
                style={{ position: 'relative' }}
                labelClass={password && 'active'}
              />


              <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="/forgot-password" className="text-secondary">Forgot password?</a>
              </div>


              {errorMessage && <p className="text-danger mb-4">{errorMessage}</p>}

              <MDBBtn rounded className="mb-4 w-100" onClick={handleLogin}>Sign in</MDBBtn>

            

            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </>
    </AnimatedPage>

  );
}

export default Login;