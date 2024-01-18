import { useCallback, useState } from 'react';
import type { ChangeEvent } from 'react';

import { validate, ValidationResult, Validator } from 'features/validators';
import { DefaultField } from 'shared/lib/types/types';

export type InputTextValidate = DefaultField & {
    handleChange: (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
    ) => void;
    handleBlur: () => void;
    touched: boolean,
    clear:()=>void,
};

export const useInputTextValidate = (
    id: string,
    validators: (Validator<string>)[],
    onChange?: (value:string)=>void,
    init = '',
): InputTextValidate => {
    const [value, setValue] = useState(init);
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState<ValidationResult>(null);

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
            const val = event.target.value;
            setValue(val);
            setError(await validate(val, validators));
            setTouched(true);
            onChange?.(val);
        },
        [validators, onChange],
    );

    const handleBlur = useCallback(async () => {
        setError(await validate(value, validators));
        setTouched(true);
    }, [value, validators]);

    const hasError = useCallback(async () => {
        const err = await validate(value, validators);
        setError(err);
        return !!err;
    }, [value, validators]);

    const clear = () => {
        setValue('');
        setError(null);
        setTouched(false);
    };

    return {
        id,
        value,
        error,
        hasError,
        handleChange,
        handleBlur,
        touched,
        clear,
    };
};
