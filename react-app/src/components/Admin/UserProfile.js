import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserProfile() {
  const currentUser=useSelector(state=>state.user.user)
  return (
    <Container className="py-5 my-5" style={{height:"80vh"}}>
      <Card className="p-4 shadow-sm">
        <div>
          <h1 className="mb-3 text-center">User Profile</h1>
          <p><strong>User ID:</strong> {currentUser.userId}</p>
          <p><strong>First Name:</strong> {currentUser.firstName}</p>
          <p><strong>Last Name:</strong> {currentUser.lastName}</p>
          <p><strong>Email:</strong> {currentUser.emailId}</p>
          <p><strong>Organization ID:</strong> {currentUser.orgId}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
        </div>
      </Card>
    </Container>
  );
}

export default UserProfile;
