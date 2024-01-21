import { useState, useCallback, ChangeEvent } from 'react';
import { ValidationResult, Validator, validate } from 'features/validators';
import { DefaultField } from 'shared/lib/types/types';

export type TableCell<T> = {
    value: T;
    error: Record<keyof T, ValidationResult> | null;
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
    getValidators: (data:T[])=>Record<keyof T, Validator<T[keyof T]>[][]>,
    onChange?: (value:T[])=>void,
) : TableValidate<T> => {
    const initializeTableData = (data: T[]) => data.map((item) => ({
        value: item,
        error: null,
        touched: false,
    }));

    const [tableData, setTableData] = useState<TableCell<T>[]>(initializeTableData(initialData || []));
    // const [validators, setValidators] = useState<Record<keyof T, Validator<T[keyof T]>[][]>>(initValidators);

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

    const validateTable = useCallback(
        async () => {
            const newData = await Promise.all(tableData.map(async (row, rowIndex) => {
                if (typeof row.value === 'object' && row.value !== null) {
                    const columns = Object.keys(row.value) as Array<keyof T>;
                    const cellErrors = await Promise.all(
                        columns.map(async (columnName) => {
                            const cellData = row.value[columnName];
                            const validators = getValidators(getData());
                            const cellValidators = validators[columnName][rowIndex] || [];
                            const error = await validate(cellData, cellValidators);
                            return [columnName, error];
                        }),
                    );
                    return {
                        value: row.value,
                        error: Object.fromEntries(cellErrors) || '',
                        touched: row.touched,
                    };
                }
                return row;
            }));
            // @ts-ignore
            setTableData(newData);
        },
        [tableData, getData, getValidators],
    );

    const handleChange = useCallback(
        async (rowIndex: number, columnName: keyof T, newValue: T[keyof T]) => {
            const newTableData = [...tableData];
            newTableData[rowIndex].value[columnName] = newValue;
            newTableData[rowIndex].touched = true;
            setTableData(newTableData);
            await validateTable();
            onChange?.(getData());
        },
        [tableData, getData, onChange, validateTable],
    );
    const hasError = useCallback(async () => {
        await validateTable();

        let hasError = false;

        tableData.forEach((row) => {
            if (typeof row.value === 'object' && row.value !== null) {
                const columns = Object.keys(row.value) as Array<keyof T>;
                columns.forEach((columnName) => {
                    const cellError = row.error?.[columnName];
                    if (cellError !== null && cellError !== undefined && cellError !== '') {
                        hasError = true;
                    }
                });
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
