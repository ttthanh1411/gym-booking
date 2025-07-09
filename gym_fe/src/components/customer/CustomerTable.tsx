import { Customer } from '../../types/customer';
import { Eye, Edit2, Trash2, User, Phone, Mail } from 'lucide-react';

export default function CustomerTable({
  list,
  onEdit,
  onDelete,
  onView
}: {
  list: Customer[];
  onEdit: (user: Customer) => void;
  onDelete: (id: string) => void;
  onView: (user: Customer) => void;
}) {
  const getStatusBadge = (status: number) => {
    return status === 1 ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Hoạt động
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Ngừng hoạt động
      </span>
    );
  };

  const getTypeBadge = (type: number) => {
    return type === 1 ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Người tập
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        Personal Trainer
      </span>
    );
  };

  if (list.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có người dùng nào</h3>
        <p className="text-gray-500">Hãy thêm người dùng đầu tiên để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Thông tin cá nhân</span>
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Liên hệ</span>
                </div>
              </th>
              <th className="text-center p-4 font-semibold text-gray-700">Loại</th>
              <th className="text-center p-4 font-semibold text-gray-700">Trạng thái</th>
              <th className="text-center p-4 font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {list.map((user) => (
              <tr 
                key={user.customerID} 
                className="hover:bg-gray-50 transition-colors duration-150 group"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">{user.phoneNumber}</div>
                  <div className="text-sm text-gray-500 max-w-xs truncate">{user.address}</div>
                </td>
                <td className="p-4 text-center">
                  {getTypeBadge(user.type)}
                </td>
                <td className="p-4 text-center">
                  {getStatusBadge(user.status)}
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onView(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 tooltip"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 tooltip"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(user.customerID)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 tooltip"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}