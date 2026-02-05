import type {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Fragment} from "react";

export function ColumnTransformation<TData, TValue>(columns: ColumnDef<TData, TValue>[], multiselect: boolean, expandable: boolean): ColumnDef<TData, TValue>[] {
    if (multiselect || expandable) {
        columns.unshift({
            id: "select",
            maxSize: 20,

            header: ({table}) => (
                multiselect && (
                    <Checkbox
                        className=''
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                )
            ),
            cell: ({row}) => (
                <Fragment>
                    {
                        (expandable && row.getCanExpand()) ?
                            <button
                                className='ml-2'
                                onClick={row.getToggleExpandedHandler()}
                                style={{cursor: 'pointer'}}
                            >
                                {row.getIsExpanded() ? '👇' : '👉'}
                            </button>
                            : ''
                    }
                    {
                        multiselect && (
                            <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(value) => row.toggleSelected(!!value)}
                                aria-label="Select row"
                            />
                        )
                    }

                </Fragment>


            ),
            // enableSorting: false,
            size: 0,
            // enableHiding: false,
        });
    }
    return columns;
}
