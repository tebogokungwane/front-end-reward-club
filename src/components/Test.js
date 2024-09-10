// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { BsTrash } from 'react-icons/bs';
// import { RiPencilLine } from 'react-icons/ri';

// function Admin() {
//   const [payload, setPayload] = useState([]);
//   const [deleteItemId, setDeleteItemId] = useState(null); // Store the ID of the item to be deleted
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // Control the delete confirmation modal

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios
//       .get('http://localhost:5050/api/v1/users')
//       .then(response => {
//         console.log('Response data:', response.data);
//         const payloadData = response.data.content; // Access the content array within the response object
//         console.log('Payload data:', payloadData);
//         setPayload(payloadData);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   const handleDelete = (itemId) => {
//     setDeleteItemId(itemId);
//     setShowDeleteModal(true); // Open the delete confirmation modal
//   };

//   const handleConfirmDelete = () => {
//     axios
//       .delete(`http://localhost:5050/api/v1/deleteCustomer/${deleteItemId}`)
//       .then(() => {
//         closeDeleteModal();
//         fetchData(); // Fetch updated data after successful deletion
//       })
//       .catch(error => {
//         console.error('Error deleting item:', error);
//       });
//   };

//   const closeDeleteModal = () => {
//     setDeleteItemId(null);
//     setShowDeleteModal(false); // Close the delete confirmation modal
//   };

//   const [showModal, setShowModal] = useState(false);
//   const [updateItem, setUpdateItem] = useState({
//     id: '',
//     firstName: '',
//     lastName: '',
//     emailAddress: '',
//     phoneNumber: '',
//     role: '',
//     gender: '',
//     status: false
//   });

//   const openUpdateModal = (item) => {
//     setUpdateItem(item);
//     setShowModal(true);
//   };

//   const closeUpdateModal = () => {
//     setShowModal(false);
//   };

//   const handleUpdate = () => {
//     axios
//       .put(`http://localhost:5050/api/v1/updateCustomer/${updateItem.id}`, updateItem)
//       .then(() => {
//         closeUpdateModal();
//         fetchData(); // Fetch updated data after successful update
//       })
//       .catch(error => {
//         console.error('Error updating item:', error);
//       });
//   };

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const openCreateModal = () => {
//     setShowCreateModal(true);
//   };

//   const closeCreateModal = () => {
//     setShowCreateModal(false);
//   };

//   const [newItem, setNewItem] = useState({
//     firstName: '',
//     lastName: '',
//     emailAddress: '',
//     role: '',
//     active: '',

//   });

//   const handleCreate = () => {
//     axios
//       .post('http://localhost:8085/api/v1/todo', newItem)
//       .then(() => {
//         closeCreateModal();
//         fetchData(); // Fetch updated data after successful creation
//       })
//       .catch(error => {
//         console.error('Error creating item:', error);
//       });
//   };

//   return (
//     <div className="container">
//       <div className="d-grid gap-3 mt-3">
//         <Button variant="primary" size="lg" onClick={openCreateModal}>
//           Create to-do item
//         </Button>
//       </div>

//       <Modal show={showCreateModal} onHide={closeCreateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Item</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="description">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter description"
//                 value={newItem.description}
//                 onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="targetDate">
//               <Form.Label>Target Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={newItem.targetDate}
//                 onChange={(e) => setNewItem({ ...newItem, targetDate: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="status">
//               <Form.Check
//                 type="checkbox"
//                 label="Completed"
//                 checked={newItem.status}
//                 onChange={(e) => setNewItem({ ...newItem, status: e.target.checked })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeCreateModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleCreate}>
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <div className="text-center mb-4" style={{ color: 'white' }}>
//         <h2>All Customers</h2>
//       </div>

//       <div>
//         <table className="table table-dark">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email Address</th>
//               <th>Cell Number</th>
//               <th>Gender</th>
//               <th>Role</th>
//               <th>Date Created</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(payload) &&
//               payload.map(user => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.firstName}</td>
//                   <td>{user.lastName}</td>
//                   <td>{user.emailAddress}</td>
//                   <td>{user.phoneNumber}</td>
//                   <td>{user.gender}</td>
//                   <td>{user.role}</td>
//                   <td>{user.dateCreated}</td>
//                   <td style={{ color: user.active ? 'green' : 'red' }}>
//                     {user.active ? 'Active' : 'Inactive'}
//                   </td>
//                   <td>
//                     <span
//                       className="text-danger"
//                       onClick={() => handleDelete(user.id)}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <BsTrash />
//                     </span>
//                     <span
//                       style={{
//                         color: 'yellow',
//                         marginLeft: '10px',
//                         cursor: 'pointer'
//                       }}
//                       onClick={() => openUpdateModal(user)}
//                     >
//                       <RiPencilLine />
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>

//         <Modal show={showModal} onHide={closeUpdateModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Update User</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="firstName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter description"
//                   value={updateItem.firstName}
//                   onChange={(e) =>
//                     setUpdateItem({ ...updateItem, firstName: e.target.value })
//                   }
//                 />
//               </Form.Group>
//               <Form.Group controlId="lastName">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={updateItem.lastName}
//                   onChange={(e) =>
//                     setUpdateItem({ ...updateItem, lastName: e.target.value })
//                   }
//                 />
//               </Form.Group>




//               <Form.Group controlId="role">
//                 <Form.Label>Role</Form.Label>
//                 <Form.Select
//                   value={updateItem.role}
//                   onChange={(e) => setUpdateItem({ ...updateItem, role: e.target.value })}
//                 >
//                   <option value="ADMIN">Admin</option>
//                   <option value="MANAGER">User</option>
//                   <option value="CUSTOMER">Customer</option>

//                 </Form.Select>
//               </Form.Group>


//               <Form.Group controlId="active">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select
//                   value={updateItem.active !== undefined ? updateItem.active.toString() : ''}
//                   onChange={(e) =>
//                     setUpdateItem({ ...updateItem, active: e.target.value === 'true' })
//                   }
//                 >
//                   <option value="true">Active</option>
//                   <option value="false">Inactive</option>
//                 </Form.Select>
//               </Form.Group>


//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={closeUpdateModal}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handleUpdate}>
//               Update
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showDeleteModal} onHide={closeDeleteModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Delete User</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Are you sure you want to delete this user?
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={closeDeleteModal}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleConfirmDelete}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default Admin;
