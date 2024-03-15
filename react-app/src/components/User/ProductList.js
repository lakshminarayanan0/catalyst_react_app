import React from 'react';
import { Container } from 'react-bootstrap';
import Product from './Product';
import { useSelector } from 'react-redux';

function ProductList() {
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  return (
    <Container fluid className='product-list-container py-4 my-5' style={{height:"80%",overflow:"auto"}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='product-list'>
          {products.map((product) => (
            
            <Product key={product.products.ROWID} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default ProductList;
