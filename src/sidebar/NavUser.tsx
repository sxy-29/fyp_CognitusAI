import { ChevronUp, LogOut, User2 } from "lucide-react";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type NavUserProps = {
    name: string;
    email: string;
}

function NavUser({ name, email }: NavUserProps) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <User2 />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{name}</span>
                                <span className="truncate text-xs">{email}</span>
                            </div>
                            <ChevronUp className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg"
                        side="top"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuItem>
                            <LogOut />  {/* logout function */}
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

export default NavUser;