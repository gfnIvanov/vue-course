import axios from 'axios';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { empty, removeSpanTags } from './utils';
import { _searchProducts, _useFilter } from './filterProducts';
import { addComment } from './addComment';
import { addOrder } from './addOrder';
import { addProduct } from './addProduct';
import { checkUser } from './checkUser';
import { getAllUsers } from './getAllUsers';
import { getComments } from './getComments';
import { getLocalProducts } from './getLocalProducts';
import type { ProductData } from '@/types';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing utils', () => {
    describe('empty', () => {
        test("Sould return true if the values ​​are '', 0, null, undefined, []", () => {
            expect(empty('')).toBeTruthy();
            expect(empty(0)).toBeTruthy();
            expect(empty(null)).toBeTruthy();
            expect(empty(undefined)).toBeTruthy();
        });
        test('Should return false if the values ​​are no falsy or the array is not empty', () => {
            expect(empty(10)).toBeFalsy();
            expect(empty('test')).toBeFalsy();
            expect(empty([1, 2, 3])).toBeFalsy();
        });
        test('Should take any number of arguments and return true if they are all falsy', () => {
            expect(empty(0, null, undefined, '', [])).toBeTruthy();
        });
        test('Should take any number of arguments and return false if at least one is truthy', () => {
            expect(empty(0, 'test', undefined, '', [])).toBeFalsy();
        });
    });

    describe('removeSpanTags', () => {
        test('Should return a string without span tags', () => {
            const originStr =
                '<span style="background:gainsboro;">result</span>';
            expect(removeSpanTags(originStr)).toBe('result');
        });
    });
});

describe('Testing filter functions', () => {
    describe('_searchProducts', () => {
        let data: ProductData[];
        beforeEach(() => {
            data = [
                {
                    title: 'Mens Casual Premium Slim Fit T-Shirts',
                    price: 0,
                    description: '',
                    category: '',
                    image: '',
                },
                {
                    title: 'Mens Cotton Jacket',
                    price: 0,
                    description: '',
                    category: '',
                    image: '',
                },
                {
                    title: 'Mens Casual Slim Fit',
                    price: 0,
                    description: '',
                    category: '',
                    image: '',
                },
            ];
        });
        test('Should return an array with an object whose title property is a string in which the searched part (case insensitive) is styled to match the color', () => {
            const resultStr =
                'Mens Casual <span style="background:gainsboro;">Premiu</span>m Slim Fit T-Shirts';
            expect(_searchProducts('premiu', data)[0].title).toBe(resultStr);
        });
        test('If there are multiple matches, it should return an array with an object in each of which the desired part is stylized in the title property', () => {
            const resultArr = [
                'Mens <span style="background:gainsboro;">Casual</span> Premium Slim Fit T-Shirts',
                'Mens <span style="background:gainsboro;">Casual</span> Slim Fit',
            ];
            expect(
                _searchProducts('Casual', data).map(res => res.title),
            ).toEqual(resultArr);
        });
        test('Should find the desired substring without regard to styling', () => {
            const originObj = {
                title: 'Fjallraven - <span style="background:gainsboro;">Folds</span>ack No. 1 Backpack, Fits 15 Laptops',
                price: 0,
                description: '',
                category: '',
                image: '',
            };
            data.push(originObj);
            const resultStr =
                'Fjallraven - <span style="background:gainsboro;">Foldsack</span> No. 1 Backpack, Fits 15 Laptops';
            expect(_searchProducts('Foldsack', data)[0].title).toBe(resultStr);
        });
        test('Should return an empty array if no matches are found', () => {
            expect(_searchProducts('nomatches', data)).toEqual([]);
        });
    });

    describe('_useFilter', () => {
        let data: ProductData[];
        beforeEach(() => {
            data = [
                {
                    title: '',
                    price: 10,
                    description: '',
                    category: 'clothes',
                    image: '',
                },
                {
                    title: '',
                    price: 20,
                    description: '',
                    category: 'electronics',
                    image: '',
                },
                {
                    title: '',
                    price: 30,
                    description: '',
                    category: 'jewelery',
                    image: '',
                },
            ];
        });
        test('Should return items whose price is greater than or equal to the stated price', () => {
            const filter = {
                priceFrom: 20,
            };
            const resultArr = data.slice(1);
            expect(_useFilter(filter, data)).toEqual(resultArr);
        });
        test('Must return an item whose price is less than or equal to the stated price', () => {
            const filter = {
                priceTo: 15,
            };
            const resultArr = data.slice(0, 1);
            expect(_useFilter(filter, data)).toEqual(resultArr);
        });
        test('Must return items whose price is within the specified price range', () => {
            const filter = {
                priceFrom: 15,
                priceTo: 25,
            };
            const resultArr = data.slice(1, 2);
            expect(_useFilter(filter, data)).toEqual(resultArr);
        });
        test('Must return items taking into account all passed parameters', () => {
            const filter = {
                priceFrom: 10,
                priceTo: 50,
                selectCategory: 'electronics',
            };
            const resultArr = data.slice(1, 2);
            expect(_useFilter(filter, data)).toEqual(resultArr);
        });
    });
});

describe('Testing functions interacting with the server', () => {
    describe('Simple POST-functions', () => {
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockRejectedValue('error');
        test('addComment: should return an error object when throwing an exception', async () => {
            return addComment({ product: 1, text: '' }).then(res => {
                expect(res).toEqual({ error: 'error' });
            });
        });
        test('addOrder: should return an error object when throwing an exception', async () => {
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
        test('addProduct: should return an error object when throwing an exception', async () => {
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
    describe('checkUser', () => {
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
    describe('getAllUsers', () => {
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
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockResolvedValue(response);
            return getAllUsers().then(res => {
                expect(res).toEqual(result);
            });
        });
        test('Should return an error object when throwing an exception', async () => {
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockRejectedValue('error');
            return getAllUsers().then(res => {
                expect(res).toEqual({ error: 'error' });
            });
        });
    });
    describe('getComments', () => {
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
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockResolvedValue(response);
            return getComments(1).then(res => {
                expect(res).toEqual(result);
            });
        });
        test('Should return an error object when throwing an exception', async () => {
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockRejectedValue('error');
            return getComments(1).then(res => {
                expect(res).toEqual({ error: 'error' });
            });
        });
    });
    describe('getLocalProducts', () => {
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
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockResolvedValue(response);
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
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockResolvedValue(response);
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
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockResolvedValue(response);
            return getLocalProducts(1).then(res => {
                expect(res).toEqual(result);
            });
        });
        test('Should return an error object when throwing an exception', async () => {
            (
                axios.get as jest.MockedFunction<typeof axios.get>
            ).mockRejectedValue('error');
            return getAllUsers().then(res => {
                expect(res).toEqual({ error: 'error' });
            });
        });
    });
});
