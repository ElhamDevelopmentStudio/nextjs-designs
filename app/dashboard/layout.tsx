"use client";
import React, { useState, ReactElement, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  FaAdn,
  FaContao,
  FaCreativeCommonsBy,
  FaUserPlus,
} from "react-icons/fa"; // Ensure you have these icons

interface LayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  label: string;
  icon: ReactElement;
  path?: string;
  children?: MenuItem[]; // Optional for submenus
}

// Define the menu items with explicit types
const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <FaAdn />,
    path: "/dashboard",
  },
  {
    label: "Contests",
    icon: <FaContao />,
    children: [
      {
        label: "Create Contest",
        icon: <FaCreativeCommonsBy />,
        path: "/contests/create",
      },
    ],
  },
  {
    label: "Users",
    icon: <FaUserPlus />,
    children: [
      { label: "Create User", icon: <FaUserPlus />, path: "/users/create" },
    ],
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleSidebar = (): void => setCollapsed(!collapsed);

  // Render function with appropriate types
  const renderMenuItems = (items: MenuItem[]): ReactElement[] =>
    items.map((item) =>
      item.children ? (
        <SubMenu key={item.label} title={item.label} icon={item.icon}>
          {item.children.map((subItem) => (
            <MenuItem key={subItem.label} icon={subItem.icon}>
              <a>
                <Link href="#">{subItem.label}</Link>
              </a>
            </MenuItem>
          ))}
        </SubMenu>
      ) : (
        <MenuItem key={item.label} icon={item.icon}>
          <a>
            <Link href="#">{item.label}</Link>
          </a>
        </MenuItem>
      )
    );

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        width="270px"
        collapsedWidth="80px"
        transitionDuration={300}
        rootStyles={{ ".pro-sidebar": { backgroundColor: "#f0f0f0" } }}
        breakPoint="md"
      >
        <Menu>
          <MenuItem icon={<FaAdn />} onClick={toggleSidebar}>
            {collapsed ? "Expand" : "Collapse"}
          </MenuItem>
          {renderMenuItems(menuItems)}
        </Menu>
      </Sidebar>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
