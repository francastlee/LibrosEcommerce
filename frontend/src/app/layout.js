import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import { Providers } from './providers.jsx';
import Navbar from '../../components/layout/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'LibrosEcommerce',
  description: 'Tienda de libros online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
