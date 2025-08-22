import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Button, Image } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Image 
                src="/logo-circle.jpg" 
                alt="Blupi Dog Training" 
                className="h-10 w-10 rounded-full"
                h={40}
                w={40}
                radius="xl"
              />
              <span className="text-xl font-bold text-primary">Blupi Dog Training</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              About
            </Link>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button 
                  variant="subtle" 
                  color="gray"
                  rightSection={<IconChevronDown size={16} />}
                  className={location.pathname.startsWith('/services') ? 'text-primary' : 'text-gray-700'}
                >
                  Services
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item component={Link} to="/services/private-session">
                  Private 1-2-1 Session
                </Menu.Item>
                <Menu.Item component={Link} to="/services/group-class">
                  Group Class
                </Menu.Item>
                <Menu.Item component={Link} to="/services/workshop">
                  Workshop
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Link
              to="/blog"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/blog') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-700 hover:text-primary'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-700 hover:text-primary'
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