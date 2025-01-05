import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Card } from 'react-bootstrap';
import AnimatedPage from "./AnimatedPage";

import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput
} from 'mdb-react-ui-kit';

const AddAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {

    

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/signUpAdmin`, data);
      console.log('User type:', response.data);
      setSuccessMessage('Admin registered successfully!');
      setTimeout(() => setSuccessMessage(''), 5000); // Clear the success message after 5 seconds
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AnimatedPage>

    <MDBContainer fluid className='h-100'>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='8' xl='6'>
          <MDBCard className='shadow-sm' style={{ borderRadius: '15px' }}>
            <MDBRow className='d-flex justify-content-center'>
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
              <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                <MDBRow>
                  {/* User Section */}
                  <MDBCol md='6'>
                    <Card.Header className="text-center mb-3">
                      <strong>User</strong>
                    </Card.Header>
                    <MDBRow>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='First Name'
                          id='form1'
                          type='text'
                          {...register('firstName', { required: true, pattern: /^[A-Za-z\s]+$/ })}
                        />
                        {errors.firstName && <p className="text-danger">Invalid first name.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Last Name'
                          id='form2'
                          type='text'
                          {...register('lastName', { required: true, pattern: /^[A-Za-z\s]+$/ })}
                        />
                        {errors.lastName && <p className="text-danger">Invalid last name.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Cell Number'
                          id='phoneNumber'
                          name='phoneNumber'
                          type='text'
                          {...register('phoneNumber', { required: true, pattern: /^[0-9]+$/ })}
                        />
                        {errors.phoneNumber && <p className="text-danger">Invalid number.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Email Address'
                          id='emailAddress'
                          name='emailAddress'
                          type='text'
                          {...register('emailAddress', {
                            required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                          })}
                        />
                        {errors.emailAddress && <p className="text-danger">Invalid email.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <select
                          className='form-select'
                          id='gender'
                          name='gender'
                          {...register('gender')}
                        >
                          <option value='MALE'>Male</option>
                          <option value='FEMALE'>Female</option>
                        </select>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  {/* Company Section */}
                  <MDBCol md='6'>
                    <Card.Header className="text-center mb-3">
                      <strong>Company</strong>
                    </Card.Header>
                    <MDBRow>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Company Name'
                          id='companyName'
                          name='company.companyName'
                          type='text'
                          {...register('company.companyName', { required: true, pattern: /^[A-Za-z\s]+$/ })}
                        />
                        {errors.company?.companyName && <p className="text-danger">Invalid company name.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Company Service'
                          id='companyService'
                          name='company.companyService'
                          type='text'
                          {...register('company.companyService', { required: true, pattern: /^[A-Za-z\s]+$/ })}
                        />
                        {errors.company?.companyService && <p className="text-danger">Invalid company service.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Company Address'
                          id='companyAddress'
                          name='company.companyAddress'
                          type='text'
                          {...register('company.companyAddress', { required: true, pattern: /^[A-Za-z\s]+$/ })}
                        />
                        {errors.company?.companyAddress && <p className="text-danger">Invalid company address.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Company Number'
                          id='companyPhoneNumber'
                          name='company.companyPhoneNumber'
                          type='text'
                          {...register('company.companyPhoneNumber', { required: true, pattern: /^[0-9]+$/ })}
                        />
                        {errors.company?.companyPhoneNumber && <p className="text-danger">Invalid company number.</p>}
                      </MDBCol>
                      <MDBCol md='12' className='mb-3'>
                        <MDBInput
                          label='Company Email'
                          id='companyEmail'
                          name='company.companyEmail'
                          type='text'
                          {...register('company.companyEmail', {
                            required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                          })}
                        />
                        {errors.company?.companyEmail && <p className="text-danger">Invalid company email.</p>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <div className="d-flex justify-content-center">
                  <MDBBtn rounded className="mt-4 w-50" type="submit">Register</MDBBtn>
                </div>
              </form>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </AnimatedPage>

  );
}

export default AddAdmin;
