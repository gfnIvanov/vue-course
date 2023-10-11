import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';
import { getComments } from './getComments';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing getComments function', () => {
    test('Should return in the payload an array with all comments for a specific product', async () => {
        const response = {
            data: [
                {
                    date_add: 'Fri, 08 Sep 2023 14:59:56 GMT',
                    id: 1,
                    text: 'text1',
                    user: 'login1',
                },
                {
                    date_add: 'Fri, 08 Sep 2023 14:59:56 GMT',
                    id: 2,
                    text: 'text2',
                    user: 'login2',
                },
            ],
        };
        const result = {
            payload: [
                {
                    date_add: 'Fri, 08 Sep 2023 14:59:56 GMT',
                    id: 1,
                    text: 'text1',
                    user: 'login1',
                },
                {
                    date_add: 'Fri, 08 Sep 2023 14:59:56 GMT',
                    id: 2,
                    text: 'text2',
                    user: 'login2',
                },
            ],
        };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
            response,
        );
        return getComments(1).then(res => {
            expect(res).toEqual(result);
        });
    });
    test('Should return an error object when throwing an exception', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
            'error',
        );
        return getComments(1).then(res => {
            expect(res).toEqual({ error: 'error' });
        });
    });
});
