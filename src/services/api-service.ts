import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const apiService = {
    fetchData: () => axios.get('https://jsonplaceholder.typicode.com/photos'),
};

export async function getValueFor(key: string) {
    const result = await SecureStore.getItemAsync(key);        
    return result;
}
export async function removeValueOf(key: string) {
    const result = await SecureStore.deleteItemAsync(key);        
    return result;
}