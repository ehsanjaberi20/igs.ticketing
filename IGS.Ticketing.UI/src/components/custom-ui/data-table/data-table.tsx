import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.tsx";
import {
    type ColumnDef, type ExpandedState,
    flexRender,
    getCoreRowModel, getExpandedRowModel,
    getFilteredRowModel,
    getGroupedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {Fragment, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({data, columns}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [expanded, setExpanded] = useState<ExpandedState>({})

    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        getRowCanExpand: (row) => true, // Add your logic to determine if a row can be expanded. True means all rows include expanded data
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        manualPagination: true, //turn off client-side pagination
        // initialState: {
        //   columnOrder: []
        // },
        // columnResizeDirection: 'rtl', //change column resize direction to "rtl" for certain locales
        // columnResizeMode: 'onChange', //change column resize mode to "onChange"
        state: {
            rowSelection: rowSelection,
            expanded: expanded, // must pass expanded state back to the table

        }
    })

    return (
        <Fragment>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter invoice..."
                    value={(table.getColumn("invoice")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("invoice")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <Table className='mt-2'>
                {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
                <TableHeader className='text-center'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} style={{ width: header.getSize()+'px'}}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <Fragment key={row.id}>
                                <ContextMenu modal={false}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            // key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className={'text-center'}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}

                                        </TableRow>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem>Profile</ContextMenuItem>
                                        <ContextMenuItem>Billing</ContextMenuItem>
                                        <ContextMenuItem>Team</ContextMenuItem>
                                        <ContextMenuItem>Subscription</ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>

                                {row.getIsExpanded() && (
                                    <TableRow>
                                        <TableCell className='p-2' colSpan={row.getAllCells().length}>
                                            زیر فرم
                                            <b>sf</b>
                                            <p>sdsfh</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </Fragment>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    {table.getFooterGroups().map((footerGroup) => (
                        <TableRow key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <TableCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext(),
                                        )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableFooter>
            </Table>
        </Fragment>

    )
}