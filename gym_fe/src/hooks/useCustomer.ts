import { useState, useEffect } from 'react';
import { Customer, CustomerFormData } from '../types/customer';

export function useCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [mode, setMode] = useState<'add' | 'edit' | 'view' | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        customerID: '1',
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@gmail.com',
        phoneNumber: '0123456789',
        address: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        type: 1,
        status: 1,
        createdAt: '2024-01-15'
      },
      {
        customerID: '2',
        name: 'Trần Thị Bình',
        email: 'tranthibinh@gmail.com',
        phoneNumber: '0987654321',
        address: '456 Lê Lợi, Quận 1, TP.HCM',
        type: 2,
        status: 1,
        createdAt: '2024-01-20'
      },
      {
        customerID: '3',
        name: 'Lê Minh Cường',
        email: 'leminhcuong@gmail.com',
        phoneNumber: '0369852147',
        address: '789 Trần Hưng Đạo, Hải Châu, Đà Nẵng',
        type: 1,
        status: 0,
        createdAt: '2024-01-25'
      }
    ];
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phoneNumber.includes(searchTerm)
  );

  const create = async (data: CustomerFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCustomer: Customer = {
        customerID: Date.now().toString(),
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        type: data.type || 1,
        status: data.status || 1,
        createdAt: new Date().toISOString()
      };
      
      setCustomers(prev => [...prev, newCustomer]);
      setMode(null);
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: CustomerFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomers(prev => prev.map(customer => 
        customer.customerID === id 
          ? { ...customer, ...data, updatedAt: new Date().toISOString() }
          : customer
      ));
      setMode(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setCustomers(prev => prev.filter(customer => customer.customerID !== id));
      } catch (error) {
        console.error('Error deleting customer:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    customers: filteredCustomers,
    selected,
    setSelected,
    mode,
    setMode,
    loading,
    searchTerm,
    setSearchTerm,
    create,
    update,
    remove
  };
}