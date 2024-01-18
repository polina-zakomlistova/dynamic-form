import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { DefaultField } from 'shared/lib/types/types';

export type DefaultType = {
    hasError: () => Promise<boolean>;
    clear:()=>void
    error: string|string[]|null;
};

export const useFormValidate = <Field extends DefaultType, Table extends DefaultType> (props: {
    fields: (Field|Table)[];
    onSuccess?: () => void;
    onFailure?: (error: string) => void;
}): {
    isSending: boolean;
    sendingError: string;
    handleFormSubmit: FormEventHandler<HTMLFormElement>
    handleFormReset: FormEventHandler<HTMLFormElement>;
    // hasFieldErrors: boolean;
} => {
    const { fields, onSuccess, onFailure } = props;

    const [isSending, setIsSending] = useState(false);
    const [sendingError, setSendingError] = useState('');

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const errors = await Promise.all(fields.map((field) => field.hasError()));
        const isFormValid = errors.every((error) => !error);

        if (isFormValid) {
            setIsSending(true);
            setSendingError('');
            onSuccess?.();
        } else {
            setIsSending(false);
            setSendingError('Форма не валидна');
            onFailure?.('Форма не валидна');
        }
    };

    // const hasFieldErrors = fields.some((field) => !field?.error);

    const handleFormReset: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        fields.forEach((field) => field.clear());
        setIsSending(false);
    };

    return {
        isSending,
        sendingError,
        handleFormSubmit,
        handleFormReset,
        // hasFieldErrors
    };
};
