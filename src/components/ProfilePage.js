// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProfilePage from './ProfilePage';

// function App() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.post('http://localhost:1991/api/v1/signin', {
//           emailAddress: 'kwinda@example.com',
//           password: 'password123',
//         });
//         setUser(response.data); // Update setUser with the entire response data
//       } catch (error) {
//         setError('Error fetching user data');
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div>
//       {error && <div>{error}</div>}
//       {user ? <ProfilePage user={user} /> : <div>Loading...</div>}
//     </div>
//   );
// }

// export default App;
