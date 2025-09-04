import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/types';
import { Plus, Send } from 'lucide-react';

interface QuickCreateTaskProps {
  onCreateTask: (task: Omit<Task, 'id'>) => void;
}

export function QuickCreateTask({ onCreateTask }: QuickCreateTaskProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsCreating(true);
    try {
      await onCreateTask({
        text: text.trim(),
        priority,
        tags: [],
        status: 'pending',
      });
      setText('');
      setPriority('medium');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Plus className="h-5 w-5 text-gray-600" />
          Quick Add Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-sm"
          />
          
          <div className="flex gap-2">
            <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">🔥 High Priority</SelectItem>
                <SelectItem value="medium">⚡ Medium Priority</SelectItem>
                <SelectItem value="low">📋 Low Priority</SelectItem>
              </SelectContent>
            </Select>
            
            <Button type="submit" disabled={!text.trim() || isCreating} size="default">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}