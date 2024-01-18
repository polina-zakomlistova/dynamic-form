type ValidationResult = string | null;
type Validator<T> = (params: T) => Promise<ValidationResult>;
type GetValidator<Options, Params> = (options?: Options, message?:string) => Validator<Params>;

export const validate = async <T>(
    value: T,
    validators: Validator<T>[],
): Promise<ValidationResult> => {
    let validationResult: ValidationResult = null;
    let i = 0;

    while (validationResult === null && i < validators.length) {
        const res = await validators[i](value);

        if (res) {
            validationResult = res;
        }

        i++;
    }

    return validationResult;
};

export type { ValidationResult, Validator, GetValidator };

export { required } from './required';
export { max } from './max';
export { min } from './min';
export { minWords } from './minWords';
export { email } from './email';
