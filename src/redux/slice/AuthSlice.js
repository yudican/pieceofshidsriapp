import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggin: false,
  user_id: null,
  token: null,
  information: {},
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isLoggin = action.payload.isLoggin;
      state.user_id = action.payload.user_id;
      state.token = action.payload.token;
      state.information = action.payload.information;
    },
    setSignOut: state => {
      state.isLoggin = false;
      state.user_id = null;
      state.token = null;
      state.information = {};
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export default authSlice.reducer;
