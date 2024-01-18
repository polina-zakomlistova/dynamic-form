import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './ErrorMessage.module.scss';

interface ErrorMessageProps {
    className?: string;
    text: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
    const { className, text } = props;

    const mods:Mods = {};

    return (
        <div className={classNames(cls.ErrorMessage, mods, [className])}>
            {text}
        </div>
    );
};
