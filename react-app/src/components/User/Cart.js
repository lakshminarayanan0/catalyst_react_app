import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Container, Spinner} from 'react-bootstrap';
import { removeFromCart } from '../../app store/slices/cartSlice';
import { placeOrder } from '../../app store/slices/orderSlice';

function Cart() 
{
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const loading=useSelector(state=>state.orders.loading)
  const handleRemoveFromCart = (productId) => 
  {
    dispatch(removeFromCart(productId)); 
  };

  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.subtotal), 0).toFixed(2);

  const handlePlaceOrder = async() => 
  {
    const orderDetails=
    {
        orderedBy:user.ROWID,
        total:totalAmount,
        orderlist:cartItems
    }
    console.log(orderDetails);
    await dispatch(placeOrder(orderDetails))
  };

  return (
    <Container fluid className="py-5 my-4" style={{ height: "80%", display: "flex", flexDirection: "column" }}>
      {loading ? (
        <Container fluid className="d-flex justify-content-center align-items-center bg-white" style={{ height: "80vh",opacity:0.7 }}>
          <strong className='text-success'>Placing Order</strong>
          <Spinner animation="border" className="text-success" variant="success" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <Container fluid className='d-flex justify-content-center align-items-center' style={{ height: "400px" }}>
              <p>No products in cart</p>
            </Container>
          ) : (
            <Container fluid style={{ flex: "1" }}>
              <h1 className="mb-4">Shopping Cart</h1>
              <div className='cartList bg-white' style={{ height: "50vh", overflow: "auto" }}>
                <Table striped bordered hover style={{ height: "50vh", overflow: "auto" }}>
                  <thead className='sticky-top'>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.subtotal}</td>
                        <td>
                          <Button variant="danger" onClick={() => handleRemoveFromCart(item.productId)}>Remove</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="d-flex flex-column p-1 justify-content-around align-items-center mt-3">
                <p className="m-2 mr-3"><strong>Total:</strong> <span>Rs. {totalAmount}/-</span></p>
                <Button className='p-2' variant="success" onClick={handlePlaceOrder}>Place Order</Button>
              </div>
            </Container>
          )}
        </>
      )}
    </Container>
  );
}

export default Cart;
