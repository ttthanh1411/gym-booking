import { Service } from '../type/service';
import BaseService from './baseService';

class ServiceService extends BaseService<Service> {
    constructor() {
        super('https://localhost:5000/service');
    }

    // override getOne
    async getOne(customerId: string): Promise<Service> {
        const response = await fetch(`${this.baseUrl}/get?Serivceid=${customerId}`);
        return this['handleResponse']<Service>(response); // gọi protected method từ cha
    }

    // override delete để dùng Customerid
    async delete(serviceId: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/delete?Serviceid=${serviceId}`, {
            method: 'DELETE',
        });
        await this['handleResponse']<void>(response);
    }
}

const serviceService = new ServiceService();
export default serviceService;