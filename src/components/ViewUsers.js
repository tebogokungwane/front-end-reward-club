import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import AnimatedPage from "./AnimatedPage";


const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / itemsPerPage));
  }, [users]);

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

  const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleUpdate = id => {
    const userToUpdate = users.find(user => user.id === id);
    setUpdateItem(userToUpdate);
    setShowModal(true);
  };

  const handleDelete = id => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      axios
        .delete(`http://localhost:1991/api/v1/deleteCustomer/${deleteItemId}`)
        .then(() => {
          fetchUsers();
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

  const [showModal, setShowModal] = useState(false);
  const [updateItem, setUpdateItem] = useState({
    id: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    role: '',
    active: ''
  });

  const closeUpdateModal = () => {
    setShowModal(false);
  };

  const handleUpdateSubmit = () => {
    axios
      .put(`http://localhost:1991/api/v1/updateCustomer/${updateItem.id}`, {
        role: updateItem.role,
        active: updateItem.active
      })
      .then(() => {
        fetchUsers();
        closeUpdateModal();
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  const handleSearch = e => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.length > 0
    ? users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = page => {
    setCurrentPage(page);
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
              <th scope="col">Role</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Status</th>
              <th scope="col">Company Name</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentItems.map(user => (
              <tr key={user.id}>
                <td style={{ padding: '5px', width: '60px' }}>
                  <div
                    style={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: getRandomColor(),
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#fff'
                    }}
                  >
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </div>
                </td>
                <td>
                  <div>
                    <p className="fw-bold mb-1" style={{ marginBottom: '0', fontSize: '16px' }}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                      {user.emailAddress}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{user.role}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{user.gender}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{user.phoneNumber}</p>
                </td>
                <td>
                  <MDBBadge color="" pill>
                    <span className="fw-normal mb-1" style={{ color: 'white', backgroundColor: user.active ? 'green' : 'red', padding: '5px 10px', borderRadius: '12px', fontSize: '14px' }}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </MDBBadge>


                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{user.company.companyName}</p>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MDBBtn color="success" rounded size="sm" onClick={() => handleUpdate(user.id)}>
                      <FaEdit /> UPDATE
                    </MDBBtn>
                    <MDBBtn color="danger" rounded size="sm" onClick={() => handleDelete(user.id)}>
                      <FaTrashAlt /> DELETE
                    </MDBBtn>
                  </div>
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
                  <button className="page-link" onClick={() => changePage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button type="button" className="close" onClick={closeUpdateModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    value={updateItem.role}
                    onChange={e => setUpdateItem({ ...updateItem, role: e.target.value })}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={updateItem.active}
                    onChange={e => setUpdateItem({ ...updateItem, active: e.target.value === 'true' })}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeUpdateModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
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
                <p>Are you sure you want to delete this user?</p>
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
    </div>
    </AnimatedPage>

  );
}

export default ViewUsers;



