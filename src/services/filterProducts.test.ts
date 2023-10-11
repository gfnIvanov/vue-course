import { describe, expect, test, beforeEach } from '@jest/globals';
import { _searchProducts, _useFilter } from './filterProducts';
import type { ProductData } from '@/types';

describe('Testing _searchProducts function', () => {
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
        expect(_searchProducts('Casual', data).map(res => res.title)).toEqual(
            resultArr,
        );
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

describe('Testing _useFilter function', () => {
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
