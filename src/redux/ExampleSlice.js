import { createSlice } from '@reduxjs/toolkit';
const ExampleSlice = createSlice({
    name: 'user',
    initialState: {
        inforVerify: null,
    },
    reducers: {
        deleteInforVerify: (state) => {
            state.inforVerify = null;
        },
        addInforVerify: (state, action) => {
            state.inforVerify = action.payload;
        },
    },
});

export const { deleteInforVerify, addInforVerify, addUser } = ExampleSlice.actions;

export default ExampleSlice.reducer;
