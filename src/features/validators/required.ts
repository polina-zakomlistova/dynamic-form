import type { GetValidator } from './index';

export const required: GetValidator<string, string> = (
    message = 'Обязательное поле',
) => async (value) => (value ? null : message);
