import { classNames } from 'shared/lib/classNames/classNames';

import { Select, SelectOption } from 'shared/ui/Select/Select';
import {
    ChangeEvent, memo, MouseEventHandler, useCallback,
} from 'react';
import { InputTheme } from 'shared/ui/Input/Input';
import { Gender } from '../model/gender';

interface GenderSelectProps {
    className?: string;
    value?: Gender;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLSelectElement>) => void;
    textError?:string;
    touched?:boolean;
}

const options: SelectOption[] = [
    {
        value: '',
        label: 'не выбрано',
        id: 'noSelected',
    },
    {
        value: Gender.man,
        label: Gender.man,
        id: Gender.man,
    },
    {
        value: Gender.woman,
        label: Gender.woman,
        id: Gender.woman,
    },
];

export const GenderSelect = memo((props: GenderSelectProps) => {
    const {
        className,
        value,
        onChange,
        onBlur,
        textError,
        touched,
    } = props;

    return (
        <Select
            className={classNames('', {}, [className])}
            name="gender"
            label="Пол"
            options={options}
            value={value}
            onChange={onChange}
            useErrorMessage
            textError={textError}
            touched={touched}
            theme={textError ? InputTheme.ERROR : InputTheme.COLOR}
            onBlur={onBlur}
        />
    );
});
