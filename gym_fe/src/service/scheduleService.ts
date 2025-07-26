import { Schedule } from './../type/schedule';
import BaseService from './baseService';


class ScheduleService extends BaseService<Schedule> {
    constructor() {
        super('https://localhost:5000/schedule');
    }

    // override getOne
    async getOne(scheduleId: string): Promise<Schedule> {
        const response = await fetch(`${this.baseUrl}/get?Customerid=${scheduleId}`);
        return this['handleResponse']<Schedule>(response); // gọi protected method từ cha
    }

    // override delete để dùng Customerid
    async delete(scheduleId: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/delete?Customerid=${scheduleId}`, {
            method: 'DELETE',
        });
        await this['handleResponse']<void>(response);
    }
}

const scheduleService = new ScheduleService();

export default scheduleService;