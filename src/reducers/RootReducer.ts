import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from '../slices/ApiSlice';

const rootReducer = combineReducers({
    api: apiReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;