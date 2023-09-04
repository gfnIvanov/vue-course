import axios from 'axios';
import { server } from '../../conf.json';
import { empty } from './utils';
import type { UsersResponse } from '@/types';


export const getAllUsers = async function(): Promise<UsersResponse> {
    try {
        const res = await axios.get(`${server.url}/get-users`);
        if (!empty(res.data.error)) {
            return { error: res.data.error }
        }
        return { payload: res.data }
    } catch(e) {
        console.error(e);
        return { error: e as string }
    }
};