import { GenderSelect } from 'entities/Gender';
import { InputTextValidate } from 'features/hooks/useInputTextValidate';
import { Gender as GenderType } from 'entities/Gender/model/gender';

interface GenderProps {
    className?: string;
    validator: InputTextValidate;
}

export const Gender = (props: GenderProps) => {
    const { className, validator } = props;

    return (
        <GenderSelect
            className={className}
            value={validator.value as GenderType}
            onChange={validator.handleChange}
            textError={validator.error || ''}
            touched={validator.touched}
            onBlur={validator.handleBlur}
        />
    );
};
