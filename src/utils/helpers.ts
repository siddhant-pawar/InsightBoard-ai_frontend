import { Task } from '@/types';

export function generateTaskId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  } catch {
    return 'Unknown';
  }
}

export function getPriorityWeight(priority: Task['priority']): number {
  switch (priority) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
}

export function sortTasks(tasks: Task[], sortBy: string = 'created_at', order: string = 'desc'): Task[] {
  return [...tasks].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Task];
    let bValue: any = b[sortBy as keyof Task];

    if (sortBy === 'priority') {
      aValue = getPriorityWeight(a.priority);
      bValue = getPriorityWeight(b.priority);
    }

    if (sortBy === 'created_at') {
      aValue = new Date(a.created_at || 0).getTime();
      bValue = new Date(b.created_at || 0).getTime();
    }

    const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return order === 'asc' ? comparison : -comparison;
  });
}

export function extractUniqueTagsFromTasks(tasks: Task[]): string[] {
  const allTags = tasks.flatMap(task => task.tags);
  return Array.from(new Set(allTags)).sort();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}