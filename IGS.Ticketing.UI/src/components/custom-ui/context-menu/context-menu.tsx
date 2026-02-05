import React, {type ComponentType} from "react";

import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";

export interface ContextMenuItemProps {
    //type?: 'action' | 'line',
    label: string,
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger',
    icon?: ComponentType<{color:string}>,
    onClick: (item: ContextMenuItemProps) => void,
    disabled?: boolean,

}

interface ContextMenuProps {
    children: React.ReactNode,
    items: ContextMenuItemProps[],

}

const CustomContextMenu = (props: ContextMenuProps) => {
    const {children, items} = props;
    const convertColor = (color: 'default' | 'primary' | 'success' | 'warning' | 'danger') => {
        switch (color) {
            case 'primary':
                return '#4b8ff6'
            case 'success':
                return '#5ef34c'
            case 'warning':
                return '#f4ab55'
            case 'danger':
                return '#ff4218'
            default:
                return '#6c6c6c'
        }
    }
    return (
        <ContextMenu modal={false} dir='rtl'>
            <ContextMenuTrigger asChild>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                {
                    items.map((item, index) => (
                        <ContextMenuItem key={index}
                                         className='cursor-pointer'
                                         onClick={() => {
                                             item.onClick(item)
                                         }}>
                            {item.icon && <item.icon color={convertColor(item.color ?? 'default')}/>}
                            {item.label}

                        </ContextMenuItem>
                    ))
                }
            </ContextMenuContent>
        </ContextMenu>
    )
}
export default CustomContextMenu;