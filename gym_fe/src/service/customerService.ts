import BaseService from './baseService';
import { Customer } from '../type/customer';

const customerService = new BaseService<Customer>('https://localhost:5000/customer');

export default customerService;
