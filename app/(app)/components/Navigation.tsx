"use client";

import React from "react";
import Link from "next/link";
import { Menu, Button, Image } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-circle.jpg"
                alt="Blupi Dog Training"
                className="h-10 w-10 rounded-full"
                h={40}
                w={40}
                radius="xl"
              />
              <span className="text-xl font-bold text-primary">
                Blupi Dog Training
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              About
            </Link>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  variant="subtle"
                  rightSection={<IconChevronDown size={16} />}
                  className={
                    pathname.startsWith("/services")
                      ? "text-primary"
                      : "text-gray-700"
                  }
                >
                  Services
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <Link
                    href="/services"
                    className="block w-full h-full"
                  >
                    All Services
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/services#private"
                    className="block w-full h-full"
                  >
                    Private Sessions
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/services#group"
                    className="block w-full h-full"
                  >
                    Group Classes
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/services#workshop"
                    className="block w-full h-full"
                  >
                    Workshops
                  </Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Link
              href="/blog"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/blog")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
