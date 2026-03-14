import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Trophy, Sword } from 'lucide-react';
import acroboLogo from '@/assets/acrobo-logo.jpg';

const features = [
  { icon: Sword, title: 'Invade Territories', desc: 'Conquer knowledge domains one module at a time' },
  { icon: Zap, title: 'Earn XP & Level Up', desc: 'Complete quizzes and lessons to gain experience' },
  { icon: Shield, title: 'Unlock Achievements', desc: 'Collect badges and showcase your mastery' },
  { icon: Trophy, title: 'Climb Rankings', desc: 'Compete on the leaderboard against other players' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src={acroboLogo} alt="ACROBO" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-display text-xl font-bold tracking-wider uppercase text-foreground">ACROBO</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link to="/auth">Login</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/auth?mode=signup">Start Quest</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            ⚔️ Season 1 Now Live
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight mb-6">
            <span className="text-foreground">Arise,</span>{' '}
            <span className="text-primary glow-text">Player</span>
            <br />
            <span className="text-foreground">Conquer Knowledge</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            A gamified learning platform where every lesson is a quest, every module a territory to invade, and every student a rising hunter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="lg" asChild>
              <Link to="/auth?mode=signup">Begin Your Journey</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/auth">I'm Already a Hunter</Link>
            </Button>
          </div>
        </motion.div>

        {/* Rank badges */}
        <motion.div
          className="flex gap-4 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {['S', 'A', 'B', 'C', 'D'].map((rank, i) => (
            <div
              key={rank}
              className={`w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold text-lg border animate-float ${
                rank === 'S' ? 'border-rank-s text-rank-s bg-rank-s/10' :
                rank === 'A' ? 'border-rank-a text-rank-a bg-rank-a/10' :
                rank === 'B' ? 'border-rank-b text-rank-b bg-rank-b/10' :
                rank === 'C' ? 'border-rank-c text-rank-c bg-rank-c/10' :
                'border-rank-d text-rank-d bg-rank-d/10'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {rank}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 ACROBO — Build Code Invent</p>
      </footer>
    </div>
  );
}
