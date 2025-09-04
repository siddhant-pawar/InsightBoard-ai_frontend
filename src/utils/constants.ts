export const PRIORITY_OPTIONS = [
  { value: 'high', label: 'High Priority', color: 'text-red-700', bgColor: 'bg-red-50', icon: '🔥' },
  { value: 'medium', label: 'Medium Priority', color: 'text-amber-700', bgColor: 'bg-amber-50', icon: '⚡' },
  { value: 'low', label: 'Low Priority', color: 'text-emerald-700', bgColor: 'bg-emerald-50', icon: '📋' }
] as const;

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  { value: 'completed', label: 'Completed', color: 'text-emerald-700', bgColor: 'bg-emerald-50' }
] as const;

export const SORT_OPTIONS = [
  { value: 'created_at-desc', label: 'Newest First' },
  { value: 'created_at-asc', label: 'Oldest First' },
  { value: 'priority-desc', label: 'High Priority First' },
  { value: 'priority-asc', label: 'Low Priority First' },
  { value: 'status-desc', label: 'Pending First' }
] as const;

export const API_ENDPOINTS = {
  TRANSCRIPTS: '/transcripts/',
  TASKS: '/tasks/',
  TASKS_FILTER: '/tasks/filter'
} as const;