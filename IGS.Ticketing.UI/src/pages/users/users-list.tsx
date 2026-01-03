import {Fragment} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Download, Plus} from "lucide-react";
import {DataTable} from "@/components/custom-ui/data-table/data-table.tsx";

export const Users=()=>{
    return(
        <Fragment>
            <div className='flex flex-wrap items-end justify-between gap-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>کاربران</h2>
                    <p className='text-muted-foreground'>
                        در اینجا کاربران و نقش‌های آن‌ها را مدیریت کنید.
                    </p>
                </div>
                <div className='flex gap-2'>
                    <Button className='space-x-1' >

                        <span>ایجاد کاربر</span> <Plus size={18} />
                    </Button>
                    <Button
                        variant='outline'
                        className='space-x-1'
                        // onClick={() => setOpen('import')}
                    >
                        <span>بارگزاری از فایل</span> <Download size={18} />
                    </Button>
                </div>
            </div>
            <DataTable/>
        </Fragment>
    )
}