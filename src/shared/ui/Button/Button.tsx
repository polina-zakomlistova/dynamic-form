import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    ButtonHTMLAttributes, memo, ReactNode,
} from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    COLOR = 'color',
    SUCCESS = 'success',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    theme?: ButtonTheme;
}

export const Button = memo((props:ButtonProps) => {
    const {
        className,
        children,
        disabled,
        theme = ButtonTheme.COLOR,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [cls[theme], className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
