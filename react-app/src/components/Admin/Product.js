import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, editProduct } from '../../app store/slices/productSlice';

function Product({product}) 
{
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const products=useSelector(state=>state.products.products)

    const handleProductNameChange = (event) => 
    {
        setSelectedProduct({
          ...selectedProduct,
          productName: event.target.value
        });
    };
      
    const handlePriceChange = (event) => 
    {
      setSelectedProduct({
        ...selectedProduct,
        price: event.target.value
      });
    };
    
    const handleStockQuantityChange = (event) => 
    {
      setSelectedProduct({
        ...selectedProduct,
        stockQuantity: event.target.value
      });
    };

    const handleEditClick = (productId) => 
    {
      
      const selected = getProductDetails(productId); 
      console.log(selected.products);
      setSelectedProduct(selected.products);
      setShowModal(true);
    };

    const handleCloseModal = () => 
    {
        setShowModal(false);
    };
    
    const handleSaveChanges = (productId) => 
    {
        dispatch(editProduct(productId, selectedProduct));
        setShowModal(false);
    };

    const getProductDetails = (productId) => 
    {
        const selectedProduct = products.find(product => product.products.ROWID === productId);
        return selectedProduct;
    };

    function handleDeleteClick(productId)
    {
        dispatch(deleteProduct(productId))
    }
      

  return (
    <>
    <tr data-id={product.products.ROWID}>
        <td>{product.products.productName}</td>
        <td>{product.products.stockQuantity}</td>
        <td>{parseFloat(product.products.price).toFixed(2)}</td>
        <td>
          <FontAwesomeIcon
            icon={faEdit}
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => handleEditClick(product.products.ROWID)}
          />
        </td>
        <td>
          <FontAwesomeIcon
            icon={faTrash}
            className="text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDeleteClick(product.products.ROWID)}
          />
        </td>
    </tr>
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        {selectedProduct && (
            <Modal.Body>
           <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    defaultValue={selectedProduct.productName}
                    onChange={handleProductNameChange}
                />
                </Form.Group>

                <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter price"
                    defaultValue={parseFloat(selectedProduct.price).toFixed(2)}
                    onChange={handlePriceChange}
                />
                </Form.Group>

                <Form.Group controlId="stockQuantity">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter stock quantity"
                    defaultValue={selectedProduct.stockQuantity}
                    onChange={handleStockQuantityChange}
                />
            </Form.Group>
            </Modal.Body>
        )}
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
            Close
            </Button>
            <Button variant="primary" onClick={() => handleSaveChanges(product.products.ROWID)}>
            Save Changes
            </Button>
        </Modal.Footer>
   </Modal>

    </>
  )
}

export default Product
