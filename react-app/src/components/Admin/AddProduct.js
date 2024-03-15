import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../app store/slices/productSlice'; 

function AddProduct() {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addProduct({ productName, price, stockQuantity }));

    setProductName('');
    setPrice('');
    setStockQuantity('');
  };

  return (
    <Container fluid className="p-2 bg-white" style={{ marginBottom: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
      <h4 className='text-center'>Add Products</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={6}>
            <Form.Group controlId="stockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className='p-2'>
            <Button variant="primary" className="mt-4 w-100" type="submit">Add</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddProduct;
