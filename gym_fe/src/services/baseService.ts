// src/services/baseService.ts

export interface PagedResult<T> {
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
  items: T[];
}

export default class BaseService<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<R>(response: Response): Promise<R> {
    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
      throw new Error('Unsupported response type');
    }

    const data = (await response.json()) as R;

    if (!response.ok) {
      const errorData = data as unknown as { message?: string };
      const errorMessage = errorData.message || response.statusText || 'Request failed';
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return data;
  }

  // GET ALL
  async getAll(): Promise<T[]> {
    const response = await fetch(this.baseUrl);
    return this.handleResponse<T[]>(response);
  }

  // GET ONE
  async getOne(id: string | number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return this.handleResponse<T>(response);
  }

  // CREATE
  async create(data: Partial<T>): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  // UPDATE
  async update(id: string | number, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  // DELETE
  async delete(id: string | number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    await this.handleResponse<void>(response);
  }

  // ✅ GET PAGED with query params
  async getPaged(params: Record<string, string | number | undefined>): Promise<PagedResult<T>> {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });

    const url = `${this.baseUrl}/paged?${query.toString()}`;
    const response = await fetch(url);
    return this.handleResponse<PagedResult<T>>(response);
  }
}
