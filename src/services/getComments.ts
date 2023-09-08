import axios from 'axios';
import { server } from '../../conf.json';
import { empty } from './utils';
import type { CommentResponse } from '@/types';


export const getComments = async function(productId: number): Promise<CommentResponse> {
    try {
        const res = await axios.get(`${server.url}/get-comments?product=${productId}`);
        if (!empty(res.data.error)) {
            return { error: res.data.error }
        }
        return { payload: res.data }
    } catch(e) {
        console.error(e);
        return { error: e as string }
    }
};