// ✅ useCustomer.ts (hooks/useCustomer.ts)
import { useEffect, useState } from 'react';
import { Customer } from '@/types/customer';
import customerService from '@/services/customerService';

export function useCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [mode, setMode] = useState<'add' | 'edit' | 'view' | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    const data = await customerService.getAll();
    setCustomers(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const create = async (data: Partial<Customer>) => {
    setLoading(true);
    await customerService.create(data);
    await fetch();
    setLoading(false);
  };

  const update = async (id: string, data: Partial<Customer>) => {
    setLoading(true);
    await customerService.update(id, data);
    await fetch();
    setLoading(false);
  };

  const remove = async (id: string) => {
    await customerService.delete(id);
    await fetch();
  };

  return {
    customers,
    selected,
    setSelected,
    mode,
    setMode,
    create,
    update,
    remove,
    loading,
  };
}
