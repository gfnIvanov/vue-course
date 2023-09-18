import axios from 'axios';
import { server } from '../../conf.json';
import { empty } from './utils';
import type { ProductsResponse } from '@/types';

export const getLocalProducts = async function (
    productId?: number,
): Promise<ProductsResponse> {
    try {
        const onlyOne = !empty(productId) ? `?id=${productId}` : '';
        const res = await axios.get(`${server.url}/get-products${onlyOne}`);
        if (!empty(res.data.error)) {
            return { error: res.data.error };
        }
        return { payload: res.data };
    } catch (e) {
        console.error(e);
        return { error: e as string };
    }
};
