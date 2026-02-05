import type {ColumnDef} from "@tanstack/react-table";

import type {User} from "./types.ts";

export const columns: ColumnDef<User>[] = [

    // {
    //     header: '.',
    //     size:0,
    //     // cell: ({ row }) => {
    //     //     return
    //     // },
    // },
    {
        accessorKey: "usrNameStr",
        header: "نام",
        cell: ({row}) => row.original.usrNameStr + ' ' + row.original.usrFamilyStr
    },
    {
        accessorKey: "usrNationalCodeStr",
        header: "کد ملی",
    },
    {
        accessorKey: "usrPhoneNumberStr",
        header: "شماره همراه",
    }
]