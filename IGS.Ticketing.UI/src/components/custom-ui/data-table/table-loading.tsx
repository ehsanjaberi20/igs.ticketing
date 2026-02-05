import type {ReactNode} from "react";
import {TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";

type TableLoadingProps = {
    loading: boolean;
    children: ReactNode;
    rowcount?: number;
}
export const TableLoading = (props: TableLoadingProps) => {
    const {loading, children, rowcount = 1} = props;
    if (loading)
        return (
            new Array(rowcount).fill(0).map((_, i) => (
                <TableBody key={i}>
                    <TableRow className='border-0'>
                        <TableCell colSpan={6} className='text-center p-2 border-0'>
                            <div
                                className="w-full bg-gray-300 dark:bg-gray-800 rounded-xs overflow-hidden h-2 md:h-2 shadow-md animate-pulse delay-0">
                            </div>
                            <div
                                className="w-full bg-gray-300 dark:bg-gray-800 rounded-xs overflow-hidden h-2 md:h-2 shadow-md animate-pulse delay-200">
                            </div>
                            <div
                                className="w-full bg-gray-300 dark:bg-gray-800 rounded-xs overflow-hidden h-2 md:h-2 shadow-md animate-pulse delay-500">
                            </div>
                            <div
                                className="w-full bg-gray-300 dark:bg-gray-800 rounded-xs overflow-hidden h-2 md:h-2 shadow-md animate-pulse delay-1000">
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            ))
        );
    return children;
}