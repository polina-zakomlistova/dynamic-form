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

    // // эти валидаторы зависят от текущих значений
    const validatorsOrganization = useCallback((): Validator<string>[] => [
        required(),
    ], [required]);

    const validatorsYearStart = useCallback((): Validator<string>[] => {
        if (!data.yearOfBirth || data.yearOfBirth === undefined) {
            return [required()];
        }

        return [
            required(),
            number(),
            min(Number(data.yearOfBirth) + ageOfMajority),
            max(currentYear),
        ];
    }, [data.yearOfBirth]);

    const validatorsYearEnd = useCallback(
        (yearStart: number|undefined): Validator<string>[] => {
            if (!yearStart) {
                return [required()];
            }

            return [
                required(),
                number(),
                min(Number(yearStart)),
                max(currentYear),
            ];
        },
        [required, number, min, max],
    );

    const validatorsWorks = useCallback((dataTable: IWorksPlace[]) => {
        if (dataTable) {
            return {
                organization: dataTable.map(() => validatorsOrganization()),
                yearStart: dataTable.map(() => validatorsYearStart()),
                yearEnd: dataTable.map((item: IWorksPlace) => validatorsYearEnd(item.yearStart)),
            };
        }
        return [];
    }, [validatorsOrganization, validatorsYearStart, validatorsYearEnd]);

    // @ts-ignore
    const worksValidate = useTableValidation<IWorksPlace>(worksPlaces, validatorsWorks, updateWorksPlaces);

    const handleAdd = () => {
        worksValidate.addRow(
            {
                organization: undefined,
                yearEnd: undefined,
                yearStart: undefined,
            },
        );
    };

    const handleDelete = (index: number) => {
        worksValidate.deleteRow(index);
    };

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
            <WorksTable validator={worksValidate} addRow={handleAdd} deleteRow={handleDelete} />
            <hr />
            <Button type="submit" disabled={form.isSending}>Отправить</Button>
            <Button type="reset">Очистить</Button>

        </form>

    );
});
