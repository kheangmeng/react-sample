import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function GuestLayout() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  if(isLoading && !isAuthenticated) {
    return <div>Loading...</div>
  }
  if(!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl">Guest Layout</h1>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2023 Your Company
      </footer>
    </div>
  );
}
