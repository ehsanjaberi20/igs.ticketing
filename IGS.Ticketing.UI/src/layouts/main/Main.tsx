import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/layouts/sidebar/app-sidebar.tsx";
import {APPHeader} from "@/layouts/header/app-header.tsx";
import {Users} from "@/pages/users/users-list.tsx";


function Main() {
    return (
        <SidebarProvider dir='rtl'>
            <AppSidebar/>
            <SidebarInset
                className='md:peer-data-[variant=inset]:mr-0 md:peer-data-[variant=inset]:!ml-2'>
                <APPHeader/>
                <div className=" max-w-7xl container mx-auto px-4 py-6">
                    <Users/>


                    {/*<div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
                    {/*    <div className="bg-muted/50 aspect-video rounded-xl"/>*/}
                    {/*    <div className="bg-muted/50 aspect-video rounded-xl"/>*/}
                    {/*    <div className="bg-muted/50 aspect-video rounded-xl"/>*/}
                    {/*</div>*/}
                    {/*<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"/>*/}
                </div>
            </SidebarInset>

        </SidebarProvider>

    )
}

export default Main;
