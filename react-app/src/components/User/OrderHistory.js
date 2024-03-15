import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { cancelOrder } from '../../app store/slices/orderSlice';

function OrderHistory() {
  const orders=useSelector(state=>state.orders.orders)
  const loading=useSelector(state=>state.orders.loading)
  const dispatch = useDispatch();

  const handleCancelOrder = async (orderId) => {
    await dispatch(cancelOrder(orderId)); 
  };

  return (
    <Container className='mt-3 mb-5 py-3' style={{ height: "80%" }}>
      {loading ? 
      (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center bg-white" style={{ height: "80vh",opacity:0.7 }}>
          <strong className='text-danger'>cancelling Order</strong>
          <Spinner animation="border" className="text-danger" variant="danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : 
      (
        <>
        <h3 className="mt-5 mb-4">Order History</h3>
        <div className="order-scroll" style={{ height: "60vh", overflow: "auto" }}>
        {orders.map(order => (
            <Card key={order.orderId} className="mb-3">
              <Card.Body>
                <Row>
                  <Col>
                    <h5>Order ID: {order.orderId}</h5>
                    <p>Order Date: {order.createdAt}</p>
                    <p>Status: {order.status}</p>
                  </Col>
                  <Col className='float-end'>
                    <h4>Rs.{parseFloat(order.total).toFixed(2)}/-</h4>
                    {order.status === "placed" || order.status === "dispatched" ? (
                      loading ? (
                        <Button variant="danger" disabled>Cancel Order</Button>
                      ) : (
                        <Button variant="danger" onClick={() => handleCancelOrder(order.orderId)}>Cancel Order</Button>
                      )
                    ) : null}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          
        </div>
        </>

      )}
     
    </Container>
  );
}

export default OrderHistory;
