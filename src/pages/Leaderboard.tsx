import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Crown, Map, Flame } from 'lucide-react';
import acroboLogo from '@/assets/acrobo-logo.jpg';

interface Player {
  rank: number;
  name: string;
  level: number;
  xp: number;
  hunterRank: string;
  streak: number;
}

const players: Player[] = [
  { rank: 1, name: 'ShadowMonarch', level: 45, xp: 89200, hunterRank: 'S', streak: 42 },
  { rank: 2, name: 'IronBlade', level: 38, xp: 72100, hunterRank: 'A', streak: 28 },
  { rank: 3, name: 'CodeReaper', level: 35, xp: 65400, hunterRank: 'A', streak: 21 },
  { rank: 4, name: 'NeuralKnight', level: 30, xp: 54200, hunterRank: 'B', streak: 15 },
  { rank: 5, name: 'DataHunter', level: 28, xp: 48900, hunterRank: 'B', streak: 12 },
  { rank: 6, name: 'AlgoMaster', level: 25, xp: 42300, hunterRank: 'B', streak: 10 },
  { rank: 7, name: 'ByteStorm', level: 22, xp: 36700, hunterRank: 'C', streak: 8 },
  { rank: 8, name: 'PixelCraft', level: 19, xp: 28900, hunterRank: 'C', streak: 5 },
  { rank: 9, name: 'CipherX', level: 15, xp: 21400, hunterRank: 'C', streak: 3 },
  { rank: 10, name: 'StackPilot', level: 12, xp: 15200, hunterRank: 'D', streak: 7 },
];

const rankColors: Record<string, string> = {
  S: 'text-rank-s', A: 'text-rank-a', B: 'text-rank-b', C: 'text-rank-c', D: 'text-rank-d',
};

const topColors = ['text-rank-s', 'text-muted-foreground', 'text-rank-a'];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background bg-grid pb-20 md:pb-8">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={acroboLogo} alt="ACROBO" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-display text-lg font-bold tracking-wider uppercase text-foreground">ACROBO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/territories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Territories</Link>
            <Link to="/leaderboard" className="text-sm text-primary font-medium">Leaderboard</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">🏆 Hunter Rankings</h1>
          <p className="text-muted-foreground mb-8">Top hunters of the season</p>
        </motion.div>

        {/* Top 3 podium */}
        <div className="flex justify-center items-end gap-4 mb-10">
          {[1, 0, 2].map((idx) => {
            const p = players[idx];
            const isFirst = idx === 0;
            return (
              <motion.div
                key={p.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col items-center ${isFirst ? 'order-2' : idx === 1 ? 'order-1' : 'order-3'}`}
              >
                <div className={`w-16 h-16 ${isFirst ? 'w-20 h-20' : ''} rounded-xl bg-secondary border-2 ${
                  isFirst ? 'border-rank-s glow-accent' : 'border-border'
                } flex items-center justify-center mb-2`}>
                  <span className={`font-display text-2xl ${isFirst ? 'text-3xl' : ''} font-bold ${rankColors[p.hunterRank]}`}>
                    {p.hunterRank}
                  </span>
                </div>
                <p className="font-display font-bold text-foreground text-sm">{p.name}</p>
                <p className={`text-xs font-bold ${topColors[idx]}`}>#{p.rank}</p>
                <p className="text-xs text-muted-foreground">{p.xp.toLocaleString()} XP</p>
              </motion.div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {players.map((p, i) => (
            <motion.div
              key={p.rank}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-4 px-5 py-4 ${i < players.length - 1 ? 'border-b border-border' : ''} ${
                p.rank <= 3 ? 'bg-secondary/30' : ''
              }`}
            >
              <span className={`font-display font-bold w-8 text-center ${
                p.rank <= 3 ? topColors[p.rank - 1] : 'text-muted-foreground'
              }`}>
                {p.rank}
              </span>
              <div className={`w-10 h-10 rounded-lg bg-secondary border ${
                `border-${rankColors[p.hunterRank].replace('text-', '')}`
              } flex items-center justify-center`}>
                <span className={`font-display font-bold ${rankColors[p.hunterRank]}`}>{p.hunterRank}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">Level {p.level}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Flame className="w-3 h-3 text-rank-a" />
                {p.streak}
              </div>
              <p className="text-sm font-display font-bold text-foreground">{p.xp.toLocaleString()}</p>
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
        <Link to="/territories" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Map className="w-5 h-5" />
          <span className="text-[10px]">Territories</span>
        </Link>
        <Link to="/leaderboard" className="flex flex-col items-center gap-1 text-primary">
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">Leaderboard</span>
        </Link>
      </div>
    </div>
  );
}
