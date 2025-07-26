import { Service } from '../type/service';
import BaseService from './baseService';

class ServiceService extends BaseService<Service> {
    constructor() {
        super('https://localhost:5000/service');
    }

    async getOne(serviceId: string): Promise<Service> {
        const response = await fetch(`${this.baseUrl}/get?Serivceid=${serviceId}`);
        return this['handleResponse']<Service>(response); // gọi protected method từ cha
    }

    async delete(serviceId: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/delete?Serviceid=${serviceId}`, {
            method: 'DELETE',
        });
        await this['handleResponse']<void>(response);
    }
}

const serviceService = new ServiceService();
export default serviceService;