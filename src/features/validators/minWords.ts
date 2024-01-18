import type { GetValidator } from './index';

export const minWords: GetValidator<number, string> = (
    min,
    message,
) => {
    if (!min) {
        throw new Error(
            'Валидатор minWords ожидает число',
        );
    }

    const text = message || `Не должно быть меньше ${min} слов`;

    return async (value) => {
        const wordsCount = value.trim().split(/\s+/).length;

        return wordsCount >= min
            ? null
            : text;
    };
};
