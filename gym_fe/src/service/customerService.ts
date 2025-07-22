import BaseService from './baseService';
import { Customer } from '../type/customer';

const customerService = new BaseService<Customer>('http://localhost:5000/api/customer');

export default customerService;
