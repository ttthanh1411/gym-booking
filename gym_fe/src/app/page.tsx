'use client';

import React, { useState } from 'react';
import AdminLayout from './admin/admin';
import UserManagement from './admin/customer/customer';
import ScheduleManagement from './admin/schedule/schedule';
import ServiceManagement from './admin/service/service';
import Workout from './admin/workoutcourse/workout';
import Appointment from './admin/appointment/appointment';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginLayout from './auth/login';
// import CustomerPage from '../components/customer/CustomerPage';
// import CustomerPage from './admin/customer/page';


function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  // const renderContent = () => {
  //   switch (currentView) {
  //     case 'users':
  //       return <UserManagement />;
  //     case 'schedule':
  //       return <ScheduleManagement />;
  //     case 'service':
  //       return <ServiceManagement />;
  //     case 'workout':
  //       return <Workout />;
  //     case 'appointment':
  //       return <Appointment />
  //   }
  // };

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
    <Router>
      <Routes>
        {/* Redirect "/" về "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login page */}
        <Route path="/login" element={<LoginLayout />} />

        {/* Admin layout with nested pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div>Welcome to Admin Dashboard</div>} />
          <Route path="users" element={<UserManagement />} />
          <Route path="schedule" element={<ScheduleManagement />} />
          <Route path="service" element={<ServiceManagement />} />
          <Route path="workout" element={<Workout />} />
          <Route path="appointment" element={<Appointment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;