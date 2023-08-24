import axios from 'axios';
import { fakestoreapi } from '../../conf.json';
import type { ProductData } from '../components/types';

export const getProducts = async function(): Promise<ProductData[]> {
    try {
        const res = await axios.get(`${fakestoreapi.url}?limit=${fakestoreapi.limit}`);
        return res.data;
    } catch(e) {
        console.error(e);
        return [] as ProductData[]
    }
};