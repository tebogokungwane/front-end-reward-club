import React, { useState, useEffect } from 'react';
import {  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {  FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import Rating from '@mui/material/Rating';
import { Modal, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import AnimatedPage from "./AnimatedPage";


const ViewMyCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showReward, setShowReward] = useState(null); // State to track which customer's reward is being shown
  const itemsPerPage = 5;
  const [errorMessage, setErrorMessage] = useState(''); // State to store the error message


  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const companyEmail = decodedToken.sub;

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(customers.length / itemsPerPage));
  }, [customers]);

  const fetchCustomers = () => {
    axios

      .get(`${process.env.REACT_APP_API_URL}/api/v1/company/customers?companyEmail=${companyEmail}`)
      .then(response => {
        const customersData = response.data.content || response.data;
        setCustomers(customersData);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setCustomers([]);
      });
  };

  const handleDelete = id => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      axios

        .delete(`${process.env.REACT_APP_API_URL}/api/v1/deleteCustomer/${deleteItemId}`)
        .then(() => {
          fetchCustomers();
          setDeleteItemId(null);
          setShowDeleteModal(false);
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
    }
  };

  const cancelDelete = () => {
    setDeleteItemId(null);
    setShowDeleteModal(false);
  };

  const handleSearch = e => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleShowReward = id => {
    setShowReward(prevId => (prevId === id ? null : id));
  };

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);


  const handleRatingClick = (customer) => {
    setSelectedCustomer(customer);
    setShowConfirmModal(true);
  };


  const handleConfirm = () => {
    if (selectedCustomer) {
      const updatedCustomer = {
        ...selectedCustomer,
        customerReward: {
          ...selectedCustomer.customerReward,
          rewardPointsTarget: selectedCustomer.customerReward.rewardPointsTarget + 1
        }
      };

      axios

        .put(`${process.env.REACT_APP_API_URL}/api/v1/updateMyCustomersTargetRewardPoint/${selectedCustomer.id}`, updatedCustomer)
        .then(() => {
          fetchCustomers();
          setShowConfirmModal(false);
          setSelectedCustomer(null);
          setErrorMessage('');
        })
        .catch((error) => {
          console.error('Error updating customer reward points:', error);
          if (error.response && error.response.data) {
            // Assuming the backend error message is sent as a string in the response data
            setErrorMessage(error.response.data.error || 'An error occurred while updating the reward points.');
          } else {
            setErrorMessage('An unexpected error occurred. Please try again later.');
          }
        });
    }
  };



  const handleCancel = () => {
    setShowConfirmModal(false);
    setSelectedCustomer(null);
    setErrorMessage('');

  };

  return (
    <AnimatedPage>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
      <div style={{ width: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', overflowX: 'auto' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <MDBTable className="table-responsive" style={{ borderRadius: '10px', minWidth: '600px', backgroundColor: 'white' }}>
          <MDBTableHead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name & Surname</th>
              <th scope="col">Gender</th>
              <th scope="col">Points</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentItems.map(customer => (
              <tr key={customer.id}>
                <td style={{ padding: '5px', width: '60px' }}>
                  <div
                    style={{
                      width: '45px',
                      height: '45px',
                      //backgroundColor: getRandomColor(),
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#fff'
                    }}
                  >
                    {customer.firstName?.charAt(0)}
                    {customer.lastName?.charAt(0)}
                  </div>
                </td>
                <td>
                  <div>
                    <p className="fw-bold mb-1" style={{ marginBottom: '0', fontSize: '16px' }}>
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                      {customer.emailAddress}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{customer.gender}</p>
                </td>
                <td>
                  {/* <p className="text-muted mb-0" style={{ fontSize: '14px' }}>{customer.emailAddress}</p> */}

                  <Card.Text style={{ marginTop: '15px' }}>
                    <Rating name="read-only" value={customer.customerReward.rewardPointCurrent} readOnly />
                  </Card.Text>

                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{customer.phoneNumber || 'N/A'}</p>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MDBBtn
                      color="success"
                      rounded
                      size="sm"
                      onClick={() => handleShowReward(customer.id)}
                      disabled={customer.emailAddress === companyEmail}
                    >
                      <FaEye /> More
                    </MDBBtn>
                    <MDBBtn color="danger" rounded size="sm" onClick={() => handleDelete(customer.id)}

                      disabled={customer.emailAddress === companyEmail} // Disable "More" button for logged-in user
                    >
                      <FaTrashAlt /> DELETE
                    </MDBBtn>
                  </div>
                  {showReward === customer.id && (
                    <div style={{ marginTop: '10px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
                      <p><strong>Reward Points Target:</strong> {customer.customerReward.rewardPointsTarget}</p>
                      <p><strong>Current Reward Points:</strong> {customer.customerReward.rewardPointCurrent}</p>
                      {/* <p><strong>Last Update:</strong> {customer.customerReward.formattedDate}</p> */}
                      <Rating name="size-large" value={customer.customerReward.rewardPointCurrent} size="large" onClick={() => handleRatingClick(customer)} />

                    </div>
                  )}
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', backgroundColor: 'white' }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {showDeleteModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Confirmation</h5>
                <button type="button" className="btn-close" onClick={cancelDelete} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this customer?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      <Modal show={showConfirmModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to add a star to {selectedCustomer?.firstName} {selectedCustomer?.lastName}?</p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </AnimatedPage>

  );
};

export default ViewMyCustomers;
