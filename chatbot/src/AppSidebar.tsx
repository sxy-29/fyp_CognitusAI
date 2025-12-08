import { Link, useLocation } from "react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from "./components/ui/sidebar";
import { MessageSquare, BookOpen, Folder, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();

    // App Sidebar Component
    const sidebarItems = [
        {
            title: "Chats",
            icon: MessageSquare,
            url: "/",
        },
        {
            title: "Notebooks",
            icon: BookOpen,
            url: "/notebooks",
        },
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

    const expanded = state === "expanded";
    
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader
                className={cn("h-12 border-b flex items-center", expanded ? "px-4" : "p-2 justify-center")}
            >
                <div className="flex justify-between items-center w-full">
                    {expanded && (
                        <h1 className="leading-none text-2xl font-bold text-blue-600 text-nowrap">
                            Cognitus AI
                        </h1>
                    )}
                    <SidebarTrigger />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
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
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

export default AppSidebar;