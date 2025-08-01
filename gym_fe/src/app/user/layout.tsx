'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Home,
    ShoppingCart,
    Calendar,
    CreditCard,
    User,
    Menu,
    X,
    Dumbbell,
    Bell,
    LogOut,
    Settings
} from 'lucide-react';

const navigation = [
    { name: 'Trang chủ', href: '/user', icon: Home },
    { name: 'Mua khóa tập', href: '/user/buy', icon: ShoppingCart },
    { name: 'Lịch tập', href: '/user/schedule', icon: Calendar },
    { name: 'Thanh toán', href: '/user/payments', icon: CreditCard },
    { name: 'Hồ sơ', href: '/user/profile', icon: User },
];

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 bg-emerald-600">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <Dumbbell className="w-5 h-5 text-emerald-600" />
                            </div>
                            <span className="text-white font-bold text-lg">GymHub</span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-white hover:text-gray-200 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* User info */}
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">JD</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-gray-900 truncate">John Doe</p>
                                <p className="text-sm text-gray-500">Premium Member</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                                        isActive
                                            ? "bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className={cn(
                                        "mr-3 h-5 w-5 transition-colors",
                                        isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"
                                    )} />
                                    <span className="truncate">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 space-y-1">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                            <Settings className="mr-3 h-4 w-4" />
                            <span className="truncate">Cài đặt</span>
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <LogOut className="mr-3 h-4 w-4" />
                            <span className="truncate">Đăng xuất</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-8 container">
                <div>
                    {/* Top bar */}
                    <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex items-center space-x-4 ml-auto">
                            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">JD</span>
                            </div>
                        </div>
                    </div>

                    {/* Page content */}
                    <main className="p-4 sm:p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}