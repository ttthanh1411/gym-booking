export interface Customer {
  data: {
    customerid: string;
    name: string;
    email: string;
    phonenumber: string;
    password: string;
    address: string;
    type: number; // 1: Người tập, 0: PT
    status: number; // 1: Active, 0: Inactive
    createdAt?: string;
    updatedAt?: string;
  }
  customerid: string;
  name: string;
  email: string;
  phonenumber: string;
  password: string;
  address: string;
  type: number; // 1: Người tập, 0: PT
  status: number; // 1: Active, 0: Inactive
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phonenumber: string;
  address: string;
  password?: string;
  type?: number;
  status?: number;
}
