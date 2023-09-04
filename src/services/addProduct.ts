import axios from 'axios';
import { server } from '../../conf.json';
import type { ProductData } from '@/types';


export const addProduct = async function(productData: ProductData): Promise<{ error?: string }> {
    try {
        await axios.post(`${server.url}/add-product`, {
            headers: {
                origin: server.url
            },
            data: productData
        });
        return {}
    } catch(e) {
        console.error(e);
        return { error: e as string }
    }
};
