import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReminded: false
}

const ReminderSlice = createSlice({
  name: "ReminderSlice",
  initialState,
  reducers: {
    setReminded: (state) => {
      state.isReminded = true;
    },
    setUnreminded: (state) => {
      state.isReminded = false;
    }
  }
})

export const {setReminded, setUnreminded} = ReminderSlice.actions;
export const selectReminded = (state) => state.isReminded;

export default ReminderSlice.reducer;