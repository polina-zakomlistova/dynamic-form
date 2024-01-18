import { InputHTMLAttributes, memo, useMemo } from 'react';
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { InputTheme, LabelPosition } from 'shared/ui/Input/Input';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
    id: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options?: SelectOption[];
    useErrorMessage?: boolean;
    textError?: string;
    touched?: boolean;
    labelPosition?: LabelPosition;
    theme?: InputTheme;
}

export const Select = memo((props: SelectProps) => {
    const {
        label,
        options,
        onChange,
        value,
        name,
        id,
        useErrorMessage = true,
        theme = InputTheme.COLOR,
        touched,
        textError = '',
        className = '',
        labelPosition = LabelPosition.left,
        ...otherProps
    } = props;

    const classes: string[] = [cls[theme], className];

    const mods: Mods = {};

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            key={opt.value}
            value={opt.value}
        >
            {opt.label}
        </option>
    )), [options]);

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
                    <label htmlFor={id || name} className={cls.label}>
                        {`${label}`}
                    </label>
                )}
                <select
                    className={classNames(
                        cls.select,
                        mods,
                        classes,
                    )}
                    id={id || name}
                    value={value}
                    onChange={onChange}
                    {...otherProps}
                >
                    {optionsList}
                </select>
            </div>
            {useErrorMessage && touched && textError
                ? (
                    <ErrorMessage text={textError} />
                )
                : null}
        </div>
    );
});
