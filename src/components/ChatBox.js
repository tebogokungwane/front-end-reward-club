import React from 'react';


import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardFooter,
  MDBInput
} from 'mdb-react-ui-kit';
import { Card } from 'react-bootstrap';



const ChatBox = () => {
  

  return (
    <MDBCard className="mb-4">
      <Card.Header>
        <strong> Chat Box   </strong>
      </Card.Header>
      <MDBCardBody className="chat-box-body" style={{ overflowY: 'scroll' }}>
        {/* Chat messages will go here */}
        <div className="chat-message">
          <strong>User 1:</strong> Hello!
        </div>
        <div className="chat-message">
          <strong>User 2:</strong> Hi there!
        </div>
      </MDBCardBody>
      <MDBCardFooter>
        <MDBInput
          type="text"
          id="chatInput"
          className="mb-2"
          placeholder="Type your message here..."
        />
        <MDBBtn color="primary">Send</MDBBtn>
      </MDBCardFooter>
    </MDBCard>

  );
};

export default ChatBox;
