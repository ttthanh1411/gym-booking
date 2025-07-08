'use client';
import { useCustomer } from '@/hooks/useCustomer';
import CustomerTable from '@/components/customer/CustomerTable';
import CustomerFormModal from '@/components/customer/CustomerFormModal';
import CustomerViewModal from '@/components/customer/CustomerViewModal';

export default function CustomerPage() {
  const {
    customers, selected, setSelected, mode, setMode,
    create, update, remove, loading
  } = useCustomer();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Quản lý người dùng</h1>
        <button
          onClick={() => { setMode('add'); setSelected(null); }}
          className="btn btn-primary"
        >
          + Thêm
        </button>
      </div>

      <CustomerTable
        list={customers}
        onView={(u) => { setSelected(u); setMode('view'); }}
        onEdit={(u) => { setSelected(u); setMode('edit'); }}
        onDelete={(id) => remove(id)}
      />

      {mode === 'add' || mode === 'edit' ? (
        <CustomerFormModal
          mode={mode}
          user={selected}
          onClose={() => setMode(null)}
          onSubmit={(data) => {
            if (mode === 'add') create(data);
            else if (mode === 'edit' && selected) update(selected.customerID, data);
          }}
          loading={loading}
        />
      ) : null}

      {mode === 'view' && selected && (
        <CustomerViewModal user={selected} onClose={() => setMode(null)} />
      )}
    </div>
  );
}
