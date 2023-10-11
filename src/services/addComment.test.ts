import axios from 'axios';
import { describe, expect, test, jest } from '@jest/globals';
import { addComment } from './addComment';

jest.mock('axios');

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Testing addComment function', () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(
        'error',
    );
    test('Should return an error object when throwing an exception', async () => {
        return addComment({ product: 1, text: '' }).then(res => {
            expect(res).toEqual({ error: 'error' });
        });
    });
});
