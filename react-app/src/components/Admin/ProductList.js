import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Product from './Product';
import { useSelector } from 'react-redux';

function ProductList() {
    const products=useSelector(state=>state.products.products)
    const isLoading=useSelector(state=>state.products.loading)
    const classname = isLoading ? "productLoader" : "productLoader d-none";

    return (
        <Container fluid className="product-list-table" style={{height:"40vh",overflow:"auto"}}>
            <Table striped bordered hover className="p-4">
                <thead className='sticky-top'>
                    <tr>
                        <th>Product Name</th>
                        <th>Stock Quantity</th>
                        <th>Price in Rs</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr className={classname}>
                        <td colSpan='5' style={{ textAlign: 'center' }}>
                            <div >
                                <div className="spinner-border text-success" role="status"></div>
                            </div>
                        </td>
                    </tr>
                    {!isLoading && products.length === 0 ?
                        <tr>
                            <td>No Products Available</td>
                        </tr>
                        :
                        products.map(product => {
                            return <Product key={product.products.ROWID} product={product} />;
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default ProductList;
