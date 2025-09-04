import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Task } from '@/types';
import { MoreHorizontal, Edit3, Trash2, Flag, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-amber-100 text-amber-800 border-amber-200',
  low: 'bg-emerald-100 text-emerald-800 border-emerald-200'
};

const priorityIcons = {
  high: '🔥',
  medium: '⚡',
  low: '📋'
};

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleStatusChange = (checked: boolean) => {
    onUpdate(task.id, { status: checked ? 'completed' : 'pending' });
  };

  const handlePriorityChange = (priority: 'high' | 'medium' | 'low') => {
    onUpdate(task.id, { priority });
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg border",
      task.status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-300'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={handleStatusChange}
            className="mt-1 h-5 w-5"
          />
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyPress}
                className="mb-2"
                autoFocus
              />
            ) : (
              <p 
                className={cn(
                  "text-sm leading-relaxed cursor-pointer group",
                  task.status === 'completed' 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-900 hover:text-blue-600'
                )}
                onClick={() => setIsEditing(true)}
              >
                {task.text}
                <Edit3 className="inline ml-2 h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </p>
            )}
            
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline" className={priorityColors[task.priority]}>
                <Flag className="h-3 w-3 mr-1" />
                {priorityIcons[task.priority]} {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              
              {task.created_at && (
                <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                  <Calendar className="h-3 w-3" />
                  {formatDate(task.created_at)}
                </div>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handlePriorityChange('high')}
                disabled={task.priority === 'high'}
              >
                <Flag className="mr-2 h-4 w-4 text-red-500" />
                High Priority
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handlePriorityChange('medium')}
                disabled={task.priority === 'medium'}
              >
                <Flag className="mr-2 h-4 w-4 text-amber-500" />
                Medium Priority
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handlePriorityChange('low')}
                disabled={task.priority === 'low'}
              >
                <Flag className="mr-2 h-4 w-4 text-emerald-500" />
                Low Priority
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}