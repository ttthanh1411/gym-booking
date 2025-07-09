import { Customer } from '../../types/customer';
import { X, User, Mail, Phone, MapPin, Calendar, UserCheck, Activity } from 'lucide-react';

export default function CustomerViewModal({
  user,
  onClose
}: {
  user: Customer;
  onClose: () => void;
}) {
  const getStatusInfo = (status: number) => {
    return status === 1 ? {
      text: 'Đang hoạt động',
      color: 'text-green-600',
      bg: 'bg-green-100',
      icon: Activity
    } : {
      text: 'Ngừng hoạt động',
      color: 'text-red-600',
      bg: 'bg-red-100',
      icon: Activity
    };
  };

  const getTypeInfo = (type: number) => {
    return type === 1 ? {
      text: 'Người tập',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      icon: User
    } : {
      text: 'Personal Trainer',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      icon: UserCheck
    };
  };

  const statusInfo = getStatusInfo(user.status);
  const typeInfo = getTypeInfo(user.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-blue-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${statusInfo.bg} ${statusInfo.color}`}>
              <div className="flex items-center space-x-3">
                <statusInfo.icon className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium opacity-80">Trạng thái</p>
                  <p className="font-semibold">{statusInfo.text}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${typeInfo.bg} ${typeInfo.color}`}>
              <div className="flex items-center space-x-3">
                <typeInfo.icon className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium opacity-80">Loại người dùng</p>
                  <p className="font-semibold">{typeInfo.text}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
                  <p className="text-gray-900 font-medium">{user.phoneNumber}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
                  <p className="text-gray-900 font-medium">{user.address}</p>
                </div>
              </div>
              
              {user.createdAt && (
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ngày tạo</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}