import Login from './Login.vue';
import { DOMWrapper, flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { checkUser } from '@/services/checkUser';

vi.mock('@/services/checkUser');

describe('Testing Login component', () => {
    const props = {
        show: true,
        modalType: 'Log in' as const,
    };
    let wrapper: VueWrapper;
    let form: Omit<DOMWrapper<HTMLFormElement>, 'exists'>;
    let inputs: DOMWrapper<HTMLInputElement>[];
    let warnings: DOMWrapper<HTMLSpanElement>[];
    beforeEach(() => {
        wrapper = mount(Login, {
            props,
            global: {
                plugins: [createTestingPinia()],
            },
        });
        form = wrapper.get('form');
        inputs = wrapper.findAll('input');
        warnings = wrapper.findAll('span.warn');
    });
    test('The component exists', () => {
        expect(wrapper.exists).toBeTruthy();
    });
    test('The button name must match modalType', () => {
        expect(wrapper.findAll('button')[1].text()).toContain(props.modalType);
    });
    test('Warnings should not be displayed when fields are filled in correctly', async () => {
        inputs[0].setValue('Login');
        inputs[1].setValue('123456');
        await flushPromises();
        expect(warnings[0].text()).toBe('');
        expect(warnings[1].text()).toBe('');
    });
    test('Warnings should be displayed if fields are not filled in', async () => {
        inputs[0].setValue('');
        inputs[1].setValue('');
        await flushPromises();
        expect(warnings[0].text()).toContain('required field');
        expect(warnings[1].text()).toContain('required field');
    });
    test('There should be a warning when entering a password shorter than 6 characters', async () => {
        inputs[1].setValue('123');
        await flushPromises();
        expect(warnings[1].text()).toContain('must be at least 6 characters');
    });
    test('If the server returned an error, it should be displayed on the login form and not trigger the "login" and "close" events', async () => {
        const response = {
            error: 'Test error',
        };
        vi.mocked(checkUser).mockResolvedValue(response);
        inputs[0].setValue('Login');
        inputs[1].setValue('123456');
        form.trigger('submit');
        await flushPromises();
        expect(wrapper.emitted('login')).toBeFalsy();
        expect(wrapper.emitted('close')).toBeFalsy();
        expect(warnings[1].text()).toContain('Test error');
    });
    test('If the data is entered correctly, the component should send a request to the server and raise the "login" and "close" events', async () => {
        const response = {
            payload: {
                id: 1,
                admin: false,
            },
        };
        vi.mocked(checkUser).mockResolvedValue(response);
        inputs[0].setValue('Login');
        inputs[1].setValue('123456');
        form.trigger('submit');
        await flushPromises();
        expect(wrapper.emitted('login')).toHaveLength(1);
        expect(wrapper.emitted('close')).toHaveLength(1);
    });
});
