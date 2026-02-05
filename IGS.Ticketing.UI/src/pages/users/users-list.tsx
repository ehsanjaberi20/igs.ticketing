import {Fragment, useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {BadgeInfo, Balloon, Download, Plus, TableProperties, UploadCloud} from "lucide-react";
import {DataTable} from "@/components/custom-ui/data-table/data-table.tsx";
import {columns} from "@/pages/users/columns.tsx";
import {fillGrid} from "@/pages/users/api.ts";
import type {User} from "@/pages/users/types.ts";
import type {ContextMenuItemProps} from "@/components/custom-ui/context-menu/context-menu.tsx";

export const Users = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fillGrid(0, 10, "", "").then((resp) => {
            setData(resp);
            setLoading(false);
        });
    }, []);
    const rowContextMenu = (row: User): ContextMenuItemProps[] => {
        return [
            {
                label: 'ویرایش', icon: BadgeInfo, color: 'success', onClick: () => {
                    console.log('Profile', row)
                }
            },
            {
                label: 'حذف', icon: TableProperties, color: 'danger', onClick: () => {
                    console.log('Billing', row)
                }
            },
            {
                label: 'تغییر رمز عبور', icon: Balloon, color: 'primary', onClick: () => {
                    console.log('Team', row)
                }
            },
            {
                label: 'ارتقا', icon: UploadCloud, color: 'warning', onClick: () => {
                    console.log('Subscription', row)
                }
            },
        ]
    }

    return (
        <Fragment>
            <div className='flex flex-wrap items-end justify-between gap-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>کاربران</h2>
                    <p className='text-muted-foreground'>
                        در اینجا کاربران و نقش‌های آن‌ها را مدیریت کنید.
                    </p>
                </div>
                <div className='flex gap-2'>
                    <Button className='space-x-1'>

                        <span>ایجاد کاربر</span> <Plus size={18}/>
                    </Button>
                    <Button
                        variant='outline'
                        className='space-x-1'
                        // onClick={() => setOpen('import')}
                    >
                        <span>بارگزاری از فایل</span> <Download size={18}/>
                    </Button>
                </div>
            </div>
            <DataTable<User> data={data}
                             columns={columns}
                             loading={loading}
                             // expandable
                             multiselect
                             rowContextMenu={rowContextMenu}
            />
        </Fragment>
    )
}