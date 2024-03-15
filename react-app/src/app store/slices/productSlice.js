import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editProductSuccess: (state, action) => {
      const { productId, updatedProductData } = action.payload;
      const updatedProducts = state.products.map(product => {
        if (product.products.ROWID === productId) {
          return {
            ...product,
            products: updatedProductData
          };
        }
        return product;
      });
      toast.success(`Product with ID ${updatedProductData.ROWID} updated successfully.`);
      state.products = updatedProducts;
      state.loading = false;
      state.error = null;
    },
    editProductError: (state, action) => {
      state.error = action.payload;
      toast.error('Error updating the product.');
    },
    deleteProductSuccess: (state, action) => {
      const filteredProducts = state.products.filter(product => product.products.ROWID !== action.payload);
      toast.success(`Product with ID ${action.payload} deleted successfully.`);
      state.products = filteredProducts;
      state.loading = false;
      state.error = null;
    },
    deleteProductError: (state, action) => {
      state.error = action.payload;
      toast.error('Error deleting the product.');
    },
    addProductSuccess: (state, action) => {
      const newProduct = action.payload;
      toast.success(`Product ${newProduct.products.productName} added successfully.`);
      state.products.push(newProduct);
      state.loading = false;
      state.error = null;
    },
    addProductError: (state, action) => {
      state.error = action.payload;
      toast.error('Error adding product.');
    },
  },
});

export const {
  setLoading,
  fetchProductsSuccess,
  fetchProductsError,
  editProductSuccess,
  editProductError,
  deleteProductSuccess,
  deleteProductError,
  addProductSuccess,
  addProductError,
} = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get('/server/fetch-products');
    dispatch(fetchProductsSuccess(response.data.response));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
    console.error('Error fetching products:', error);
  }
};

export const editProduct = (productId, updatedProductData) => async (dispatch) => {
  try {
    const response = await axios.put(`/server/edit-product/${productId}`, updatedProductData);
    if (response.data.success) {
      dispatch(editProductSuccess({ productId, updatedProductData }));
    } else {
      dispatch(editProductError('Error updating the product.'));
    }
  } catch (error) {
    dispatch(editProductError(error.message));
    console.error('Error editing product:', error);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/server/delete-product/${productId}`);
    if (response.data.success) {
      dispatch(deleteProductSuccess(productId));
    } else {
      dispatch(deleteProductError('Error deleting the product.'));
    }
  } catch (error) {
    dispatch(deleteProductError(error.message));
    console.error('Error deleting product:', error);
  }
};

export const addProduct = (newProductData) => async (dispatch) => {
  try {
    const response = await axios.post(`/server/add-product`, newProductData);
    dispatch(addProductSuccess(response.data.response[0]));
  } catch (error) {
    dispatch(addProductError(error.message));
    console.error('Error adding product:', error);
  }
};


export default productsSlice.reducer