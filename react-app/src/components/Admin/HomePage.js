import React from 'react'
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { Container } from 'react-bootstrap';

function Homepage() 
{
  return (
    <Container fluid className='pb-3 pt-3 mt-5' style={{height:"80vh",overflow:"auto"}}>
      <AddProduct />
      <ProductList/>
    </Container>
  )
}

export default Homepage
