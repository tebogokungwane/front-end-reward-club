import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { FaPowerOff, FaBars } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import CustomerRewardPage from './RewardCard';
// import CustomerRewardSettings from './RewardCardSettings';
import Company from './Company';
import ChatBox from './ChatBox';
import User from './User';
import About from './About';
import ViewUsers from './ViewUsers';
import MyCustomersByCompany from './MyCustomers';
import AddUser from './AddUser';
import AddAdmin from './AddAdmin';
import MyCustomers from './ViewMyCustomers';

export default function ProfilePage() {
  const [selectedSection, setSelectedSection] = useState('profile');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false); // State for navbar collapse

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
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId, token]);

  const handleNavigation = (section) => {
    setSelectedSection(section);
    setShowNav(false); // Close navbar after navigation on small screens
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MDBContainer className="py-3">
      {/* Navbar */}
      <MDBNavbar expand="lg" light bgColor="light" className="mb-4">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Reward Club</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNav(!showNav)}
          >
            <FaBars />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">

              
              <MDBNavbarItem>
                <MDBNavbarLink
                  active={selectedSection === 'profile'}
                  onClick={() => handleNavigation('profile')}
                  style={{ cursor: 'pointer', fontWeight: selectedSection === 'profile' ? 'bold' : 'normal' }}
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>


              {user?.role === 'ADMIN' && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active={selectedSection === 'addUser'}
                      onClick={() => handleNavigation('addUser')}
                      style={{ cursor: 'pointer', fontWeight: selectedSection === 'addUser' ? 'bold' : 'normal' }}
                    >
                      Add Customer
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  


                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active={selectedSection === 'MyCustomers'}
                      onClick={() => handleNavigation('MyCustomers')}
                      style={{ cursor: 'pointer', fontWeight: selectedSection === 'MyCustomers' ? 'bold' : 'normal' }}
                    >
                      My Customers
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}






              {user?.role === 'MANAGEMENT' && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active={selectedSection === 'ViewUsers'}
                      onClick={() => handleNavigation('ViewUsers')}
                      style={{ cursor: 'pointer', fontWeight: selectedSection === 'ViewUsers' ? 'bold' : 'normal' }}
                    >
                      Customers
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  

                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active={selectedSection === 'addAdmin'}
                      onClick={() => handleNavigation('addAdmin')}
                      style={{ cursor: 'pointer', fontWeight: selectedSection === 'addAdmin' ? 'bold' : 'normal' }}
                    >
                      Add Admin
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                
                </>
              )}






              {user?.role === 'CUSTOMER' && (
                <>
                </>
              )}

              <MDBNavbarItem>
                <MDBNavbarLink
                  active={selectedSection === 'about'}
                  onClick={() => handleNavigation('about')}
                  style={{ cursor: 'pointer', fontWeight: selectedSection === 'about' ? 'bold' : 'normal' }}
                >
                  About
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            {/* Logout Button for Large Screens */}
            <MDBBtn
              color='danger'
              onClick={handleLogout}
              className='d-none d-lg-flex align-items-center justify-content-center'
              style={{ borderRadius: '100%' }}
            >
              <FaPowerOff style={{ color: 'white' }} />
            </MDBBtn>

            {/* Logout Button inside Navbar Collapse for Small Screens */}
            <MDBBtn
              color='danger'
              onClick={handleLogout}
              className='d-lg-none mt-3'
              style={{ width: '100%', borderRadius: '5px' }}
            >
              <FaPowerOff style={{ color: 'white', marginRight: '5px' }} />
              Logout
            </MDBBtn>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      {/* Main Content */}
      <MDBContainer>
        {selectedSection === 'profile' && (
          <MDBRow>
            <MDBCol md="4">
              <MDBCard className="mb-4 mb-md-0">
                <User />
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <div className="App">
                <Company />
              </div>

              <MDBRow>
           

                {user?.role === 'CUSTOMER' && (
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                      <CustomerRewardPage />
                    </MDBCard>
                  </MDBCol>
                )}

                <MDBCol md="6">
                  <div className="App">
                    <ChatBox />
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        )}

        {selectedSection === 'about' && (
          <MDBRow>
            <MDBCol>
              <About />
            </MDBCol>
          </MDBRow>
        )}

        {selectedSection === 'ViewUsers' && (
          <MDBRow>
            <MDBCol>
              <ViewUsers />
            </MDBCol>
          </MDBRow>
        )}

        {selectedSection === 'addUser' && (
          <MDBRow>
            <MDBCol>
              <AddUser />
            </MDBCol>
          </MDBRow>
        )}

        {selectedSection === 'addAdmin' && (
          <MDBRow>
            <MDBCol>
              <AddAdmin />
            </MDBCol>
          </MDBRow>
        )}

        {selectedSection === 'MyCustomers' && (
          <MDBRow>
            <MDBCol>
              <MyCustomers />
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    </MDBContainer>
  );
}
