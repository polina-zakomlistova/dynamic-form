import type { GetValidator } from './index';

export const min: GetValidator<number, string> = (
    min,
    message,
) => {
    if (Number.isNaN(min)) {
        throw new Error(
            `Валидатор min ожидает число, получено ${min}`,
        );
    }

    const text = message || `Не должно быть меньше ${min}`;

    return async (value) => {
        const numberValue = Number(value);
        if (!numberValue) {
            return 'Ожидается число';
        }
        return ((numberValue) >= Number(min)
            ? null
            : text);
    };
};
