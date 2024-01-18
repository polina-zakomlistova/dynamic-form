import { InputTextValidate } from 'features/hooks/useInputTextValidate';
import { Input, InputSize, InputTheme } from 'shared/ui/Input/Input';
import { observer } from 'mobx-react-lite';

interface FullnameProps {
    className?: string;
    validator: InputTextValidate;
}

export const Fullname = observer((props: FullnameProps) => {
    const { className, validator } = props;

    return (
        <Input
            id={validator.id || ''}
            className={className}
            name="fullname"
            label="ФИО"
            value={validator.value || ''}
            onChange={validator.handleChange}
            onBlur={validator.handleBlur}
            useErrorMessage
            textError={validator.error || ''}
            touched={validator.touched}
            size={InputSize.Width100}
            theme={validator.error ? InputTheme.ERROR : InputTheme.COLOR}
        />
    );
});
