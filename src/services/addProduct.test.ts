import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';
import { addProduct } from './addProduct';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing addProduct function', () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(
        'error',
    );
    test('Should return an error object when throwing an exception', async () => {
        const product = {
            title: '',
            price: 1,
            description: '',
            category: '',
            image: '',
        };
        return addProduct(product).then(res => {
            expect(res).toEqual({ error: 'error' });
        });
    });
});
