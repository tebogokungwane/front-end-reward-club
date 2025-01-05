// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// export default function CustomerPage() {
//   const [customers, setCustomers] = useState([]);
//   const [updateItem, setUpdateItem] = useState({
//     id: '',
//     firstName: '',
//     lastName: '',
//     emailAddress: '',
//     phoneNumber: '',
//     gender: '',
//   });
//   const [showModal, setShowModal] = useState(false);

//   const companyEmail = 'mabasa23@example.com'; // Replace with dynamic email if needed
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:1991/api/v1/company/customers?companyEmail=${companyEmail}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setCustomers(response.data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     fetchCustomers();
//   }, [companyEmail, token]);

//   const handleUpdateSubmit = () => {
//     axios
//       .put(`http://localhost:1991/api/v1/updateCustomer/${updateItem.id}`, {
//         firstName: updateItem.firstName,
//         lastName: updateItem.lastName,
//         emailAddress: updateItem.emailAddress,
//         phoneNumber: updateItem.phoneNumber,
//         gender: updateItem.gender,
//       })
//       .then(() => {
//         setShowModal(false);
//         window.location.reload(); // Reload the page to reflect changes
//       })
//       .catch((error) => {
//         console.error('Error updating customer:', error);
//       });
//   };

//   const handleOpenModal = (customer) => {
//     setUpdateItem({
//       id: customer.id,
//       firstName: customer.firstName,
//       lastName: customer.lastName,
//       emailAddress: customer.emailAddress,
//       phoneNumber: customer.phoneNumber,
//       gender: customer.gender,
//     });
//     setShowModal(true);
//   };

//   return (
//     <section>
//       <MDBCardBody>
//         <h2 className="text-center">Customer List</h2>
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Gender</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer) => (
//               <tr key={customer.id}>
//                 <td>{`${customer.firstName} ${customer.lastName}`}</td>
//                 <td>{customer.emailAddress}</td>
//                 <td>{customer.phoneNumber}</td>
//                 <td>{customer.gender}</td>
//                 <td>
//                   <MDBBtn size="sm" color="success" onClick={() => handleOpenModal(customer)}>
//                     <FaEdit /> Edit
//                   </MDBBtn>
//                   <MDBBtn size="sm" outline color="danger" className="ms-2">
//                     <FaTrashAlt /> Delete
//                   </MDBBtn>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </MDBCardBody>

//       {showModal && (
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Update Customer</h5>
//               <button type="button" className="close" onClick={() => setShowModal(false)}>
//                 <span>&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="form-group">
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={updateItem.firstName}
//                     onChange={(e) => setUpdateItem({ ...updateItem, firstName: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={updateItem.lastName}
//                     onChange={(e) => setUpdateItem({ ...updateItem, lastName: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Email Address</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={updateItem.emailAddress}
//                     onChange={(e) => setUpdateItem({ ...updateItem, emailAddress: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Phone Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={updateItem.phoneNumber}
//                     onChange={(e) => setUpdateItem({ ...updateItem, phoneNumber: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Gender</label>
//                   <select
//                     className="form-select"
//                     value={updateItem.gender}
//                     onChange={(e) => setUpdateItem({ ...updateItem, gender: e.target.value })}
//                   >
//                     <option value="MALE">MALE</option>
//                     <option value="FEMALE">FEMALE</option>
//                   </select>
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                 Close
//               </button>
//               <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit}>
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
