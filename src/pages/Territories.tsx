import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, Swords, ArrowLeft, Map, Trophy, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import acroboLogo from '@/assets/acrobo-logo.jpg';

interface Territory {
  id: string;
  name: string;
  description: string;
  states: number;
  completedStates: number;
  status: 'locked' | 'active' | 'complete';
  xpReward: number;
  rank: string;
}

const territories: Territory[] = [
  { id: 'python', name: 'Python Fundamentals', description: 'Master the basics of Python programming', states: 8, completedStates: 8, status: 'complete', xpReward: 2000, rank: 'D' },
  { id: 'data-structures', name: 'Data Structures', description: 'Arrays, trees, graphs, and beyond', states: 10, completedStates: 6, status: 'active', xpReward: 3000, rank: 'C' },
  { id: 'ai-foundations', name: 'AI Foundations', description: 'Enter the realm of Artificial Intelligence', states: 12, completedStates: 3, status: 'active', xpReward: 4000, rank: 'B' },
  { id: 'machine-learning', name: 'Machine Learning', description: 'Algorithms that learn from data', states: 15, completedStates: 0, status: 'active', xpReward: 5000, rank: 'A' },
  { id: 'deep-learning', name: 'Deep Learning', description: 'Neural networks and deep architectures', states: 12, completedStates: 0, status: 'locked', xpReward: 6000, rank: 'A' },
  { id: 'nlp', name: 'Natural Language Processing', description: 'Teach machines to understand language', states: 10, completedStates: 0, status: 'locked', xpReward: 5000, rank: 'S' },
  { id: 'computer-vision', name: 'Computer Vision', description: 'Give machines the power of sight', states: 10, completedStates: 0, status: 'locked', xpReward: 5500, rank: 'S' },
  { id: 'reinforcement', name: 'Reinforcement Learning', description: 'Train agents through reward systems', states: 8, completedStates: 0, status: 'locked', xpReward: 7000, rank: 'S' },
];

const statusStyles = {
  locked: 'border-territory-locked bg-territory-locked/20 opacity-60',
  active: 'border-territory-active/50 bg-card hover:border-territory-active hover:glow-primary',
  complete: 'border-territory-complete/50 bg-card',
};

const rankColors: Record<string, string> = {
  S: 'text-rank-s bg-rank-s/10', A: 'text-rank-a bg-rank-a/10', B: 'text-rank-b bg-rank-b/10',
  C: 'text-rank-c bg-rank-c/10', D: 'text-rank-d bg-rank-d/10',
};

export default function Territories() {
  return (
    <div className="min-h-screen bg-background bg-grid pb-20 md:pb-8">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={acroboLogo} alt="ACROBO" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-display text-lg font-bold tracking-wider uppercase text-foreground">ACROBO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/territories" className="text-sm text-primary font-medium">Territories</Link>
            <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link>
          </nav>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Link>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">⚔️ Territory Map</h1>
          <p className="text-muted-foreground mb-8">Invade territories to expand your knowledge empire</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {territories.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={t.status !== 'locked' ? `/territory/${t.id}` : '#'}
                className={`block p-6 rounded-2xl border transition-all duration-300 ${statusStyles[t.status]}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-display font-bold ${rankColors[t.rank]}`}>
                    Rank {t.rank}
                  </span>
                  {t.status === 'locked' && <Lock className="w-5 h-5 text-muted-foreground" />}
                  {t.status === 'complete' && <CheckCircle className="w-5 h-5 text-territory-complete" />}
                  {t.status === 'active' && <Swords className="w-5 h-5 text-primary" />}
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>States: {t.completedStates}/{t.states}</span>
                  <span>+{t.xpReward} XP</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      t.status === 'complete' ? 'bg-territory-complete' : 'xp-gradient'
                    }`}
                    style={{ width: `${t.states > 0 ? (t.completedStates / t.states) * 100 : 0}%` }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2 px-4 flex justify-around md:hidden z-50">
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Crown className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </Link>
        <Link to="/territories" className="flex flex-col items-center gap-1 text-primary">
          <Map className="w-5 h-5" />
          <span className="text-[10px]">Territories</span>
        </Link>
        <Link to="/leaderboard" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">Leaderboard</span>
        </Link>
      </div>
    </div>
  );
}
