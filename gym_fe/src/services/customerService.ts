import BaseService from './baseService';
import { Customer } from '../types/customer';

const customerService = new BaseService<Customer>('https://localhost:7287/api/customer'); // Thay URL bằng API thật

export default customerService;
