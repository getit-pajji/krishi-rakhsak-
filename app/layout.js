// app/layout.js
import './globals.css';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Krishi Mitra Pro',
  description: 'AI-Powered Farming Assistant for Indian Farmers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
        {children}
        <Nav />
      </body>
    </html>
  );
}
