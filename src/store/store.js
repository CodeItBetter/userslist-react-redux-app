import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/UserSlice';

export default configureStore({
    reducer: {
        user: userReducer,
    },
})