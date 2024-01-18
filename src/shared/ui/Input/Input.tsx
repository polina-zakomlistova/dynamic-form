import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage';
import { Validator } from 'features/validators';
import cls from './Input.module.scss';

export enum InputTheme {
    RADIO = 'radio',
    COLOR = 'color',
    TABLE = 'table',
    ERROR = 'error',
}

export enum InputSize {
    S = 'size-s',
    M = 'size-m',
    L = 'size-l',
    Width100 = 'width100'
}

export enum LabelPosition {
    left = 'left-label',
    right = 'right-label',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'|'onChange'|'id'|'size'>

export interface InputProps extends HTMLInputProps {
    id:string;
    className?: string;
    label?: string;
    value: string;
    name?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    theme?: InputTheme;
    size?:InputSize,
    labelPosition?:LabelPosition,
    useErrorMessage?: boolean;
    textError?: string;
    touched?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className = '',
        label,
        value = '',
        name,
        onChange,
        type = 'text',
        id,
        size = InputSize.M,
        theme = InputTheme.COLOR,
        labelPosition = LabelPosition.left,
        useErrorMessage = true,
        touched,
        textError = '',
        ...otherProps
    } = props;

    const classes: string[] = [cls[size], cls[theme], className];

    const mods: Mods = {};

    return (
        <div className={cls.wrapper}>
            <div
                className={classNames(
                    cls.wrapperInputLabel,
                    {},
                    [cls[labelPosition]],
                )}
            >
                {label && (
                    <label htmlFor={id} className={cls.label}>
                        {label}
                    </label>
                )}

                <input
                    className={classNames(
                        cls.input,
                        mods,
                        classes,
                    )}
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...otherProps}
                />
            </div>
            {useErrorMessage && touched && textError
                ? (
                    <ErrorMessage
                        text={textError}
                    />
                )
                : null}

        </div>

    );
});
