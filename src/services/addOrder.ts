import axios from 'axios';
import { server } from '../../conf.json';
import type { OrderData } from '@/types';

export const addOrder = async function (
    orderData: OrderData,
): Promise<{ error?: string }> {
    try {
        await axios.post(`${server.url}/add-order`, {
            headers: {
                origin: server.url,
            },
            data: orderData,
        });
        return {};
    } catch (e) {
        console.error(e);
        return { error: e as string };
    }
};
