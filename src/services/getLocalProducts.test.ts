import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';
import { getLocalProducts } from './getLocalProducts';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing getLocalProducts function', () => {
    test('Should return in the payload an array with all the products that are in the database if the product identifier is not specified', async () => {
        const response = {
            data: [
                {
                    id: 1,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
                {
                    id: 2,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
            ],
        };
        const result = {
            payload: [
                {
                    id: 1,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
                {
                    id: 2,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
            ],
        };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
            response,
        );
        return getLocalProducts().then(res => {
            expect(res).toEqual(result);
        });
    });
    test('Should return in the payload an array with all the products that are in the database if the product identifier is not specified', async () => {
        const response = {
            data: [
                {
                    id: 1,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
                {
                    id: 2,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
            ],
        };
        const result = {
            payload: [
                {
                    id: 1,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
                {
                    id: 2,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
            ],
        };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
            response,
        );
        return getLocalProducts().then(res => {
            expect(res).toEqual(result);
        });
    });
    test('Should return in the payload an array with the product whose identifier was specified', async () => {
        const response = {
            data: [
                {
                    id: 1,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
            ],
        };
        const result = {
            payload: [
                {
                    id: 1,
                    category: '',
                    description: '',
                    image: '',
                    price: '',
                    title: '',
                },
            ],
        };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
            response,
        );
        return getLocalProducts(1).then(res => {
            expect(res).toEqual(result);
        });
    });
    test('Should return an error object when throwing an exception', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
            'error',
        );
        return getLocalProducts().then(res => {
            expect(res).toEqual({ error: 'error' });
        });
    });
});
