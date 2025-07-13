import { Service, ServiceFormData, ServiceFilters, ServiceResponse } from '../types/service';

// Mock data for demonstration
const mockServices: Service[] = [
  {
    serviceID: '1',
    serviceName: 'Personal Training',
    courseDescription: 'One-on-one personalized training sessions with professional trainers to help you achieve your fitness goals.',
    servicePrice: 150000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    serviceID: '2',
    serviceName: 'Group Fitness Classes',
    courseDescription: 'High-energy group fitness classes including Zumba, Pilates, Yoga, and HIIT workouts.',
    servicePrice: 80000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    serviceID: '3',
    serviceName: 'Nutrition Consultation',
    courseDescription: 'Professional nutrition advice and meal planning to complement your fitness journey.',
    servicePrice: 200000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    serviceID: '4',
    serviceName: 'Strength Training',
    courseDescription: 'Build muscle and increase strength with our comprehensive strength training programs.',
    servicePrice: 120000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    serviceID: '5',
    serviceName: 'Cardio Programs',
    courseDescription: 'Improve cardiovascular health with our tailored cardio workout programs.',
    servicePrice: 100000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const services = [...mockServices];

const serviceService = {
  // Get paginated services with filters
  async getPaged(filters: ServiceFilters): Promise<ServiceResponse> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    let filteredServices = [...services];
    
    // Apply keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredServices = filteredServices.filter(service => 
        service.serviceName.toLowerCase().includes(keyword) ||
        service.courseDescription.toLowerCase().includes(keyword)
      );
    }
    
    // Apply price filters
    if (filters.minPrice !== undefined) {
      filteredServices = filteredServices.filter(service => service.servicePrice >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      filteredServices = filteredServices.filter(service => service.servicePrice <= filters.maxPrice!);
    }
    
    // Sort by name
    filteredServices.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
    
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const totalItems = filteredServices.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = filteredServices.slice(startIndex, endIndex);
    
    return {
      items,
      totalPages,
      totalItems,
      currentPage: page,
    };
  },

  // Get single service by ID
  async getById(id: string): Promise<Service | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return services.find(service => service.serviceID === id) || null;
  },

  // Create new service
  async create(data: ServiceFormData): Promise<Service> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newService: Service = {
      serviceID: Date.now().toString(),
      serviceName: data.serviceName,
      courseDescription: data.courseDescription,
      servicePrice: data.servicePrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    services.push(newService);
    return newService;
  },

  // Update existing service
  async update(id: string, data: Partial<ServiceFormData>): Promise<Service> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = services.findIndex(service => service.serviceID === id);
    if (index === -1) {
      throw new Error('Service not found');
    }
    
    services[index] = {
      ...services[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return services[index];
  },

  // Delete service
  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = services.findIndex(service => service.serviceID === id);
    if (index === -1) {
      throw new Error('Service not found');
    }
    
    services.splice(index, 1);
  },

  // Get all services (for dropdowns, etc.)
  async getAll(): Promise<Service[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...services];
  },
};

export default serviceService;