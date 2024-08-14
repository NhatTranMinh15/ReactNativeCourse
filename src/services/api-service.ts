import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const apiService = {
    fetchData: () => axios.get('https://jsonplaceholder.typicode.com/photos'),
};

export async function getValueFor(key: any) {
    let result = await SecureStore.getItemAsync(key);        
    return result;
}
export async function removeValueOf(key: any) {
    let result = await SecureStore.deleteItemAsync(key);        
    return result;
}