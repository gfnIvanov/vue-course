import { describe, expect, test } from '@jest/globals';
import { empty, removeSpanTags } from './utils';

describe('Testing empty function', () => {
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

describe('Testing removeSpanTags function', () => {
    test('Should return a string without span tags', () => {
        const originStr = '<span style="background:gainsboro;">result</span>';
        expect(removeSpanTags(originStr)).toBe('result');
    });
});
