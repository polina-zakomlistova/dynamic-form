import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { EditableTableWithValidation } from 'shared/ui/EditableTableWithValidation/EditableTableWithValidation';
import { observer } from 'mobx-react-lite';

import { TableValidate } from 'features/hooks/useTableValidate';
import { IWorksPlace } from 'entities/Profile/model/types/profile';
import cls from './WorksTable.module.scss';

interface WorksTableProps {
    className?: string;
    validator: TableValidate<IWorksPlace>;
}

export const WorksTable = observer((props: WorksTableProps) => {
    const { className, validator } = props;

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

    const handleAdd = () => {
        validator.addRow({
            organization: '',
            yearEnd: 0,
            yearStart: 0,
        });
    };

    const handleDelete = (index: number) => {
        validator.deleteRow(index);
    };

    return (
        <div className={cls.WorksTable}>
            <EditableTableWithValidation
                // @ts-ignore
                data={validator.tableData}
                columns={columns}
                onAddRow={handleAdd}
                onDeleteRow={handleDelete}
                // @ts-ignore
                onChange={validator.handleChange}
            />
        </div>
    );
});
