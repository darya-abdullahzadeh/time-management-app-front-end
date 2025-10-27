"use client";

import { BarChart, CheckSquare, LayoutDashboard, LayoutList, Settings } from "lucide-react";
import Link from "next/link";
import UserBadge from "./UserBadge";

export default function Sidebar() {
    const sideBarItems = [
        {
            label: "Dashboard",
            href: "/",
            icon: <LayoutDashboard />
        },
        {
            label: "Tasks",
            href: "/tasks",
            icon: <CheckSquare />
        },
        {
            label: 'Analytics',
            href: '/analytics',
            icon: <BarChart />
        },
        {
            label: 'Settings',
            href: '/settings',
            icon: <Settings />
        }
    ]
    return (
      <div className="w-64 min-h-screen flex flex-col gap-2 p-7 bg-purple-600/60 text-white">
        <h1>Sidebar</h1>
        <UserBadge />
        <div className="flex flex-col gap-2">
          {sideBarItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <div className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}