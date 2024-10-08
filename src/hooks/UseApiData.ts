import { useEffect } from 'react';
import { fetchApiData, selectApiData, selectApiLoading, selectApiError } from '../slices/ApiSlice';
import { useAppDispatch, useAppSelector } from '../stores/Store';

const useApiData = () => {
    const dispatch = useAppDispatch()
    const apiData = useAppSelector(selectApiData);
    const loading = useAppSelector(selectApiLoading);
    const error = useAppSelector(selectApiError);

    useEffect(() => {
        dispatch(fetchApiData())
    }, [dispatch]);

    return { apiData, loading, error };
};

export default useApiData;
