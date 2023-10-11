import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';
import { addOrder } from './addOrder';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing addOrder function', () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(
        'error',
    );
    test('Should return an error object when throwing an exception', async () => {
        const order = {
            user: 1,
            name: '',
            phone: '',
            email: '',
            address: '',
            compound: '',
            summ: 1,
        };
        return addOrder(order).then(res => {
            expect(res).toEqual({ error: 'error' });
        });
    });
});
