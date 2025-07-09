import { useCustomer } from '../../hooks/useCustomer';
import CustomerTable from './CustomerTable';
import CustomerFormModal from './CustomerFormModal';
import CustomerViewModal from './CustomerViewModal';
import { Plus, Search, Users, Filter } from 'lucide-react';

export default function CustomerPage() {
  const {
    customers,
    selected,
    setSelected,
    mode,
    setMode,
    create,
    update,
    remove,
    loading,
    searchTerm,
    setSearchTerm
  } = useCustomer();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                <p className="text-gray-500">Quản lý thông tin người dùng và thành viên</p>
              </div>
            </div>
            <button
              onClick={() => {
                setMode('add');
                setSelected(null);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Thêm người dùng</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng người dùng</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">
                  {customers.filter(c => c.status === 1).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Personal Trainer</p>
                <p className="text-2xl font-bold text-purple-600">
                  {customers.filter(c => c.type === 2).length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                <Filter className="w-4 h-4" />
                <span>Lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <CustomerTable
          list={customers}
          onView={(u) => {
            setSelected(u);
            setMode('view');
          }}
          onEdit={(u) => {
            setSelected(u);
            setMode('edit');
          }}
          onDelete={(id) => remove(id)}
        />

        {/* Modals */}
        {(mode === 'add' || mode === 'edit') && (
          <CustomerFormModal
            mode={mode}
            user={selected}
            onClose={() => setMode(null)}
            onSubmit={(data) => {
              if (mode === 'add') {
                create(data);
              } else if (mode === 'edit' && selected) {
                update(selected.customerID, data);
              }
            }}
            loading={loading}
          />
        )}

        {mode === 'view' && selected && (
          <CustomerViewModal
            user={selected}
            onClose={() => setMode(null)}
          />
        )}
      </div>
    </div>
  );
}