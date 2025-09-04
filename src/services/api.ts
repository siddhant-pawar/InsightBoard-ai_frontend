import { Task, TaskFilter, ApiResponse } from '@/types';

const BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }

  async processTranscript(transcript: string): Promise<ApiResponse<Task[]>> {
    return this.request<Task[]>('/transcripts/', {
      method: 'POST',
      body: JSON.stringify({ transcript }),
    });
  }

  async createTasks(tasks: Omit<Task, 'id'>[]): Promise<ApiResponse<Task[]>> {
    return this.request<Task[]>('/tasks/', {
      method: 'POST',
      body: JSON.stringify(tasks),
    });
  }

  async getAllTasks(): Promise<ApiResponse<Task[]>> {
    return this.request<Task[]>('/tasks/');
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(taskId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async filterTasks(filters: TaskFilter): Promise<ApiResponse<Task[]>> {
    return this.request<Task[]>('/tasks/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    });
  }
}

export const apiService = new ApiService();