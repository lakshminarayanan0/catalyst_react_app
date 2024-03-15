import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const userSlice = createSlice(
{
  name: 'user',
  initialState: 
  {
    user: {},
    loading: false,
    error: null
  },
  reducers: 
  {
    setLoading: (state, action) => 
    {
      state.loading = action.payload;
    },
    getUserByUserIdSuccess: (state, action) => 
    {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => 
    {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const 
{ 
  setLoading, 
  getUserByUserIdSuccess, 
  setError
} = userSlice.actions;

export const getUserByUserId = userId => dispatch => 
{
  dispatch(setLoading(true));

  return axios
    .get(`/server/getuser-by-user-id/${userId}`)
    .then(response => 
    {
      dispatch(getUserByUserIdSuccess(response.data.response[0].users));
    })
    .catch(error => 
    {
      dispatch(setError(error.message));
      console.error('Error fetching user:', error);
    });
};



export default userSlice.reducer;
