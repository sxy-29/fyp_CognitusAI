import {
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuAction,
    SidebarInput
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { ChevronRight, MoreHorizontal, Pencil, Search, Trash } from "lucide-react";
import { Link } from "react-router";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type CollapsibleChatProps = {
    item: {
        title: string;
        icon: React.ComponentType<any>;
        url: string;
        items?: {
            title: string;
            url: string;
        }[];
    };
    location: {
        pathname: string;
    };
}

function CollapsibleChat({ item, location }: CollapsibleChatProps) {
    const [searchText, setSearchText] = useState("");

    // File filtering
    const filteredChats = item.items?.filter((chat) =>
        chat.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem className="px-1 relative">
                            <Label className="sr-only">
                                Search
                            </Label>
                            <SidebarInput
                                id="chat-search"
                                placeholder="Search chats"
                                className="pl-8 bg-sidebar-input text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-sidebar-accent focus:ring-offset-0 border border-gray-300 rounded-lg"
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                            />
                            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 opacity-50 select-none" />
                        </SidebarMenuSubItem>

                        {/* Chat History */}
                        {filteredChats?.map((subItem, idx) => (
                            <SidebarMenuSubItem key={idx}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={location.pathname === subItem.url}
                                >
                                    <Link to={subItem.url}>
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction>
                                            <MoreHorizontal className="size-4" />
                                            <span className="sr-only">More</span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="right" align="start" className="rounded-lg">
                                        <DropdownMenuItem>
                                            <Pencil className="size-4" />
                                            <span>Rename</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Trash className="size-4" />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

export default CollapsibleChat;