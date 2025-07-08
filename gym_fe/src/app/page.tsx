'use client';

import React, { useState } from 'react';
import AdminLayout from './admin/admin';
import UserManagement from './admin/customer/customer';


function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement />;
    }
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
}

export default App;