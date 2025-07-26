export interface Service {
  serviceid: string;
  servicename: string;
  coursedescription: string;
  serviceprice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceFormData {
  serviceid: string;
  servicename: string;
  coursedescription: string;
  serviceprice: number;
}

export interface ServiceFilters {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export interface ServiceResponse {
  items: Service[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}