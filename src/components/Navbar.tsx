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
            <Link to="/" className=" transition">Inicio</Link>
            <Link to="/productos" className=" transition">Productos</Link>
            <Link to="/sobre-nosotros" className=" transition">Nosotros</Link>
            <Link to="/contacto" className="transition">Contacto</Link>
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