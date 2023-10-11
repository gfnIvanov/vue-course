import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';
import { checkUser } from './checkUser';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing checkUser function', () => {
    test('With admin login', async () => {
        const response = { data: { id: 1, admin: true } };
        const result = { payload: { id: 1, admin: true } };
        const userData = {
            login: 'login:admin',
            password: '',
        };
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockResolvedValue(response);
        return checkUser(userData).then(res => {
            expect(res).toEqual(result);
        });
    });
    test('With a regular user login', async () => {
        const response = { data: { id: 1, admin: null } };
        const result = { payload: { id: 1, admin: null } };
        const userData = {
            login: 'login',
            password: '',
        };
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockResolvedValue(response);
        return checkUser(userData).then(res => {
            expect(res).toEqual(result);
        });
    });
    test('Should return an error object when throwing an exception', async () => {
        const userData = {
            login: 'login',
            password: '',
        };
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockRejectedValue('error');
        return checkUser(userData).then(res => {
            expect(res).toEqual({ error: 'error' });
        });
    });
});
