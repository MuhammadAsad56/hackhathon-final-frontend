"use client";
import React, { useContext, useEffect, useState } from "react";
import { PieChartIcon, UserIcon, MonitorIcon, LogOutIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserMenu } from "./UserMenu";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import { Navigate } from "react-router";

export default function Dashboard() {
    const { user, setUser } = useContext(AuthContext);
    console.log("user in Dashboard=>", user);

  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  // Admin and User Content
  const renderContent = () => {
    if (user?.role == "admin") {
      switch (selectedMenu) {
        case "dashboard":
          return (
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          )
        case "profile":
          return <h1 className="text-2xl font-bold">Admin Profile</h1>;
        case "reports":
          return <h1 className="text-2xl font-bold">Admin Reports</h1>;
        default:
          return <h1 className="text-2xl font-bold">Admin Welcome!</h1>;
      }
    } else if (user?.role == "user") {
      switch (selectedMenu) {
        case "dashboard":
          return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Full Name</CardTitle>
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{user.fullName}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Email</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{user.email}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CNIC</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{user.cnic}</div>
              </CardContent>
            </Card>
            </div>
          )
        case "profile":
          return <h1 className="text-2xl font-bold">User Profile</h1>;
        case "reports":
          return <h1 className="text-2xl font-bold">User Reports</h1>;
        default:
          return <h1 className="text-2xl font-bold">User Welcome!</h1>;
      }
    }
  };

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null); // Reset user context on logout
  };

  const userDeatil = {
    imageUrl: "currentUser.imageUrl", // Example image URL
    name: "currentUser.fullName",
    email: "currentUser.email",
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <Sidebar className="h-full">
          <SidebarHeader>
            <h2 className="text-lg font-semibold text-center py-4">SMIT Hackathon</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setSelectedMenu("dashboard")}>
                  <PieChartIcon className="mr-2 h-4 w-4" />
                  {user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setSelectedMenu("profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  {user.role === "admin" ? "Admin Profile" : "User Profile"}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setSelectedMenu("reports")}>
                  <MonitorIcon className="mr-2 h-4 w-4" />
                  {user.role === "admin" ? "Admin Reports" : "User Reports"}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">{user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}</h1>
            </div>
            <UserMenu user={userDeatil} />
          </header>
          {/* Main Content */}
          <main className="flex-1 p-6 bg-background">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
