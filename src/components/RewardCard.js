import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Progress } from "flowbite-react";
import Rating from '@mui/material/Rating';
import {
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';


const CustomerRewardPage = () => {

  const [value, setValue] = useState(3);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');


  useEffect(() => {

    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    console.log('Fetching profile data for user ID : ', userId);

    fetch(`http://localhost:1991/api/v1/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Server response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User data received:', data);
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId, token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card style={{ backgroundColor: '#3B71CA', color: 'white' }}>
        <Card.Header>
          <strong> Customer Reward   </strong>

        </Card.Header>
        <Card.Body>
         
          <Card.Text>
            <strong>Set Reward Points:</strong> {user.customerReward.customerRewardEmailAddress}
          </Card.Text>
          <Card.Text>
            
            <strong>you need 5 stars to claim your reward</strong>{' '}
            
          </Card.Text>


          {/* Display the Rating */}
          <Card.Text>
            <strong>Points:</strong>
            <Rating name="read-only" value={user.customerReward.rewardPointCurrent} readOnly />
          </Card.Text>

          <Card.Text>
            <strong>Last update</strong> {user.customerReward.formattedDate}
          </Card.Text>

        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomerRewardPage;
