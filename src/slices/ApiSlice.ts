import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../thunks/AppThunk';
import { apiService } from '../services/ApiService';

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface ApiState {
    data: Photo[];
    loading: boolean;
    error: string | null;
}

const initialState: ApiState = {
    data: [],
    loading: false,
    error: null,
};

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action: PayloadAction<[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = apiSlice.actions;

export const fetchApiData = (): AppThunk => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const response = await apiService.fetchData();
        dispatch(fetchDataSuccess(response.data));
    } catch (error) {
        const errorMessage = error ? String(error) : 'Unknown error'
        dispatch(fetchDataFailure(errorMessage));
    }
};

export const selectApiData = (state: { api: ApiState }) => state.api.data;
export const selectApiLoading = (state: { api: ApiState }) => state.api.loading;
export const selectApiError = (state: { api: ApiState }) => state.api.error;

export default apiSlice.reducer;
