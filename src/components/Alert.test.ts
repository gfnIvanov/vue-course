import Alert from './Alert.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('Testing Alert component', () => {
    const props = {
        show: true,
        text: 'Test text',
    };
    const wrapper = mount(Alert, { props });
    test('The component exists', () => {
        expect(wrapper.exists).toBeTruthy();
    });
    test('The message text must match that passed in the property', () => {
        expect(wrapper.get('div.text-block').text()).toContain(props.text);
    });
});
