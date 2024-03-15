import React from 'react';
import { Navbar, Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Power } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

function Header() 
{
  let currentUser=
  {
    firstName:"Account",
    lastName:"User"
  }
  const loginUser=useSelector(state=>state.user.user)
  if(loginUser.firstName && loginUser.lastName)
  {
    currentUser=loginUser
  }

  const getUserInitials = (firstName, lastName) => 
  {
    console.log(firstName,lastName);
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
  };

  function logout()
  {
    const redirectURL = "/__catalyst/auth/login";
    const auth = window.catalyst.auth;
    auth.signOut(redirectURL);
  }

  return (
    <Navbar fixed='top' bg="dark" variant="dark" className="p-3" style={{height:"10%"}}>
      <Container>
        <Navbar.Brand className='fw-bold fs-4' style={{cursor:"pointer"}}>My App</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip" className='text-white'>{`${currentUser.firstName} ${currentUser.lastName}`}</Tooltip>}
          >
            <div className="d-flex align-items-center mx-3 p-1 bg-white" style={{ cursor: "pointer",borderRadius:"50%" }}>
              <span className='fw-bold'>{getUserInitials(currentUser.firstName, currentUser.lastName)}</span>
            </div>
          </OverlayTrigger>
          <Button
            variant="danger"
            style={{ borderRadius: '50%', minWidth: '35px', height: '35px' }}
            className="d-flex align-items-center justify-content-center"
            title="Logout"
            onClick={() => logout()} 
          >
            <Power size={10} />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
