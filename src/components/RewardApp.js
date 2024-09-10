import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Footer from './Footer';
// import Header from './Header';
import Error from './Error';
import Home from './Home';
import ViewUsers from './ViewUsers';
import Login from './Login';
import Register from './Register';
import AddUser from './AddUser';
import RewardCard from './RewardCard';
import AddAdmin from './AddAdmin';
import Profile from './Profile';
import About from './About';
import ForgotPassword from './ForgotPassword';
import { AuthProvider, useAuth } from './AuthContext';

function RewardApp() {
  return (
    <div className="RewardApp">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout><Login /></Layout>} />
            <Route path='/login' element={<Layout><Login /></Layout>} />
            <Route path='/home' element={<Layout><Home /></Layout>} />
            <Route path='/viewUsers' element={<Layout><ViewUsers /></Layout>} />
            <Route path='/addUser' element={<Layout><AddUser /></Layout>} />
            <Route path='/addAdmin' element={<Layout><AddAdmin /></Layout>} />
            <Route path='/register' element={<Layout><Register /></Layout>} />
            <Route path='/rewardCard' element={<Layout><RewardCard /></Layout>} />
            <Route path='/profile' element={<Layout><ProfileWithData /></Layout>} />
            <Route path='/about' element={<Layout><About /></Layout>} />
            <Route path='/*' element={<Layout><Error /></Layout>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

// Create a ProfileWithData component that fetches user data from the context
function ProfileWithData() {
  const { user } = useAuth();
  return <Profile user={user} />;
}

// Create a Layout component that conditionally renders Header and Footer
function Layout({ children }) {
//  const location = useLocation();
//   const hideForRoutes = ['/', '/login']; // Add  routes where you want to hide Header and Footer

  return (
    <div>
      {/* {!hideForRoutes.includes(location.pathname) && <Header />} */}
      {children}
      {/* {!hideForRoutes.includes(location.pathname) && <Footer />} */}
    </div>
  );
}

export default RewardApp;
