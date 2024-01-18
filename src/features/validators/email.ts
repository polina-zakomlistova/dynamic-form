import type { GetValidator } from './index';

export const email: GetValidator<string, string> = (
    message = 'Некорректный формат email',
) => {
    const emailRegex: RegExp = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

    return async (value) => (emailRegex.test(value) ? null : message);
};
