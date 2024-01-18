import { Input, InputSize, InputTheme } from 'shared/ui/Input/Input';
import { InputTextValidate } from 'features/hooks/useInputTextValidate';

interface EmailProps {
    className?: string;
    validator: InputTextValidate;
}

export const Email = (props: EmailProps) => {
    const { className, validator } = props;

    return (
        <Input
            id={validator.id}
            value={validator.value}
            className={className}
            onChange={validator.handleChange}
            onBlur={validator.handleBlur}
            name="email"
            label="Email"
            useErrorMessage
            textError={validator.error || ''}
            touched={validator.touched}
            size={InputSize.Width100}
            theme={validator.error ? InputTheme.ERROR : InputTheme.COLOR}
        />
    );
};
