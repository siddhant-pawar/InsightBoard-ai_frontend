export interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  status: 'pending' | 'completed';
  source_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TaskFilter {
  status?: 'pending' | 'completed';
  priority?: 'high' | 'medium' | 'low';
  keyword?: string;
  tags?: string[];
  sort_by?: 'created_at' | 'priority' | 'status';
  order?: 'asc' | 'desc';
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  high_priority: number;
  medium_priority: number;
  low_priority: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}