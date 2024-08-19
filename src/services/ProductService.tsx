import axios from "axios";
import { ProductModel } from "../models/ProductModel";
import { getValueFor } from "./ApiService";
import { localhost } from "./UserService";
async function fetcher(url: string) {
    const token = await getValueFor("token");
    const response = await axios.get(url, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    return response.data;
}
export const getProductUrl = () => localhost + "/product/";
export const getProductDetailUrl = (productId: string | number) => localhost + "/product/" + productId;

export const ProductFetcher = async (url: string) => {
    const response = await fetcher(url);
    const products: ProductModel[] = await response.data;
    return products;
}

export const ProductDetailFetcher = async (url: string) => {
    const response = await fetcher(url);
    const product: ProductModel = await response.data;
    return product;
}