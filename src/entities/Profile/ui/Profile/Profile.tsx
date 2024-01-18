import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    email, max, min, minWords, required, Validator,
} from 'features/validators';
import useStore from 'features/hooks/useStore';
import { InputTextValidate, useInputTextValidate } from 'features/hooks/useInputTextValidate';
import { useFormValidate } from 'features/hooks/useFormValidate';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { toJS } from 'mobx';
import { WorksTable } from 'entities/Profile/ui/WorksTable/WorksTable';
import { IWorksPlace } from 'entities/Profile/model/types/profile';
import { TableValidate, useTableValidation } from 'features/hooks/useTableValidate';
import { number } from 'features/validators/number';
import cls from './Profile.module.scss';
import { Gender } from '../Fields/Gender';
import { YearOfBirth } from '../Fields/YearOfBirth';
import { Email } from '../Fields/Email';
import { Fullname } from '../Fields/Fullname';

interface ProfileProps {
    className?: string;
}

const currentYear = new Date().getFullYear();

const ageOfMajority = 18;

const validatorsFullname = [
    required(),
    minWords(3, 'Должно содержать как минимум 3 слова'),
];

const validatorsEmail = [
    required(),
    email(),
];

const validatorsGender = [
    required(),
];

const validatorsYearOfBirth = [
    required(),
    number(),
    min(1900),
    max((currentYear - ageOfMajority)),
];

export const Profile = observer((props: ProfileProps) => {
    const { className } = props;

    const mods:Mods = {};

    const [profileStore] = useStore('profile');

    const {
        initData, data, clear, updateWorksPlaces, updateField,
    } = profileStore;

    const {
        fullname,
        email,
        gender,
        yearOfBirth,
        worksPlaces,
    } = initData;

    // события для полей
    const onChangeHandlerFullName = useCallback((value: string) => {
        updateField('fullname', value);
    }, [updateField]);

    const onChangeHandlerEmail = useCallback((value: string) => {
        updateField('email', value);
    }, [updateField]);

    const onChangeHandlerGender = (value: string) => {
        updateField('gender', value);
    };

    const onChangeHandlerYearOfBirth = useCallback((value: string) => {
        updateField('yearOfBirth', value);
    }, [updateField]);

    // управление валидацией для полей
    const fullnameValidate = useInputTextValidate(
        'fullname',
        validatorsFullname,
        onChangeHandlerFullName,
        fullname,
    );

    const emailValidate = useInputTextValidate(
        'email',
        validatorsEmail,
        onChangeHandlerEmail,
        email,
    );

    const genderValidate = useInputTextValidate(
        'gender',
        validatorsGender,
        onChangeHandlerGender,
        gender,
    );

    const yearOfBirthValidate = useInputTextValidate(
        'yearOfBirth',
        validatorsYearOfBirth,
        onChangeHandlerYearOfBirth,
        yearOfBirth,
    );

    // эти валидаторы зависят от текущих значений
    const validatorsOrganization = [
        required(),
    ];

    const validatorsYearStart = (yearOfBirth: number) => [
        required(),
        number(),
        min(yearOfBirth + ageOfMajority),
        max(currentYear),
    ];

    const validatorsYearEnd = (yearStart: number) => [
        required(),
        number(),
        min(yearStart),
        max(currentYear),
    ];

    const getValidatorsOrganization = () => {
        const validators: Validator<string>[][] = [];

        worksPlaces.forEach(() => validators.push(validatorsOrganization));

        return validators;
    };

    const getValidatorsYearStart = () => {
        const validators: Validator<string>[][] = [];

        worksPlaces.forEach(() => {
            if (!(isNaN(Number(data.yearOfBirth)))) {
                validators.push(validatorsYearStart(Number(data.yearOfBirth)));
            } else validators.push([required(), number()]);
        });

        return validators;
    };

    const getValidatorsYearEnd = () => {
        const validators: Validator<string>[][] = [];

        worksPlaces.forEach((item:IWorksPlace) => {
            if (!(isNaN(Number(item.yearStart)))) {
                validators.push(validatorsYearEnd(Number(item.yearStart)));
            } else validators.push([required(), number()]);
        });

        return validators;
    };

    const validatorsWorks = {
        organization: getValidatorsOrganization(),
        yearStart: getValidatorsYearStart(),
        yearEnd: getValidatorsYearEnd(),
    };
    // @ts-ignore
    const worksValidate = useTableValidation<IWorksPlace>(worksPlaces, validatorsWorks, updateWorksPlaces);

    // управление формой
    const form = useFormValidate<InputTextValidate, TableValidate<IWorksPlace>>({
        fields: [
            fullnameValidate,
            emailValidate,
            genderValidate,
            yearOfBirthValidate,
            worksValidate,
        ],
        onSuccess: () => console.log(toJS(data)),
        onFailure: (error) => console.log(error),
    });

    return (
        <form
            className={classNames(cls.Profile, mods, [className])}
            onSubmit={form.handleFormSubmit}
            onReset={(e) => {
                form.handleFormReset(e);
                clear();
            }}
        >
            {form.sendingError
                ? <p className={cls.error}>{form.sendingError}</p>
                : null}
            <Fullname className={cls.field} validator={fullnameValidate} />
            <Gender className={cls.field} validator={genderValidate} />
            <YearOfBirth className={cls.field} validator={yearOfBirthValidate} />
            <Email className={cls.field} validator={emailValidate} />
            <WorksTable validator={worksValidate} />
            <hr />
            <Button type="submit" disabled={form.isSending}>Отправить</Button>
            <Button type="reset">Очистить</Button>

        </form>

    );
});
