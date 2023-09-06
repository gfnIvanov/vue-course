import axios from 'axios';
import { server } from '../../conf.json';
import { empty } from './utils';
import type { UserData, UsersResponse } from '@/types';


export const checkUser = async function(userData: UserData): Promise<UsersResponse> {
    try {
        const fullLogin = userData.login.split(':');
        if (fullLogin[1] === 'admin') {
            userData.login = fullLogin[0];
            userData.admin = true;
        } else {
            userData.admin = false;
        }
        const res = await axios.post(`${server.url}/check-user`, {
            headers: {
                origin: server.url
            },
            data: userData
        });
        if (!empty(res.data.error)) {
            return { error: res.data.error }
        }
        return { payload: res.data }
    } catch(e) {
        console.error(e);
        return { error: e as string }
    }
};