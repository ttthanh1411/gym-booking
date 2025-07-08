import { Customer } from '@/types/customer';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CustomerFormModal({
  user,
  mode,
  onClose,
  onSubmit,
  loading
}: {
  user: Customer | null;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSubmit: (data: Partial<Customer>) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user && mode === 'edit') {
      setForm({
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        email: user.email,
        password: ''
      });
    }
  }, [user, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">{mode === 'add' ? 'Thêm người dùng' : 'Sửa thông tin'}</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Họ tên" className="w-full p-2 border rounded" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Số điện thoại" className="w-full p-2 border rounded" required />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" className="w-full p-2 border rounded" required />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Mật khẩu" type="password" className="w-full p-2 border rounded" required={mode === 'add'} />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
