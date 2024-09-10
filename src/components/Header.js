// import React, { useState, useEffect } from 'react';
// import { FcHome, FcViewDetails, FcLock } from 'react-icons/fc';
// import { useAuth } from './AuthContext';
// import { MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarToggler, MDBNavbarBrand, MDBCollapse } from 'mdb-react-ui-kit';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaPowerOff } from 'react-icons/fa';

// function Header() {
//   const [showNavColorThird, setShowNavColorThird] = useState(false);
//   const { user, logout } = useAuth(); // Added logout from useAuth
//   const isAdmin = user && user.role === 'ADMIN';
//   const navigate = useNavigate(); // Use navigate for redirecting

//   useEffect(() => {
//     if (user && user.role) {
//       console.log('User role:', user.role);
//     }
//     console.log('User object:', user);
//   }, [user]);

//   const handleLogout = () => {
//     logout(); // Perform logout
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <MDBNavbar expand='lg'>
//       <MDBContainer fluid>
//         <MDBNavbarBrand href='/welcome' style={{ color: 'black', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
//           REWARD CLUB
//         </MDBNavbarBrand>
//         <MDBNavbarToggler
//           type='button'
//           data-target='#navbarColor02'
//           aria-controls='navbarColor02'
//           aria-expanded='false'
//           aria-label='Toggle navigation'
//           onClick={() => setShowNavColorThird(!showNavColorThird)}
//         >
//           <MDBIcon icon='bars' fas />
//         </MDBNavbarToggler>
//         <MDBCollapse show={showNavColorThird} navbar>
//           <MDBNavbarNav className='ms-auto mb-2 mb-lg-0'>
//             <MDBNavbarItem>
//               <Link to='/welcome' className='nav-link' style={{ color: 'black' }}>
//                 <FcHome />Home
//               </Link>
//             </MDBNavbarItem>

//             <MDBNavbarItem>
//               <Link to='/rewardCard' className='nav-link' style={{ color: 'black' }}>
//                 <FcViewDetails />Reward Card
//               </Link>
//             </MDBNavbarItem>

//             {isAdmin && (
//               <>
//                 <MDBNavbarItem>
//                   <Link to='/admin' className='nav-link' style={{ color: 'black' }}>
//                     <FcViewDetails />Admin
//                   </Link>
//                 </MDBNavbarItem>

//                 <MDBNavbarItem>
//                   <Link to='/viewUsers' className='nav-link' style={{ color: 'black' }}>
//                     <FcViewDetails />View Users
//                   </Link>
//                 </MDBNavbarItem>

//                 <MDBNavbarItem>
//                   <Link to='/addUser' className='nav-link' style={{ color: 'black' }}>
//                     <FcViewDetails />Add User
//                   </Link>
//                 </MDBNavbarItem>

//                 <MDBNavbarItem>
//                   <Link to='/addAdmin' className='nav-link' style={{ color: 'black' }}>
//                     <FcViewDetails />Add Admin
//                   </Link>
//                 </MDBNavbarItem>
//               </>
//             )}

//             <MDBNavbarItem>
//               <Link to='/profile' className='nav-link' style={{ color: 'black' }}>
//                 <FcViewDetails />My Profile
//               </Link>
//             </MDBNavbarItem>

//             <MDBNavbarItem>
//               <Link to='/about' className='nav-link' style={{ color: 'black' }}>
//                 <FcLock />About Us
//               </Link>
//             </MDBNavbarItem>

//             <MDBNavbarItem>
//               <Link to='/addCustomer' className='nav-link' style={{ color: 'black' }}>
//                 <FcLock />Add Customer
//               </Link>
//             </MDBNavbarItem>

//             {/* Logout button */}
//             {/* <MDBNavbarItem className='ms-3'>
//               <MDBBtn color='danger' onClick={handleLogout} className='d-flex align-items-center justify-content-center' style={{ borderRadius: '50%' }}>
//                 <FaPowerOff style={{ color: 'white' }} />
//               </MDBBtn>
//             </MDBNavbarItem> */}

//           </MDBNavbarNav>
//         </MDBCollapse>
//       </MDBContainer>
//     </MDBNavbar>
//   );
// }

// export default Header;
