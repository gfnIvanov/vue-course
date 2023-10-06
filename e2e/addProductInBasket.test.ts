// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Testing adding items to cart', () => {
    test('The counter value must correspond to the number of added products', async ({
        page,
    }) => {
        await page.goto('http://localhost:5173/#/');
        await page
            .getByTestId('card-product')
            .filter({
                hasText:
                    'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            })
            .getByRole('button')
            .click({ clickCount: 3 });
        await expect(page.getByTestId('counter')).toHaveText('3');
    });
    test('Added items should appear in the cart with the correct amount', async ({
        page,
    }) => {
        await page.goto('http://localhost:5173/#/');
        await page
            .getByTestId('card-product')
            .filter({
                hasText:
                    'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            })
            .getByRole('button')
            .click();
        await page
            .getByTestId('card-product')
            .filter({
                hasText: 'Mens Casual Premium Slim Fit T-Shirts',
            })
            .getByRole('button')
            .click();
        await page.getByTestId('to-basket').click();
        await expect(page.getByTestId('grid-str')).toHaveCount(2);
        await expect(page.getByTestId('full-price')).toHaveText('$132.25');
    });
    test('When emptying the basket, the entry "No items added" should be displayed', async ({
        page,
    }) => {
        await page.goto('http://localhost:5173/#/');
        await page
            .getByTestId('card-product')
            .filter({
                hasText:
                    'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            })
            .getByRole('button')
            .click();
        await page.getByTestId('to-basket').click();
        await page.getByTestId('clear-basket').click();
        await expect(page.getByTestId('no-items')).toHaveText('No items added');
    });
});
