import BaseService from './baseService';
import { Customer } from '../type/customer';

class CustomerService extends BaseService<Customer> {
    constructor() {
        super('https://localhost:5000/customer');
    }

    // override getOne
    async getOne(customerId: string): Promise<Customer> {
        const response = await fetch(`${this.baseUrl}/get?Customerid=${customerId}`);
        return this['handleResponse']<Customer>(response); // gọi protected method từ cha
    }

    // override delete để dùng Customerid
    async delete(customerId: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/delete?Customerid=${customerId}`, {
            method: 'DELETE',
        });
        await this['handleResponse']<void>(response);
    }
}

const customerService = new CustomerService();
export default customerService;
