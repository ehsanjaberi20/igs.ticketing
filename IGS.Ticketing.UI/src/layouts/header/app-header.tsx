import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LogOut, Moon, Sun} from "lucide-react";
import {useAuth} from "@/context/AuthContext.tsx";
import {useTheme} from "next-themes";

export const APPHeader = () => {
    const {user, logoutUser} = useAuth();
    const {setTheme, theme} = useTheme()

    const toggleDarkMode = () => {
        setTheme(theme === 'light' ? "dark" : "light");
    }
    return (
        <header
            className='z-10 sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-sm bg-white/70 dark:bg-white/10'>
            <SidebarTrigger className="-ml-1"/>
            <Separator
                orientation="vertical"
                className="ml-2 data-[orientation=vertical]:h-4"
            />
            <h3>دی 1404</h3>
            <ul className='flex mr-auto items-center gap-2'>
                <li>
                            <span className='text-sm'>
                                {user?.usrNameStr} {user?.usrFamilyStr}
                            </span>
                </li>
                <li>
                    <Button variant="outline" size="icon" aria-label="Submit" onClick={toggleDarkMode}
                            className='hover:bg-gray-200 dark:hover:bg-gray-600'>
                        {theme==='light' ? <Moon/>: <Sun/>}

                    </Button>
                </li>
                <li>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Submit" onClick={logoutUser}
                                    className='text-red-500 hover:text-red-500 hover:bg-red-50'>
                                <LogOut className='rotate-180'/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            خروج
                        </TooltipContent>
                    </Tooltip>

                </li>
            </ul>
        </header>
    )
}