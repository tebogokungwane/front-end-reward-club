import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import AnimatedPage from "./AnimatedPage";


const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAdmins();
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(admins.length / itemsPerPage));
  }, [admins]);

  const fetchAdmins = () => {
    axios
      .get('http://localhost:1991/api/v1/users')  // Replace with your API endpoint to get users
      .then(response => {
        const adminsData = response.data.content || response.data;
        // Filter only admins from the list
        const filteredAdmins = adminsData.filter(user => user.role === 'ADMIN');
        setAdmins(filteredAdmins);
        if (filteredAdmins.length === 0) {
          console.log('No admins found.');
        }
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
        setAdmins([]);
      });
  };

  const getRandomColor = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDelete = id => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      axios
        .delete(`http://localhost:1991/api/v1/deleteAdmin/${deleteItemId}`)  // Adjust endpoint if necessary
        .then(() => {
          fetchAdmins();
          setDeleteItemId(null);
          setShowDeleteModal(false);
        })
        .catch(error => {
          console.error('Error deleting admin:', error);
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

  const filteredAdmins = admins.filter(admin => {
    const fullName = `${admin.firstName} ${admin.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

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
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentItems.map(admin => (
              <tr key={admin.id}>
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
                    {admin.firstName?.charAt(0)}
                    {admin.lastName?.charAt(0)}
                  </div>
                </td>
                <td>
                  <div>
                    <p className="fw-bold mb-1" style={{ marginBottom: '0', fontSize: '16px' }}>
                      {admin.firstName} {admin.lastName}
                    </p>
                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                      {admin.emailAddress}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{admin.gender}</p>
                </td>
                <td>
                  <p className="text-muted mb-0" style={{ fontSize: '14px' }}>{admin.emailAddress}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1" style={{ fontSize: '14px' }}>{admin.phoneNumber || 'N/A'}</p>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MDBBtn color="success" rounded size="sm">
                      <FaEdit /> UPDATE
                    </MDBBtn>
                    <MDBBtn color="danger" rounded size="sm" onClick={() => handleDelete(admin.id)}>
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
                <p>Are you sure you want to delete this admin?</p>
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
};

export default AdminTable;
