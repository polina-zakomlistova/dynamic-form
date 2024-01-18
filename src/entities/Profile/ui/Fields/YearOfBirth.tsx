import { InputTextValidate } from 'features/hooks/useInputTextValidate';
import { Input, InputSize, InputTheme } from 'shared/ui/Input/Input';

interface YearOfBirthProps {
    className?: string;
    validator: InputTextValidate;
}

export const YearOfBirth = (props: YearOfBirthProps) => {
    const { className, validator } = props;

    return (
        <Input
            id={validator.id}
            className={className}
            value={validator.value}
            onChange={validator.handleChange}
            onBlur={validator.handleBlur}
            name="yearOfBirth"
            label="Год рождения"
            useErrorMessage
            textError={validator.error || ''}
            touched={validator.touched}
            size={InputSize.Width100}
            theme={validator.error ? InputTheme.ERROR : InputTheme.COLOR}
        />
    );
};
