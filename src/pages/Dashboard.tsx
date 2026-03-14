import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Zap, Flame, Trophy, Target, Map, Award, LogOut, Crown, Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';
import acroboLogo from '@/assets/acrobo-logo.jpg';

// Mock data for MVP
const playerData = {
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  rank: 'B',
  streak: 7,
  totalXp: 15200,
  achievements: 8,
  territoriesConquered: 3,
  totalTerritories: 8,
};

const skills = [
  { name: 'Python', level: 8, color: 'bg-rank-b' },
  { name: 'Machine Learning', level: 5, color: 'bg-rank-a' },
  { name: 'Data Structures', level: 6, color: 'bg-rank-c' },
  { name: 'Neural Networks', level: 3, color: 'bg-primary' },
];

const recentAchievements = [
  { name: 'First Blood', desc: 'Complete your first module', icon: '⚔️' },
  { name: 'Streak Master', desc: '7 day learning streak', icon: '🔥' },
  { name: 'Territory Hunter', desc: 'Invade 3 territories', icon: '🏴' },
];

const rankColors: Record<string, string> = {
  S: 'text-rank-s border-rank-s',
  A: 'text-rank-a border-rank-a',
  B: 'text-rank-b border-rank-b',
  C: 'text-rank-c border-rank-c',
  D: 'text-rank-d border-rank-d',
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Hunter';

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={acroboLogo} alt="ACROBO" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-display text-lg font-bold tracking-wider uppercase text-foreground">ACROBO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm text-primary font-medium">Dashboard</Link>
            <Link to="/territories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Territories</Link>
            <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border">
              <Flame className="w-4 h-4 text-rank-a" />
              <span className="text-sm font-medium text-foreground">{playerData.streak}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Player card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className={`w-20 h-20 rounded-xl border-2 ${rankColors[playerData.rank]} bg-secondary flex items-center justify-center`}>
              <span className="font-display text-3xl font-bold">{playerData.rank}</span>
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-foreground">{displayName}</h1>
              <p className="text-muted-foreground text-sm">Level {playerData.level} Hunter</p>
              <div className="mt-3 w-full max-w-md">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>XP: {playerData.xp.toLocaleString()}</span>
                  <span>{playerData.xpToNext.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full xp-gradient rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(playerData.xp / playerData.xpToNext) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="hero" asChild>
                <Link to="/territories">
                  <Swords className="w-4 h-4 mr-2" /> Invade
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Zap, label: 'Total XP', value: playerData.totalXp.toLocaleString(), color: 'text-primary' },
            { icon: Flame, label: 'Day Streak', value: playerData.streak, color: 'text-rank-a' },
            { icon: Trophy, label: 'Achievements', value: playerData.achievements, color: 'text-accent' },
            { icon: Map, label: 'Territories', value: `${playerData.territoriesConquered}/${playerData.totalTerritories}`, color: 'text-territory-complete' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Skills
            </h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">Lv.{skill.level}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.color} rounded-full transition-all duration-700`}
                      style={{ width: `${(skill.level / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" /> Recent Achievements
            </h2>
            <div className="space-y-3">
              {recentAchievements.map((a) => (
                <div key={a.name} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-border">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <p className="text-foreground font-medium text-sm">{a.name}</p>
                    <p className="text-muted-foreground text-xs">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-2 px-4 flex justify-around md:hidden z-50">
          <Link to="/dashboard" className="flex flex-col items-center gap-1 text-primary">
            <Crown className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </Link>
          <Link to="/territories" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Map className="w-5 h-5" />
            <span className="text-[10px]">Territories</span>
          </Link>
          <Link to="/leaderboard" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px]">Leaderboard</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
