// src/services/baseService.ts

export default class BaseService<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Lấy toàn bộ
  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch all');
    return response.json();
  }

  // Lấy 1 theo ID
  async getOne(id: string | number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch one');
    return response.json();
  }

  // Thêm mới
  async create(data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create');
    return response.json();
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update');
    return response.json();
  }

  async delete(id: string | number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete');
  }
}
