import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, CheckCircle, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface State {
  id: string;
  name: string;
  status: 'locked' | 'active' | 'complete';
  xp: number;
  type: 'lesson' | 'quiz' | 'project';
}

const territoryData: Record<string, { name: string; states: State[] }> = {
  'python': {
    name: 'Python Fundamentals',
    states: [
      { id: '1', name: 'Variables & Types', status: 'complete', xp: 100, type: 'lesson' },
      { id: '2', name: 'Control Flow', status: 'complete', xp: 150, type: 'lesson' },
      { id: '3', name: 'Functions', status: 'complete', xp: 200, type: 'lesson' },
      { id: '4', name: 'Quiz: Basics', status: 'complete', xp: 300, type: 'quiz' },
      { id: '5', name: 'Lists & Dicts', status: 'complete', xp: 200, type: 'lesson' },
      { id: '6', name: 'File I/O', status: 'complete', xp: 200, type: 'lesson' },
      { id: '7', name: 'OOP Intro', status: 'complete', xp: 250, type: 'lesson' },
      { id: '8', name: 'Final Project', status: 'complete', xp: 500, type: 'project' },
    ],
  },
  'data-structures': {
    name: 'Data Structures',
    states: [
      { id: '1', name: 'Arrays & Strings', status: 'complete', xp: 150, type: 'lesson' },
      { id: '2', name: 'Linked Lists', status: 'complete', xp: 200, type: 'lesson' },
      { id: '3', name: 'Stacks & Queues', status: 'complete', xp: 200, type: 'lesson' },
      { id: '4', name: 'Quiz: Linear DS', status: 'complete', xp: 300, type: 'quiz' },
      { id: '5', name: 'Trees', status: 'complete', xp: 250, type: 'lesson' },
      { id: '6', name: 'Binary Search Trees', status: 'complete', xp: 250, type: 'lesson' },
      { id: '7', name: 'Graphs', status: 'active', xp: 300, type: 'lesson' },
      { id: '8', name: 'Hash Tables', status: 'locked', xp: 250, type: 'lesson' },
      { id: '9', name: 'Quiz: Advanced DS', status: 'locked', xp: 400, type: 'quiz' },
      { id: '10', name: 'Final Challenge', status: 'locked', xp: 600, type: 'project' },
    ],
  },
  'ai-foundations': {
    name: 'AI Foundations',
    states: [
      { id: '1', name: 'What is AI?', status: 'complete', xp: 100, type: 'lesson' },
      { id: '2', name: 'History of AI', status: 'complete', xp: 100, type: 'lesson' },
      { id: '3', name: 'Search Algorithms', status: 'complete', xp: 200, type: 'lesson' },
      { id: '4', name: 'Knowledge Representation', status: 'active', xp: 200, type: 'lesson' },
      { id: '5', name: 'Probabilistic Reasoning', status: 'locked', xp: 250, type: 'lesson' },
      { id: '6', name: 'Quiz: AI Basics', status: 'locked', xp: 300, type: 'quiz' },
    ],
  },
  'machine-learning': {
    name: 'Machine Learning',
    states: [
      { id: '1', name: 'Introduction to ML', status: 'active', xp: 150, type: 'lesson' },
      { id: '2', name: 'Linear Regression', status: 'locked', xp: 200, type: 'lesson' },
      { id: '3', name: 'Classification', status: 'locked', xp: 250, type: 'lesson' },
    ],
  },
};

const typeIcons = { lesson: '📖', quiz: '❓', project: '🏗️' };

export default function TerritoryDetail() {
  const { id } = useParams();
  const territory = territoryData[id || ''];

  if (!territory) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Territory Not Found</h1>
          <Button variant="hero" asChild><Link to="/territories">Back to Map</Link></Button>
        </div>
      </div>
    );
  }

  const completed = territory.states.filter(s => s.status === 'complete').length;

  return (
    <div className="min-h-screen bg-background bg-grid">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/territories"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">{territory.name}</h1>
            <p className="text-xs text-muted-foreground">{completed}/{territory.states.length} states conquered</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full xp-gradient rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completed / territory.states.length) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* States path */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {territory.states.map((state, i) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative pl-16"
              >
                {/* Node */}
                <div className={`absolute left-3 top-3 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs ${
                  state.status === 'complete' ? 'border-territory-complete bg-territory-complete/20' :
                  state.status === 'active' ? 'border-primary bg-primary/20 animate-pulse-glow' :
                  'border-border bg-secondary'
                }`}>
                  {state.status === 'complete' ? <CheckCircle className="w-4 h-4 text-territory-complete" /> :
                   state.status === 'active' ? <Play className="w-3 h-3 text-primary" /> :
                   <Lock className="w-3 h-3 text-muted-foreground" />}
                </div>

                <Link
                  to={state.status === 'active' ? `/module/${id}/${state.id}` : '#'}
                  className={`block p-4 rounded-xl border transition-all ${
                    state.status === 'complete' ? 'bg-card border-territory-complete/20' :
                    state.status === 'active' ? 'bg-card border-primary/40 hover:border-primary hover:glow-primary cursor-pointer' :
                    'bg-secondary/30 border-border opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{typeIcons[state.type]}</span>
                      <div>
                        <p className={`font-medium text-sm ${state.status === 'locked' ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {state.name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">{state.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3" />
                      <span>+{state.xp}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
