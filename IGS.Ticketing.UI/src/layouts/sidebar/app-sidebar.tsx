import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
    SidebarMenuSubButton, SidebarMenuSubItem, useSidebar
} from "@/components/ui/sidebar.tsx";
import {
    BadgeInfo,
    ChartLine, ChevronDown,
    ChevronsUpDown,
    Home,
    Settings,
    TableProperties, Tags,
    User,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Collapsible, CollapsibleContent} from "@radix-ui/react-collapsible";

// Menu items.
const items = [
    {
        title: "کاربران",
        name: "_Users",
        icon: User,
        children: [
            {
                title: "لیست کاربران",
                name: "UsersList",
                icon: TableProperties,
            },
            {
                title: "گزارش عملکرد کاربران",
                name: "UsersPerformanceReport",
                icon: ChartLine,
            }
        ]
    },
    {
        title: "اطلاعات پایه",
        name: "_BaseInfo",
        icon: BadgeInfo,
        children: [
            {
                title: "نوع تیکت",
                name: "TicketType",
                icon: Tags,
            }
        ]
    },
    {
        title: "تنظیمات",
        name: "Settings",
        icon: Settings,
    },

]
export const AppSidebar = () => {
    const {open} = useSidebar();
    return (
        <Sidebar side='right' variant='inset' collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu dir='rtl'>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div
                                        className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Home className="size-4"/>
                                    </div>
                                    <div className="grid flex-1 text-right text-sm leading-tight">
                                        <span className="truncate font-medium">دبیرخانه</span>
                                        <span className="truncate text-xs">احسان جابری</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuItem>
                                    <span>گزینه یک</span>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>گزینه دو</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className='group-data-[collapsible=icon]:p-2 p-2'>
                <SidebarMenu>
                    {
                        items.map((item) => {
                            if ((item.children ?? []).length === 0)
                                return (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton className='cursor-pointer'>
                                            <item.icon/>
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            if (open) {
                                return (
                                    <Collapsible defaultOpen className="group/collapsible" key={item.name}>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className='group'>
                                                    <item.icon/>
                                                    <div className="grid flex-1 text-right text-sm">
                                                        <span className="truncate">{item.title}</span>
                                                    </div>
                                                    <ChevronDown
                                                                 className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180"/>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent
                                                className='overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
                                                <SidebarMenuSub className='border-l-0 border-r-1'>
                                                    {
                                                        (item.children ?? []).map((subitem) => (
                                                            <SidebarMenuSubItem className='text-xs' key={subitem.name}>
                                                                <SidebarMenuSubButton size='sm'
                                                                                      className='cursor-pointer'>
                                                                    <subitem.icon/>
                                                                    <span>{subitem.title}</span>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))
                                                    }
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )
                            } else {
                                return (
                                    <DropdownMenu dir='rtl'>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuButton size='sm'
                                                               className="cursor-pointer">
                                                <item.icon/>
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="start">
                                            {
                                                (item.children ?? []).map((subitem) => (
                                                    <DropdownMenuItem key={subitem.name} className='cursor-pointer'>
                                                        <span>{subitem.title}</span>
                                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                ))
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )
                            }
                        })
                    }
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu dir='rtl'>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div
                                        className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Home className="size-4"/>
                                    </div>
                                    <div className="grid flex-1 text-right text-sm leading-tight">
                                        <span className="truncate font-medium">دبیرخانه</span>
                                        <span className="truncate text-xs">احسان جابری</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuItem>
                                    <span>گزینه یک</span>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>گزینه دو</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
