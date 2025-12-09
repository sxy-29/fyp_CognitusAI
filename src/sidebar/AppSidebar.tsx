import { Link, useLocation } from "react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from "../components/ui/sidebar";
import { MessageSquare, BookOpen, Folder, Link as LinkIcon, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import NavUser from "./NavUser";
import CollapsibleChat from "./CollapsibleChat";

function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();
    const expanded = state === "expanded";

    // App Sidebar Component
    const sidebarItems = [
        {
            title: "Chats",
            icon: MessageSquare,
            url: "/",
            items: [ // replace by the actual chat history
                {
                    title: "Chat 1",
                    url: "/",
                },
                {
                    title: "Chat 2",
                    url: "/",
                }
            ]
        },
        // {
        //     title: "Notebooks",
        //     icon: BookOpen,
        //     url: "/notebooks",
        // },
        {
            title: "Files",
            icon: Folder,
            url: "/files",
        },
        {
            title: "Data Connectors",
            icon: LinkIcon,
            url: "/dataConnectors",
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className={cn("flex justify-between items-center w-full pb-4", expanded ? "px-2" : "justify-center")}>
                    {expanded && (
                        <h1 className="leading-none text-2xl font-bold text-blue-600 text-nowrap">
                            Cognitus AI
                        </h1>
                    )}
                    <SidebarTrigger />
                </div>

                <SidebarMenu className={expanded ? "px-2" : ""}>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className={expanded ? "border-2 border-gray-300 rounded-lg bg-white shadow hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" : ""}
                            tooltip="New Chat"
                        >
                            <Link to="/">
                                <SquarePen className="size-4" />
                                <span>New Chat</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                (item.title === "Chats") ? (
                                    expanded ?
                                        <CollapsibleChat key={item.title} item={item} location={location} />
                                        : <></>
                                ) : (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={location.pathname === item.url}
                                            tooltip={item.title}
                                        >
                                            <Link to={item.url}>
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className={cn("border-t", expanded ? "px-2" : "justify-center")}>
                <NavUser name="Name" email="abcdefg123@gmail.com.my" />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar >
    );
}

export default AppSidebar;