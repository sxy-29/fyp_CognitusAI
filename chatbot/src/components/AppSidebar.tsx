import { Link, useLocation } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { MessageSquare, BookOpen, Folder, Link as LinkIcon } from "lucide-react";

function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();

    // App Sidebar Component
    const sidebarItems = [
        {
            title: "Chats",
            icon: MessageSquare,
            url: "/"
        },
        {
            title: "Notebooks",
            icon: BookOpen,
            url: "/notebooks"
        },
        {
            title: "Files",
            icon: Folder,
            url: "/files"
        },
        {
            title: "Data Connectors",
            icon: LinkIcon,
            url: "/dataConnectors"
        }
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-12 px-4 border-b flex items-center">
                <div className="flex justify-between w-full">
                    {state === "expanded" && (
                        <h1 className="text-2xl font-bold text-blue-600">Cognitus AI</h1>
                    )}
                    <SidebarTrigger className="flex-shrink-0" />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
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