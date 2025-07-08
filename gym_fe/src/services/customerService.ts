import BaseService from './baseService';
import { Customer } from '../types/customer';

const customerService = new BaseService<Customer>('https://localhost:5000/api/customer');

export default customerService;
