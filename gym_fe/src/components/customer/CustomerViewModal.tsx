import { Customer } from '@/types/customer';
import { X } from 'lucide-react';

export default function CustomerViewModal({
  user,
  onClose
}: {
  user: Customer;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
      <div className="bg-white w-full max-w-xl rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-lg font-bold text-gray-800">Thông tin người dùng</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold">Họ tên</label>
              <p className="mt-1">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-semibold">Số điện thoại</label>
              <p className="mt-1">{user.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-semibold">Địa chỉ</label>
              <p className="mt-1">{user.address}</p>
            </div>
            <div>
              <label className="text-sm font-semibold">Loại người dùng</label>
              <p className="mt-1">
                {user.type === 1 ? 'Người tập' : user.type === 2 ? 'PT' : 'Khác'}
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold">Trạng thái</label>
              <p className="mt-1">
                {user.status === 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
