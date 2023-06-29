import { createSlice } from '@reduxjs/toolkit';
import { logOutThunk, loginThunk } from './thunks';
import { Notify } from 'notiflix';

const authState = {
  token: '',
  isLoading: false,
  isLoggedIn: false,
  error: '',
  user: {
    name: '',
    email: '',
  },
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
        Notify.success('Login Success');
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        if (action.error.message === 'Request failed with status code 404')
          Notify.failure('Login failure');
      })
      .addCase(logOutThunk.fulfilled, state => {
        state.token = '';
        state.user.name = '';
        state.user.email = '';
        state.error = '';
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addMatcher(action => {
        action.type.endsWith('/pending');
      }, handlePending)
      .addMatcher(action => {
        action.type.endsWith('/rejected');
      }, handleRejected);
  },
});

export const loginReducer = authSlice.reducer;
