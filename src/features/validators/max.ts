import type { GetValidator } from './index';

export const max: GetValidator<number, string> = (
    max,
    message,
) => {
    if (Number.isNaN(max)) {
        throw new Error(
            `Валидатор max ожидает число, получено ${max}`,
        );
    }

    const text = message || `Не должно превышать ${max}`;

    return async (value) => {
        const numberValue = Number(value);
        if (!numberValue) {
            return 'Ожидается число';
        }
        return ((numberValue) <= Number(max)
            ? null
            : text);
    };
};
