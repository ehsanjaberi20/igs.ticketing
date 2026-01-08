import type {ColumnDef} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Fragment} from "react";

export type User = {
    invoice: string
    paymentStatus: string
    totalAmount: string
    paymentMethod: string
}
export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                className=''
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Fragment>
                {
                    row.getCanExpand() ?
                        <button
                            className='ml-2'
                            onClick={row.getToggleExpandedHandler()}
                            style={{cursor: 'pointer'}}
                        >
                            {row.getIsExpanded() ? '👇' : '👉'}
                        </button>
                        : ''
                }
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </Fragment>


        ),
        // enableSorting: false,
        size: 0,
        // enableHiding: false,
    },
    // {
    //     header: '.',
    //     size:0,
    //     // cell: ({ row }) => {
    //     //     return
    //     // },
    // },
    {
        accessorKey: "invoice",
        header: "invoice",


    },
    {
        accessorKey: "paymentStatus",
        header: "paymentStatus",
    },
    {
        accessorKey: "totalAmount",
        header: "totalAmount",
        footer: (info) => {
            console.log(info);
            return info.column.id
        }
    },
    {
        accessorKey: "paymentMethod",
        header: "paymentMethod",
        enableColumnFilter: true,
    },
    {
        accessorKey: "actions",
        header: "عملیات",
        size: 1,
        cell: ({row}) => {
            const user = row.original
            return (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.invoice)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]