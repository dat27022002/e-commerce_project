import { configureStore } from '@reduxjs/toolkit';
import ExampleReducer from './ExampleSlice';

export default configureStore({
    reducer: {
        example: ExampleReducer,
    },
});
