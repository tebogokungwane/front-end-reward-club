import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Rating from '@mui/material/Rating';



import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
 
} 
from 'mdb-react-ui-kit';


const Company = () => {
  const [user, setUser] = useState(null);
  const [ setUsers] = useState([]); // Corrected this line
  const [value] = useState(3);


  useEffect(() => {
    const fetchUsers = () => {
      axios
        .get('http://localhost:1991/api/v1/users')
        .then(response => {
          console.log('Server response:', response.data);
          setUsers(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };

    fetchUsers();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      fetch(`http://localhost:1991/api/v1/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <MDBCard className="mb-4">
    <MDBCardBody>
    <Card.Header>
            <strong> Company Information  </strong>

          </Card.Header>
      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>Comapny Name:</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          <MDBCardText className="text-muted">{user.company.companyName}</MDBCardText>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>Company Service:</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          <MDBCardText className="text-muted">{user.company.companyService}</MDBCardText>
        </MDBCol>
      </MDBRow>
      <hr />

      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>Company Email:</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          <MDBCardText className="text-muted">{user.company.companyEmail}</MDBCardText>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>Company Number:</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          <MDBCardText className="text-muted">{user.company.companyPhoneNumber}</MDBCardText>
        </MDBCol>
      </MDBRow>

      <hr />
      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>Company Address:</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          <MDBCardText className="text-muted">{user.company.companyAddress}</MDBCardText>
        </MDBCol>
      </MDBRow>

      <hr />
      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>Target for my cusomers</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
        <Card.Text style={{ marginTop: '15px' }}>
            <Rating name="read-only" value={user.company.rewardTargetPoints} readOnly />
          </Card.Text>
        </MDBCol>
      </MDBRow>

    </MDBCardBody>
  </MDBCard>

  );
};

export default Company;
