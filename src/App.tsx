import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { Charts } from '@/components/dashboard/Charts';
import { TranscriptProcessor } from '@/components/transcript/TranscriptProcessor';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskList } from '@/components/tasks/TaskList';
import { QuickCreateTask } from '@/components/tasks/QuickCreateTask';
import { Toaster } from '@/components/ui/sonner';
import { useTasks } from '@/hooks/useTasks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Brain, ListTodo, PlusCircle } from 'lucide-react';

function App() {
  const {
    tasks,
    loading,
    filters,
    stats,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    processTranscript,
  } = useTasks();

  const handleProcessTranscript = async (transcript: string) => {
    await processTranscript(transcript);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Dashboard Overview */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Monitor your productivity and task progress</p>
            </div>
            <StatsCards stats={stats} />
          </section>

          {/* Charts Section */}
          <section>
            <Charts stats={stats} />
          </section>

          {/* Main Content Tabs */}
          <section>
            <Tabs defaultValue="tasks" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <ListTodo className="h-4 w-4" />
                  <span className="hidden sm:inline">Task Management</span>
                  <span className="sm:hidden">Tasks</span>
                </TabsTrigger>
                <TabsTrigger value="transcript" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Processor</span>
                  <span className="sm:hidden">AI</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                  <span className="sm:hidden">Charts</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tasks" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <TaskFilters filters={filters} onFiltersChange={setFilters} />
                    <TaskList 
                      tasks={tasks}
                      loading={loading}
                      onUpdateTask={updateTask}
                      onDeleteTask={deleteTask}
                    />
                  </div>
                  <div>
                    <QuickCreateTask onCreateTask={createTask} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="transcript" className="space-y-6">
                <TranscriptProcessor 
                  onProcessTranscript={handleProcessTranscript}
                  loading={loading}
                />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Analytics</h3>
                  <p className="text-gray-600">Detailed insights into your productivity patterns</p>
                </div>
                <Charts stats={stats} />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      <Toaster />
    </div>
  );
}

export default App;