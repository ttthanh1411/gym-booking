import { Service } from '../types/service';
import BaseService from './baseService';

const serviceService = new BaseService<Service>('https://localhost:5000/api/service');

export default serviceService;