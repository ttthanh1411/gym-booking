'use client';
import React, { useEffect, useState } from 'react';
import { Users, Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, X, User, Phone, MapPin, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import customerService from '../../../service/customerService';
import { Customer } from '../../../type/customer';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  visible: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add' | null>(null);
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState<{
    customerid: string;
    name: string;
    phonenumber: string;
    address: string;
    email: string;
    password?: string;
    type: number;
    status: number;
  }>({
    customerid: '',
    name: '',
    phonenumber: '',
    address: '',
    email: '',
    type: 0,
    password: '',
    status: 1,
  });
  const isReadonly = modalMode === 'view';
  const fetchUsers = async () => {
    try {
      const res = await customerService.getPaged({
        keyword: searchTerm,
        page: Number(currentPage) || 1,
        pageSize: Number(pageSize) || 5,
      });
      setUsers(res.items);
      setTotalPages(Math.ceil((res.meta.count || 0) / pageSize));
    } catch (err) {
      console.error('Lỗi khi fetch users:', err);
      showNotification('error', 'Không thể tải danh sách người dùng');
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [searchTerm, currentPage, pageSize]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (modalMode === 'edit' && selectedUser) {
        await customerService.update(selectedUser.customerid, formData);
        showNotification('success', 'Cập nhật người dùng thành công!');
      } else {
        await customerService.create(formData);
        showNotification('success', 'Thêm người dùng thành công!');
      }

      fetchUsers();
      setShowAddModal(false);
      setFormData({ customerid: '', name: '', phonenumber: '', address: '', email: '', password: '', type: 0, status: 0 });
      setSelectedUser(null);
      setModalMode(null);
      setIsLoading(false);
    } catch (err) {
      showNotification('error', 'Có lỗi xảy ra khi lưu dữ liệu');
      console.error('Submit error:', err);
      setIsLoading(false);
    }
  };

  const getTypeLabel = (type: number) => {
    switch (type) {
      case 1: return 'Người Tập';
      case 0: return 'PT';
    }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1: return 'Còn Hoạt Động';
      case 0: return 'Ngưng Hoạt Động';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await customerService.delete(id);
      fetchUsers();
      showNotification('success', 'Xóa người dùng thành công!');
    } catch (err) {
      showNotification('error', 'Có lỗi xảy ra khi xóa người dùng');
      console.error('Delete failed:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      customerid: '',
      name: '',
      phonenumber: '',
      address: '',
      email: '',
      password: '',
      type: 1,
      status: 1,
    });
  };

  const getTypeColor = (type: number) => {
    switch (type) {
      case 1: return 'bg-green-100 text-center text-green-800';
      case 0: return 'bg-red-100 text-center text-red-800';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1: return 'bg-green-100 text-center text-green-800';
      case 0: return 'bg-red-100 text-center text-red-800';
    }
  };

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    const id = Date.now().toString();
    const notification: ToastNotification = { id, type, message, visible: true };

    setNotifications(prev => [...prev, notification]);

    // Auto hide after 4 seconds
    setTimeout(() => {
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, visible: false } : n)
      );

      // Remove from array after animation
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 300);
    }, 4000);
  };


  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`transform transition-all duration-300 ease-in-out ${notification.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
          >
            <div className={`flex items-center p-4 rounded-lg shadow-lg min-w-80 ${notification.type === 'success'
              ? 'bg-green-50 border-l-4 border-green-400'
              : notification.type === 'error'
                ? 'bg-red-50 border-l-4 border-red-400'
                : 'bg-yellow-50 border-l-4 border-yellow-400'
              }`}>
              {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-400 mr-3" />}
              {notification.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400 mr-3" />}
              {notification.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />}
              <span className={`text-sm font-medium ${notification.type === 'success'
                ? 'text-green-800'
                : notification.type === 'error'
                  ? 'text-red-800'
                  : 'text-yellow-800'
                }`}>
                {notification.message}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          </div>
          <button
            onClick={() => [setShowAddModal(true), setModalMode('add')]}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Thêm người dùng</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-800 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm người dùng"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="1">Người tập</option>
                <option value="inactive">PT</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-black px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="text-black px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên người dùng
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Không tìm thấy người dùng nào
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.customerid} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">ID: {user.customerid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(user.type)}`}>
                          {getTypeLabel(user.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        {user.phonenumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {getStatusLabel(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={async () => {
                              try {
                                const userDetail = await customerService.getOne(user.customerid);
                                setSelectedUser(userDetail);
                                setShowViewModal(true);
                                debugger
                              } catch (err) {
                                showNotification('error', 'Không thể tải thông tin người dùng');
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1 hover:bg-blue-50 rounded"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => {
                            setSelectedUser(user);
                            setFormData({
                              customerid: user.customerid,
                              name: user.name,
                              phonenumber: user.phonenumber,
                              address: user.address,
                              email: user.email,
                              password: user.password,
                              type: user.type,
                              status: user.status
                            });
                            setModalMode('edit');
                            setShowAddModal(true);
                          }}
                            className="text-green-600 hover:text-green-900 transition-colors p-1 hover:bg-green-50 rounded">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.customerid)}
                            className="text-red-600 hover:text-red-900 transition-colors p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-50 rounded">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <div className="text-sm text-gray-700">
                Trang <span className="font-medium">{Number(currentPage) || 1}</span> / <span className="font-medium">{Number(totalPages) || 1}</span>
              </div>
            </div>
            <div className="text-black flex items-center space-x-2">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="ml-4 px-3 py-1 border rounded-md"
              >
                <option value="5">5 / trang</option>
                <option value="10">10 / trang</option>
                <option value="20">20 / trang</option>
              </select>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-black px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Quay lại
              </button>
              {/* Smart Pagination Buttons */}
              {(() => {
                const pageButtons = [];
                const maxButtons = 5;
                let start = Math.max(1, currentPage - 2);
                let end = Math.min(totalPages, currentPage + 2);

                if (currentPage <= 3) {
                  end = Math.min(totalPages, maxButtons);
                } else if (currentPage >= totalPages - 2) {
                  start = Math.max(1, totalPages - maxButtons + 1);
                }

                if (start > 1) {
                  pageButtons.push(
                    <button
                      key={1}
                      onClick={() => setCurrentPage(1)}
                      className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
                    >1</button>
                  );
                  if (start > 2) pageButtons.push(<span key="start-ellipsis" className="px-2">...</span>);
                }

                for (let i = start; i <= end; i++) {
                  pageButtons.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`px-3 py-1 rounded-md ${i === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
                    >{i}</button>
                  );
                }

                if (end < totalPages) {
                  if (end < totalPages - 1) pageButtons.push(<span key="end-ellipsis" className="px-2">...</span>);
                  pageButtons.push(
                    <button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
                    >{totalPages}</button>
                  );
                }

                return pageButtons;
              })()}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Tiếp theo
              </button>
            </div>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {modalMode === 'view' ? 'Xem thông tin người dùng' : modalMode === 'edit' ? 'Sửa người dùng' : 'Thêm người dùng'}
                  </h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-white hover:bg-opacity-50 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-8 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                        Họ và Tên
                      </label>
                      <div className="relative">
                        <User className="h-5 w-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="text-black w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter full name"
                        />
                      </div>
                    </div>

                    {/* Phone Number Field */}
                    <div>
                      <label htmlFor="phonenumber" className="block text-sm font-semibold text-gray-700 mb-3">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <Phone className="h-5 w-5 text-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="tel"
                          id="phonenumber"
                          name="phonenumber"
                          value={formData.phonenumber}
                          onChange={handleInputChange}
                          required
                          className="text-black  w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    {/* Address Field */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-3">
                        Địa chỉ
                      </label>
                      <div className="relative">
                        <MapPin className="h-5 w-5 text-red-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="text-black  w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="h-5 w-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="text-black w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                        Password
                      </label>
                      <div className="relative text-gray-500">
                        <Lock className="h-5 w-5 text-orange-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className=" text-black w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter password"
                        />
                      </div>
                    </div>
                    {/* Status Selection Field */}
                    <div>
                      <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3">
                        Trạng thái hoạt động
                      </label>
                      <div className="relative">
                        <User className="h-5 w-5 text-indigo-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              status: Number(e.target.value),
                            }))
                          }
                          disabled={isReadonly}
                          className="w-full text-black pl-10 pr-4 py-3 border border-gray-200 rounded-lg
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all
                                    duration-200 bg-gray-50 focus:bg-white appearance-none"
                        >
                          <option value={1}>Còn Hoạt Động</option>
                          <option value={0}>Ngưng Hoạt Động</option>
                        </select>
                      </div>
                    </div>

                    {/* Role Selection Field */}
                    <div>
                      <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-3">
                        Type
                      </label>
                      <div className="relative">
                        <User className="h-5 w-5 text-indigo-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              type: Number(e.target.value),
                            }))
                          }
                          disabled={isReadonly}
                          className="w-full text-black pl-10 pr-4 py-3 border border-gray-200 rounded-lg
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all
                                    duration-200 bg-gray-50 focus:bg-white appearance-none"
                        >
                          <option value={1}>Người Tập</option>
                          <option value={0}>PT</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-4 pt-8 mt-8 border-t border-gray-100 bg-gray-50 -mx-8 px-8 py-6 rounded-b-2xl">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white hover:border-gray-400 transition-all duration-200 font-medium"
                  >
                    Hủy
                  </button>
                  {modalMode !== 'view' && (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                    >
                      {isLoading ? 'Đang lưu...' : modalMode === 'edit' ? 'Lưu thay đổi' : 'Thêm người dùng'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {showViewModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Thông tin người dùng</h2>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 hover:bg-white hover:bg-opacity-50 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Họ tên</label>
                    <p className="mt-1 text-gray-900">{selectedUser.data.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                    <p className="mt-1 text-gray-900">{selectedUser.data.phonenumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{selectedUser.data.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Địa chỉ</label>
                    <p className="mt-1 text-gray-900">{selectedUser.data.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Loại người dùng</label>
                    <p className={`mt-1 text-sm font-semibold ${getStatusColor(selectedUser.data.status)}`}>
                      {getStatusLabel(selectedUser.data.status)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Loại người dùng</label>
                    <p className={`mt-1 text-sm font-semibold ${getTypeColor(selectedUser.data.type)}`}>
                      {getTypeLabel(selectedUser.data.type)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default UserManagement;