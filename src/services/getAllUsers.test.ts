import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';
import { getAllUsers } from './getAllUsers';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing getAllUsers function', () => {
    test('Should return in the payload an array with all the users that are in the database', async () => {
        const response = {
            data: [
                { username: 'login1', password: '***', admin: true },
                { username: 'login2', password: '***', admin: null },
            ],
        };
        const result = {
            payload: [
                { username: 'login1', password: '***', admin: true },
                { username: 'login2', password: '***', admin: null },
            ],
        };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
            response,
        );
        return getAllUsers().then(res => {
            expect(res).toEqual(result);
        });
    });
    test('Should return an error object when throwing an exception', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
            'error',
        );
        return getAllUsers().then(res => {
            expect(res).toEqual({ error: 'error' });
        });
    });
});
