import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { RiHome2Line, RiUserLine, RiShoppingCart2Line, RiHistoryLine } from 'react-icons/ri'; 
import { useSelector } from 'react-redux';

function BottomNavBar() {
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.cartCount);

  const handleNavClick = (link) => {
    switch (link) { 
      case 'home':
        navigate('/app/');
        break;
      case 'profile':
        navigate('/app/user-profile');
        break;
      case 'orders':
        navigate('/app/order-history');
        break;
      case 'cart':
        navigate('/app/cart');
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
        <Nav.Link title="Order History" onClick={() => handleNavClick('orders')}><RiHistoryLine size={24} /></Nav.Link>
        <Nav.Link title="Cart" onClick={() => handleNavClick('cart')} className="position-relative">
          <RiShoppingCart2Line size={24} />
          {cartCount > 0 && <Badge pill variant="primary" className="bg-light text-dark top-0 start-100 translate-middle badge-top badge-sm">{cartCount}</Badge>}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default BottomNavBar;
