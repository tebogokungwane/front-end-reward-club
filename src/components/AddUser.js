import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AnimatedPage from "./AnimatedPage";


import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import axios from 'axios';

const AddUser = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Retrieve the token correctly as a string

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    gender: 'MALE',
    role: 'CUSTOMER',
    phoneNumber: '',
    password: 'password',
    registeredByUser: '',
    company: {
      companyName: '',
      companyService: '',
      companyEmail: '',
      companyPhoneNumber: '',
      companyAddress: '',
      companyCity: '',
      companyPostalCode: '',
      addedBy: ''
    }
  });

  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:1991/api/v1/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data;

        // Log the entire user object, including company information
        console.log('Logged-in user information:', data);
        console.log('Company information:', data.company);

        setUserData(data); // Store fetched data separately
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const onSubmit = async (data) => {
    // Populate formData with fetched user data before sending
    const finalFormData = {
      ...data,
      password: 'password', // Ensure password is set correctly

      registeredByUser: `${userData.firstName} ${userData.lastName}`,


      company: {
        ...data.company,
        companyName: userData?.company.companyName || '',
        companyService: userData?.company.companyService || '',
        companyEmail: userData?.company.companyEmail || '',
        companyPhoneNumber: userData?.company.companyPhoneNumber || '',
        companyAddress: userData?.company.companyAddress || '',
        companyCity: userData?.company.companyCity || '',
        companyPostalCode: userData?.company.companyPostalCode || '',
        addedBy: `${userData?.firstName} ${userData?.lastName}`
      }
    };

    console.log('Request data:', finalFormData); // Log the request data

    try {
      const response = await axios.post('http://localhost:1991/api/v1/signUpCustomer', finalFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User created successfully:', response.data);
      setSuccessMessage('Customer has been saved successfully!'); // Set the success message
      reset(); // Clear the form fields after successful submission
      console.log('Form has been reset'); // Verify if reset is called
      setTimeout(() => setSuccessMessage(''), 5000); // Clear the success message after 5 seconds

    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response) {
        console.error('Response error data:', error.response.data);
        console.error('Response error status:', error.response.status);
        console.error('Response error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (

    <AnimatedPage>

    <div className="login-container" style={{ backgroundColor: '#f0f0f0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <MDBCard className='p-4 shadow'>
          <MDBCardBody>
            {/* <Card.Header>
          <strong>  Create Customer  </strong>
          </Card.Header> */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <MDBRow className='mb-4'>
                <MDBCol md='6' className='mb-4'>
                  <MDBInput
                    col='12'
                    label='First name'
                    name='firstName'
                    {...register('firstName', { required: true, pattern: /^[A-Za-z\s]+$/ })}
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  {errors.firstName && <p className="text-danger">Invalid first name.</p>}
                </MDBCol>

                <MDBCol md='6'>
                  <MDBInput
                    col='12'
                    label='Last name'
                    name='lastName'
                    {...register('lastName', { required: true, pattern: /^[A-Za-z\s]+$/ })}
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  {errors.lastName && <p className="text-danger">Invalid last name.</p>}
                </MDBCol>
              </MDBRow>


              <MDBInput
                col='12'
                className='mb-4'
                type='email'
                label='Email address'
                name='emailAddress'
                {...register('emailAddress', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
                value={formData.emailAddress}
                onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
              />
              {errors.emailAddress && <p className="text-danger">Invalid email address.</p>}

              <MDBRow>
                <MDBCol md='6'>
                  <div className='mb-4'>
                    <select
                      className='form-select'
                      id='gender'
                      name='gender'
                      {...register('gender', { required: true })}
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value='MALE'>Male</option>
                      <option value='FEMALE'>Female</option>
                    </select>
                    {errors.gender && <p className="text-danger">Gender is required.</p>}
                  </div>
                </MDBCol>

                <MDBCol md='6'>
                  <div className='mb-4'>
                    <select
                      className='form-select'
                      id='role'
                      name='role'
                      {...register('role', { required: true })}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value='CUSTOMER'>Customer</option>
                      <option value='ADMIN'>Admin</option>
                    </select>
                    {errors.role && <p className="text-danger">Role is required.</p>}
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBInput
                col='12'
                className='mb-4'
                type='number'
                label='Phone Number'
                name='phoneNumber'
                {...register('phoneNumber', { required: true, pattern: /^[0-9]+$/ })}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              {errors.phoneNumber && <p className="text-danger">Invalid phone number.</p>}

              <MDBBtn rounded type='submit' className='mb-4' block>
                Register
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
    </AnimatedPage>

  );
}

export default AddUser;
