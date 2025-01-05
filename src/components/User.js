import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import {
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function User() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [updatePersonalInfo, setUpdatePersonalInfo] = useState({
    id: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    gender: '',
  });
  const [updateCompanyInfo, setUpdateCompanyInfo] = useState({
    companyName: '',
    companyAddress: '',
    companyPhoneNumber: '',
    companyService: ''
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId || !token) {
      console.error('User ID or token not found in localStorage');
      return;
    }

    const fetchUserData = async () => {
      try {



        const response = await fetch( `${process.env.REACT_APP_API_URL}/api/v1/profile/${userId}`
          , {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log('Fetched user data:', data);
        setUser(data);
        setCompany(data.company); // Assuming the response includes company info
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleUpdatePersonalSubmit = () => {
    console.log('Submitting personal info update:', updatePersonalInfo);
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/v1/updateCustomer/${updatePersonalInfo.id}`, updatePersonalInfo)
      .then(() => {
        console.log('Personal info update successful');
        setShowPersonalModal(false);
      })
      .catch(error => {
        console.error('Error updating personal info:', error);
      });
  };

  const handleUpdateCompanySubmit = () => {
    console.log('Submitting company info update:', updateCompanyInfo);
    axios

     


      .put(`${process.env.REACT_APP_API_URL}/api/v1/updateCompany/${company.id}`, updateCompanyInfo)
      .then(() => {
        console.log('Company info update successful');
        setShowCompanyModal(false);
      })
      .catch(error => {
        console.error('Error updating company info:', error);
      });
  };

  const handleOpenPersonalModal = (userData) => {
    setUpdatePersonalInfo({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      emailAddress: userData.emailAddress,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender
    });
    setShowPersonalModal(true);
  };

  const handleOpenCompanyModal = (companyData) => {
    setUpdateCompanyInfo({
      companyName: companyData.companyName,
      companyAddress: companyData.companyAddress,
      companyPhoneNumber: companyData.companyPhoneNumber,
      companyService: companyData.companyService
    });
    setShowCompanyModal(true);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <MDBCardBody className="text-center">
        <Card.Header>
          <strong>Profile</strong>
        </Card.Header>
        <MDBCardImage
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          alt="avatar"
          className="rounded-circle"
          style={{ width: '100px' }}
          fluid
        />
        <p className="text-muted mb-1">{user.firstName} {user.lastName}</p>
        <p className="text-muted mb-1">{user.emailAddress}</p>
        <p className="text-muted mb-1">{user.phoneNumber}</p>
        <p className="text-muted mb-1">{user.gender}</p>
        <p className="text-muted mb-1">{company?.companyName}</p>
        <p className="text-muted mb-1">{company?.companyAddress}</p>


        <div className="d-flex justify-content-center mb-2">
          <MDBBtn color="success" rounded size="sm" onClick={() => handleOpenPersonalModal(user)}>
            <FaEdit /> Update Personal Info
          </MDBBtn>
          {user.role !== 'CUSTOMER' && (
            <MDBBtn color="primary" rounded size="sm" onClick={() => handleOpenCompanyModal(company)}>
              <FaEdit /> Update Company Info
            </MDBBtn>
          )}
        </div>


      </MDBCardBody>

      {/* Modal for updating personal info */}
      <Modal show={showPersonalModal} onHide={() => setShowPersonalModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Personal Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={updatePersonalInfo.firstName}
                onChange={(e) => setUpdatePersonalInfo({ ...updatePersonalInfo, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={updatePersonalInfo.lastName}
                onChange={(e) => setUpdatePersonalInfo({ ...updatePersonalInfo, lastName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={updatePersonalInfo.emailAddress}
                onChange={(e) => setUpdatePersonalInfo({ ...updatePersonalInfo, emailAddress: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={updatePersonalInfo.phoneNumber}
                onChange={(e) => setUpdatePersonalInfo({ ...updatePersonalInfo, phoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={updatePersonalInfo.gender}
                onChange={(e) => setUpdatePersonalInfo({ ...updatePersonalInfo, gender: e.target.value })}
              >
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPersonalModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatePersonalSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for updating company info */}
      <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Company Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={updateCompanyInfo.companyName}
                onChange={(e) => setUpdateCompanyInfo({ ...updateCompanyInfo, companyName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Address</Form.Label>
              <Form.Control
                type="text"
                value={updateCompanyInfo.companyAddress}
                onChange={(e) => setUpdateCompanyInfo({ ...updateCompanyInfo, companyAddress: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={updateCompanyInfo.companyPhoneNumber}
                onChange={(e) => setUpdateCompanyInfo({ ...updateCompanyInfo, companyPhoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Service</Form.Label>
              <Form.Control
                type="text"
                value={updateCompanyInfo.companyService}
                onChange={(e) => setUpdateCompanyInfo({ ...updateCompanyInfo, companyService: e.target.value })}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompanyModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateCompanySubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
