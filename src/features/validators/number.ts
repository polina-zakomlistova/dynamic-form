import type { GetValidator } from './index';

export const number: GetValidator<string, string> = (
    message = 'Ожидается число',
) => async (value) => (!Number.isNaN(value) ? null : message);
