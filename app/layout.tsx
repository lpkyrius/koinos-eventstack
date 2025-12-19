import React, { ReactNode } from 'react';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
