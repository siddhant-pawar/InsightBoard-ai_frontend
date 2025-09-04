import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilter, TaskStats } from '@/types';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TaskFilter>({});
  const { toast } = useToast();

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = Object.keys(filters).length > 0
        ? await apiService.filterTasks(filters)
        : await apiService.getAllTasks();

      if (response.data) {
        setTasks(response.data);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to load tasks",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [filters, toast]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const response = await apiService.createTasks([taskData]);
      if (response.data) {
        setTasks(prev => [...response.data!, ...prev]);
        toast({
          title: "Success",
          description: "Task created successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to create task",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    // Optimistic update
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));

    try {
      const response = await apiService.updateTask(taskId, updates);
      if (response.error) {
        // Revert on error
        loadTasks();
        toast({
          title: "Error",
          description: response.error || "Failed to update task",
          variant: "destructive",
        });
      }
    } catch (error) {
      loadTasks();
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    // Optimistic update
    setTasks(prev => prev.filter(task => task.id !== taskId));

    try {
      const response = await apiService.deleteTask(taskId);
      if (response.error) {
        // Revert on error
        loadTasks();
        toast({
          title: "Error",
          description: response.error || "Failed to delete task",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      }
    } catch (error) {
      loadTasks();
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const processTranscript = async (transcript: string) => {
    setLoading(true);
    try {
      const response = await apiService.processTranscript(transcript);
      if (response.data) {
        setTasks(prev => [...response.data!, ...prev]);
        toast({
          title: "Success",
          description: `Generated ${response.data.length} tasks from transcript`,
        });
        return response.data;
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to process transcript",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process transcript",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    high_priority: tasks.filter(t => t.priority === 'high').length,
    medium_priority: tasks.filter(t => t.priority === 'medium').length,
    low_priority: tasks.filter(t => t.priority === 'low').length,
  };

  return {
    tasks,
    loading,
    filters,
    stats,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    processTranscript,
    refreshTasks: loadTasks,
  };
}