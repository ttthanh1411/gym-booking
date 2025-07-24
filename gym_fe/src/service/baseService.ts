// src/services/baseService.ts

export interface PagedResult<T> {
  items: T[];
  meta: {
    page: number;
    size: number;
    count: number;
    countable?: number | null;
    hasNextPage?: boolean | null;
  };
}

export default class BaseService<T> {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // src/services/baseService.ts
  private async handleResponse<R>(response: Response): Promise<R> {
    if (response.status === 204 || response.status === 205) {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText || 'Request failed'}`);
      }
      return undefined as unknown as R;
    }

    const contentType = response.headers.get('content-type') || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedData: any = null;

    if (contentType.includes('application/json')) {
      parsedData = await response.json();
    } else {
      parsedData = await response.text();   // có thể rỗng
    }

    if (!response.ok) {
      const message =
        (parsedData && typeof parsedData === 'object' && parsedData.message) ||
        parsedData || // chuỗi text
        response.statusText ||
        'Request failed';
      throw new Error(`Error ${response.status}: ${message}`);
    }

    return parsedData as R;
  }

  // GET ALL
  async getAll(): Promise<T[]> {
    const response = await fetch(this.baseUrl);
    return this.handleResponse<T[]>(response);
  }

  // GET ONE
  async getOne(id: string | number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/get?id=${id}`);
    return this.handleResponse<T>(response);
  }

  // CREATE
  async create(data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  // UPDATE
  async update(id: string | number, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/edit?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  // DELETE
  async delete(id: string | number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/delete?id=${id}`, {
      method: 'DELETE',
    });
    await this.handleResponse<void>(response);
  }

  // GET Paged
  async getPaged(params: Record<string, string | number | undefined>): Promise<PagedResult<T>> {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });

    const url = `${this.baseUrl}/get-paging?${query.toString()}`;
    const response = await fetch(url);
    return this.handleResponse<PagedResult<T>>(response);
  }
}
