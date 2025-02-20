import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-[#b6142c]  text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  h-20 justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img className='w-28' src={logo} alt="" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="pb-[2px] hover:text-gray-300 relative group transition"
            >
              Inicio
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              to="/productos"
              className="pb-[2px] hover:text-gray-300 relative group transition"
            >
              Productos
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              to="/sobre-nosotros"
              className="pb-[2px] hover:text-gray-300 relative group transition"
            >
              Nosotros
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contacto"
              className="pb-[2px] hover:text-gray-300 relative group transition"
            >
              Contacto
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 hover:bg-black rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className="block px-3 py-2 hover:bg-black rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Productos
            </Link>
            <Link
              to="/sobre-nosotros"
              className="block px-3 py-2 hover:bg-black rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              to="/contacto"
              className="block px-3 py-2 hover:bg-black rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;