import { Customer } from '@/types/customer';
import { Eye, Edit2, Trash2 } from 'lucide-react';

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
  return (
    <table className="w-full text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-2">Tên</th>
          <th className="text-center p-2">Email</th>
          <th className="text-center p-2">SĐT</th>
          <th className="text-center p-2">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {list.map(user => (
          <tr key={user.customerID} className="border-t hover:bg-gray-50">
            <td className="p-2">{user.name}</td>
            <td className="text-center">{user.email}</td>
            <td className="text-center">{user.phoneNumber}</td>
            <td className="text-center space-x-2">
              <button onClick={() => onView(user)}><Eye size={16} /></button>
              <button onClick={() => onEdit(user)}><Edit2 size={16} /></button>
              <button onClick={() => onDelete(user.customerID)}><Trash2 size={16} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
