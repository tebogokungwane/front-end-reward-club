import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import {

  MDBCardBody,
  MDBCardImage,
  MDBBtn,

} from 'mdb-react-ui-kit';
import CustomerRewardPage from './RewardCard';
import Company from './Company';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ChatBox from './ChatBox';


export default function User() {
  const [user, setUser] = useState(null);
  const [setUsers] = useState([]);
  const [updateItem, setUpdateItem] = useState({
    id: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    gender: ''
  });
  //const [selectedSection, setSelectedSection] = useState('profile');
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId || !token) {
      console.error('User ID or token not found in localStorage');
      return;
    }

    const fetchUserData = async () => {
      try {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUsers = async () => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users`);
        setUsers(response.data.content);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData();
    fetchUsers();
  }, [userId, token]);

  const handleUpdateSubmit = () => {
    axios

      .put( `${process.env.REACT_APP_API_URL}/api/v1/updateCustomer/${updateItem.id}`, {
        firstName: updateItem.firstName,
        lastName: updateItem.lastName,
        emailAddress: updateItem.emailAddress,
        phoneNumber: updateItem.phoneNumber,
        gender: updateItem.gender
      })
      .then(() => {
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  const handleOpenModal = (userData) => {
    setUpdateItem({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      emailAddress: userData.emailAddress,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender
    });
    setShowModal(true);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section>
        <MDBCardBody className="text-center">
          <Card.Header>
            <strong> Profile</strong>

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
          <div className="d-flex justify-content-center mb-2">
            <MDBBtn color="success" rounded size="sm" onClick={() => handleOpenModal(user)}>
              <FaEdit /> UPDATE
            </MDBBtn>
            <MDBBtn outline className="ms-1">
              <FaTrashAlt /> DELETE
            </MDBBtn>
          </div>
        </MDBCardBody>

      {showModal && (
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateItem.firstName}
                      onChange={(e) => setUpdateItem({ ...updateItem, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateItem.lastName}
                      onChange={(e) => setUpdateItem({ ...updateItem, lastName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={updateItem.emailAddress}
                      onChange={(e) => setUpdateItem({ ...updateItem, emailAddress: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateItem.phoneNumber}
                      onChange={(e) => setUpdateItem({ ...updateItem, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="form-select"
                      value={updateItem.gender}
                      onChange={(e) => setUpdateItem({ ...updateItem, gender: e.target.value })}
                    >
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
      )}
    </section>
  );
}
