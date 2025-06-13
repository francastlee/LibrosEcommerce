'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { LibraryBig, LogOut, Menu, ShieldUser, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, authenticated, logout } = useAuth();
  const isAdmin = user?.roles?.includes('admin');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#27233A] text-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/books">
            <span className="text-sm font-bold hover:text-[#B3C0A4]">
              Libros<span className="inline text-[#DCC48E]">Ecommerce</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/books" className="flex items-center gap-2 text-sm hover:text-[#B3C0A4] transition">
            <LibraryBig className="w-4 h-4" /> Libros
          </Link>

          <Link href="/cart" className="flex items-center gap-2 text-sm hover:text-[#B3C0A4] transition">
            <ShoppingCart className="w-4 h-4" /> Carrito
          </Link>

          {isAdmin && (
            <Link
              href="/admin/books"
              className="flex items-center gap-1 text-sm hover:text-[#B3C0A4] transition"
            >
              <span className="text-[#DCC48E] font-semibold">
                <ShieldUser className="inline w-4 h-4 mr-2" /> Admin
            </span>
            </Link>
          )}
        </div>

        <div className="hidden md:block">
          {authenticated ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-xl transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/auth/register"
              className="bg-[#505168] hover:bg-[#B3C0A4] cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-xl transition"
            >
              Sign Up
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link href="/books" className="block text-sm hover:text-[#B3C0A4]" onClick={() => setMenuOpen(false)}>
            <LibraryBig className="inline w-4 h-4 mr-2" /> Libros
          </Link>

          <Link href="/cart" className="block text-sm hover:text-[#B3C0A4]" onClick={() => setMenuOpen(false)}>
            <ShoppingCart className="inline w-4 h-4 mr-2" /> Carrito
          </Link>

          {isAdmin && (
            <Link href="/admin/books" className="block text-sm hover:text-[#B3C0A4]" onClick={() => setMenuOpen(false)}>
              <span className="text-[#DCC48E] font-semibold">
              <ShieldUser className="inline w-4 h-4 mr-2" />Admin
              </span>
            </Link>
          )}

          {authenticated ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-xl transition flex items-center gap-2 w-40"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#505168] hover:bg-[#B3C0A4] cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-xl transition"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
