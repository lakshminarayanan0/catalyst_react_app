import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { RiHome2Line, RiUserLine} from 'react-icons/ri'; 

function BottomNavBar() {
  const navigate = useNavigate();
  const handleNavClick = (link) => {
    switch (link) { 
      case 'home':
        navigate('/app/');
        break;
      case 'profile':
        navigate('/app/user-profile');
        break;
      default:
        break;
    }
  };

  return (
    <Navbar fixed="bottom" bg="dark" variant="dark" style={{height:"10%"}}>
      <Nav className="mx-auto w-100" style={{ justifyContent: 'space-around' }}>
        <Nav.Link title="Home" onClick={() => handleNavClick('home')}><RiHome2Line size={24} /></Nav.Link>
        <Nav.Link title="Profile" onClick={() => handleNavClick('profile')}><RiUserLine size={24} /></Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default BottomNavBar;
