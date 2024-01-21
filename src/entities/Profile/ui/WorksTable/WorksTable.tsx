import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { EditableTableWithValidation } from 'shared/ui/EditableTableWithValidation/EditableTableWithValidation';
import { observer } from 'mobx-react-lite';

import { TableValidate } from 'features/hooks/useTableValidate';
import { IWorksPlace } from 'entities/Profile/model/types/profile';
import { Validator } from 'features/validators';
import cls from './WorksTable.module.scss';

interface WorksTableProps {
    className?: string;
    validator: TableValidate<IWorksPlace>;
    addRow:()=>void
    deleteRow:(index:number)=>void;
}

export const WorksTable = observer((props: WorksTableProps) => {
    const {
        className,
        validator,
        addRow,
        deleteRow,
    } = props;

    const columns = [
        {
            key: 'organization',
            title: 'Организация',
        },
        {
            key: 'yearStart',
            title: 'Год начала работы',
        },
        {
            key: 'yearEnd',
            title: 'Год окончания работы',
        },
    ];

    return (
        <div className={cls.WorksTable}>
            <EditableTableWithValidation
                // @ts-ignore
                data={validator.tableData}
                columns={columns}
                onAddRow={addRow}
                onDeleteRow={deleteRow}
                // @ts-ignore
                onChange={validator.handleChange}
            />
        </div>
    );
});
