import React, { ReactNode, useMemo, useState } from 'react';
import { Input, InputSize, InputTheme } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { observer } from 'mobx-react-lite';
import { TableCell } from 'features/hooks/useTableValidate';
import cls from './EditableTableWithValidation.module.scss';

interface EditableTableProps<T> {
    data: TableCell<T>[];
    columns: {
        key: keyof T;
        title: string;
    }[];
    onAddRow?: () => void;
    elementAddRow?: ReactNode;
    elementDeleteRow?: ReactNode;
    onDeleteRow?: (index: number) => void;
    onChange?: (rowIndex: number, columnName: keyof T, newValue: T[keyof T]) => void;
}

export const EditableTableWithValidation = observer(
    <T extends Record<string, string>>(props: EditableTableProps<T>,
    ) => {
        const {
            data,
            columns,
            onAddRow,
            onDeleteRow,
            elementAddRow = 'Добавить строку',
            elementDeleteRow = 'Удалить строку',
            onChange,
        } = props;

        const inputElement = (
            row:TableCell<T>,
            columnName: keyof T,
            indexRow: number,
            indexColumn:number,
        ): ReactNode => {
            const id: string = `${indexRow} ${columnName as string}`;
            const value:string = row.value[columnName];
            const error:string = row.error?.[indexColumn] || '';
            const { touched } = row;

            return (
                <Input
                    id={id}
                    value={value}
                    size={InputSize.Width100}
                    onChange={(e) => {
                        const val = e.target.value;
                        onChange?.(indexRow, columnName, val as T[keyof T]);
                    }}
                    onBlur={(e) => {
                        const val = e.target.value;
                        onChange?.(indexRow, columnName, val as T[keyof T]);
                    }}
                    useErrorMessage
                    textError={error}
                    touched={touched}
                    theme={touched && error ? InputTheme.ERROR : InputTheme.TABLE}
                />
            );
        };

        return (
            <div>
                <table className={cls.table}>
                    <thead>
                        <tr className={cls.tr}>
                            {columns.map((column) => (
                                <th key={column.key as string}>{column.title}</th>
                            ))}
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((row, indexRow) => (
                            <tr key={`${row.value}`} className={cls.tr}>
                                {columns.map((column, indexColumn) => (
                                    <td
                                        className={cls.td}
                                        key={column.key as string}
                                    >
                                        {inputElement(row, column.key, indexRow, indexColumn)}
                                    </td>
                                ))}
                                <td>
                                    <Button onClick={() => onDeleteRow?.(indexRow)}>{elementDeleteRow}</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button onClick={onAddRow}>{elementAddRow}</Button>
            </div>
        );
    },
);
