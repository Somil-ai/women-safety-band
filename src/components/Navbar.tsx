import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Clock, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg py-2 px-4">
      <div className="container mx-auto">
        <ul className="flex justify-around items-center">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem to="/contacts" icon={<Users size={20} />} label="Contacts" />
          <NavItem to="/history" icon={<Clock size={20} />} label="History" />
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </ul>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center py-1 px-3 rounded-md transition-colors duration-200 ${
            isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`
        }
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </NavLink>
    </li>
  );
};

export default Navbar;