// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import Rating from '@mui/material/Rating';

// const CustomerRewardSettings = () => {
//   const [value, setValue] = useState(3);
//   const [user, setUser] = useState(null);
//   const [rewardPointsTarget, setRewardPointsTarget] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!userId) {
//       console.error('User ID not found in local storage');
//       return;
//     }

//     console.log('Fetching profile data for user ID:', userId);

//     fetch(`http://localhost:1991/api/v1/profile/${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then((response) => {
//         console.log('Server response:', response);
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('User data received:', data);
//         setUser(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [userId, token]);

//   const handleUpdate = () => {
//     if (rewardPointsTarget <= 0) {
//       alert('Please enter a valid reward points target.');
//       return;
//     }

//     setLoading(true);

//     fetch(`http://localhost:1991/api/v1/customers/updateRewardPoints`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         rewardPointsTarget
//       })
//     })
//       .then((response) => {
//         setLoading(false);
//         if (!response.ok) {
//           throw new Error('Failed to update reward points target');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('Update successful:', data);
//         alert('Reward points target updated successfully!');
//         setUser((prevState) => ({
//           ...prevState,
//           customerReward: {
//             ...prevState.customerReward,
//             rewardPointsTarget
//           }
//         }));
//       })
//       .catch((error) => {
//         console.error('Error updating reward points target:', error);
//         alert('Failed to update reward points target');
//       });
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Card style={{ backgroundColor: '#3B71CA', color: 'white' }}>
//         <Card.Header>
//           <strong>Customer Reward Settings</strong>
//         </Card.Header>
//         <Card.Body>
          
//           <Card.Text>
//             <strong>Current Reward Points Target:</strong> {user.customerReward.rewardPointsTarget}
//           </Card.Text>

//           <Form.Group>
//             <Form.Label><strong>Set New Reward Points Target:</strong></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter new reward points target"
//               value={rewardPointsTarget}
//               onChange={(e) => setRewardPointsTarget(e.target.value)}
//             />
//           </Form.Group>

//           <Button
//             variant="primary"
//             onClick={handleUpdate}
//             disabled={loading}
//             style={{ marginTop: '15px' }}
//           >
//             {loading ? 'Updating...' : 'Update Reward Points Target'}
//           </Button>

//           <Card.Text style={{ marginTop: '15px' }}>
//             <strong>Rating:</strong>
//             <Rating name="read-only" value={value} readOnly />
//           </Card.Text>

          
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default CustomerRewardSettings;
