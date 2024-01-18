import { useState, useCallback, ChangeEvent } from 'react';
import { ValidationResult, Validator, validate } from 'features/validators';
import { DefaultField } from 'shared/lib/types/types';

export type TableCell<T> = {
    value: T;
    error: ValidationResult[] | null;
    touched: boolean;
};

export type TableValidate<T> = {
    tableData:TableCell<T>[];
    handleChange:(rowIndex: number, columnName: keyof T, newValue: T[keyof T])=> void
    validateTable:()=>void
    addRow:(newValue:T)=>void
    deleteRow:(index:number)=>void;
    getData:()=>T[]
    hasError: () => Promise<boolean>;
    clear:()=>void;
    error: string[];
};

export const useTableValidation = <T>(
    initialData: T[],
    validators: Record<keyof T, Validator<T[keyof T]>[][]>,
    onChange?: (value:T[])=>void,
) : TableValidate<T> => {
    const initializeTableData = (data: T[]) => data.map((item) => ({
        value: item,
        error: null,
        touched: false,
    }));

    const [tableData, setTableData] = useState<TableCell<T>[]>(initializeTableData(initialData));

    const getData = useCallback(() => tableData.map((item) => item.value), [tableData]);

    const addRow = useCallback((newValue:T) => {
        const newTableData = [...tableData];

        newTableData.push({
            value: newValue,
            error: null,
            touched: false,
        });
        setTableData(newTableData);
    }, [tableData]);

    const deleteRow = useCallback((index:number) => {
        const newTableData = [...tableData];

        newTableData?.splice(index, 1);

        setTableData(newTableData);
    }, [tableData]);

    const validateCell = useCallback(
        async (
            rowIndex: number,
            columnName: keyof T,
            cellData: T[keyof T],
            sellValidators: Validator<T[keyof T]>[],
        ) => {
            const cellError = await validate(cellData, sellValidators);
            return cellError;
        },
        [],
    );

    const validateTable = useCallback(
        async () => {
            const newData = await Promise.all(tableData.map(async (row, rowIndex) => {
                if (typeof row.value === 'object' && row.value !== null) {
                    const columns = Object.keys(row.value) as Array<keyof T>;

                    const cellError = await Promise.all(columns.map(async (columnName) => {
                        const cellData = row.value[columnName];
                        const cellValidators = validators[columnName][rowIndex] || [];
                        return validateCell(rowIndex, columnName, cellData, cellValidators);
                    }));

                    return {
                        value: row.value,
                        error: cellError || '',
                        touched: row.touched,
                    };
                }
                return row;
            }));
            // @ts-ignore
            setTableData(newData);
        },
        [tableData, validateCell, validators],
    );

    const handleChange = useCallback(
         (rowIndex: number, columnName: keyof T, newValue: T[keyof T]) => {
            const newTableData = [...tableData];
            newTableData[rowIndex].value[columnName] = newValue;
            newTableData[rowIndex].touched = true;
            validateTable();
            setTableData(newTableData);
            onChange?.(getData());
        },
        [tableData, getData, onChange, validateTable],
    );
    const hasError = useCallback(async () => {
        await validateTable();
        let hasError = false;
        tableData.forEach((row) => {
            const hasNonEmptyValues = row.error?.some((item) => item !== null && item !== undefined && item !== '');
            if (hasNonEmptyValues) {
                hasError = true;
            }
        });
        return hasError;
    }, [tableData, validateTable]);

    const clear = () => {
        setTableData([]);
    };

    const getErrorsString = ():string[] => {
        const errorList:string[] = [];
        tableData.forEach((item) => {
            if (item.error) {
                errorList.push(item.error.toString());
            }
        });
        return errorList;
    };
    const error = getErrorsString();

    return {
        tableData,
        handleChange,
        validateTable,
        addRow,
        deleteRow,
        getData,
        hasError,
        clear,
        error,
    };
};
