import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const moduleContent: Record<string, { title: string; sections: string[]; quiz: QuizQuestion[] }> = {
  'data-structures-7': {
    title: 'Graphs',
    sections: [
      '<h2>What is a Graph?</h2><p>A graph is a non-linear data structure consisting of <strong>vertices (nodes)</strong> and <strong>edges</strong> that connect pairs of vertices.</p><p>Graphs are used to represent networks, social connections, maps, and more.</p>',
      '<h2>Types of Graphs</h2><ul><li><strong>Directed Graph (Digraph)</strong>: Edges have a direction</li><li><strong>Undirected Graph</strong>: Edges have no direction</li><li><strong>Weighted Graph</strong>: Edges have weights/costs</li><li><strong>Unweighted Graph</strong>: All edges are equal</li></ul>',
      '<h2>Graph Representations</h2><p><strong>Adjacency Matrix:</strong> A 2D array where matrix[i][j] = 1 if there\'s an edge between vertex i and j.</p><p><strong>Adjacency List:</strong> An array of lists where each list contains the neighbors of a vertex.</p>',
      '<h2>Graph Traversal</h2><p><strong>BFS (Breadth-First Search)</strong>: Explores all neighbors at the current depth before moving to nodes at the next depth level.</p><p><strong>DFS (Depth-First Search)</strong>: Explores as far as possible along each branch before backtracking.</p>',
    ],
    quiz: [
      { question: 'Which data structure does BFS typically use?', options: ['Stack', 'Queue', 'Heap', 'Tree'], correct: 1 },
      { question: 'In a directed graph, edges have:', options: ['No direction', 'A direction', 'Weights only', 'Colors'], correct: 1 },
      { question: 'An adjacency matrix for a graph with V vertices has space complexity of:', options: ['O(V)', 'O(V²)', 'O(E)', 'O(V+E)'], correct: 1 },
    ],
  },
  'ai-foundations-4': {
    title: 'Knowledge Representation',
    sections: [
      '<h2>What is Knowledge Representation?</h2><p>Knowledge representation in AI is the method used to encode information about the world in a form that a computer system can use to solve complex tasks.</p>',
      '<h2>Types of Knowledge</h2><ul><li><strong>Declarative</strong>: Facts about objects and events</li><li><strong>Procedural</strong>: How to perform tasks</li><li><strong>Meta-knowledge</strong>: Knowledge about knowledge</li><li><strong>Heuristic</strong>: Rules of thumb from experience</li></ul>',
    ],
    quiz: [
      { question: 'Which type of knowledge describes how to perform tasks?', options: ['Declarative', 'Procedural', 'Meta-knowledge', 'Heuristic'], correct: 1 },
    ],
  },
  'machine-learning-1': {
    title: 'Introduction to ML',
    sections: [
      '<h2>What is Machine Learning?</h2><p>Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.</p>',
      '<h2>Types of ML</h2><ul><li><strong>Supervised Learning</strong>: Learning from labeled data</li><li><strong>Unsupervised Learning</strong>: Finding patterns in unlabeled data</li><li><strong>Reinforcement Learning</strong>: Learning through rewards and penalties</li></ul>',
    ],
    quiz: [
      { question: 'Which type of ML uses labeled data?', options: ['Unsupervised', 'Supervised', 'Reinforcement', 'None'], correct: 1 },
    ],
  },
};

export default function ModuleViewer() {
  const { territoryId, stateId } = useParams();
  const navigate = useNavigate();
  const key = `${territoryId}-${stateId}`;
  const module = moduleContent[key];

  const [currentSection, setCurrentSection] = useState(0);
  const [inQuiz, setInQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Module Not Found</h1>
          <p className="text-muted-foreground mb-4">This module content hasn't been added yet.</p>
          <Button variant="hero" asChild><Link to={`/territory/${territoryId}`}>Back to Territory</Link></Button>
        </div>
      </div>
    );
  }

  const totalSteps = module.sections.length + module.quiz.length;
  const currentStep = inQuiz ? module.sections.length + currentQuestion + 1 : currentSection + 1;

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === module.quiz[currentQuestion].correct) {
      setScore(s => s + 1);
      toast.success('+50 XP!');
    } else {
      toast.error('Wrong answer!');
    }
    setTimeout(() => {
      if (currentQuestion < module.quiz.length - 1) {
        setCurrentQuestion(q => q + 1);
        setAnswered(null);
      } else {
        setQuizComplete(true);
      }
    }, 1000);
  };

  const handleNext = () => {
    if (currentSection < module.sections.length - 1) {
      setCurrentSection(s => s + 1);
    } else {
      setInQuiz(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/territory/${territoryId}`}><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <h1 className="font-display text-lg font-bold text-foreground">{module.title}</h1>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full xp-gradient rounded-full"
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {quizComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">Module Complete!</h2>
              <p className="text-muted-foreground mb-2">Score: {score}/{module.quiz.length}</p>
              <div className="flex items-center justify-center gap-2 text-primary mb-8">
                <Zap className="w-5 h-5" />
                <span className="font-display text-xl font-bold">+{score * 50 + 100} XP Earned</span>
              </div>
              <Button variant="hero" onClick={() => navigate(`/territory/${territoryId}`)}>
                Back to Territory
              </Button>
            </motion.div>
          ) : inQuiz ? (
            <motion.div
              key={`quiz-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-8"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                ❓ Quiz — Question {currentQuestion + 1}/{module.quiz.length}
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                {module.quiz[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {module.quiz[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered !== null}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      answered === null
                        ? 'bg-card border-border hover:border-primary/50 cursor-pointer'
                        : idx === module.quiz[currentQuestion].correct
                          ? 'bg-territory-complete/10 border-territory-complete'
                          : idx === answered
                            ? 'bg-destructive/10 border-destructive'
                            : 'bg-card border-border opacity-50'
                    }`}
                  >
                    <span className="text-foreground font-medium">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`section-${currentSection}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                📖 Lesson — Part {currentSection + 1}/{module.sections.length}
              </div>
              <div
                className="prose prose-invert max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4 [&_p]:text-secondary-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:space-y-2 [&_li]:text-secondary-foreground [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: module.sections[currentSection] }}
              />
              <div className="mt-8 flex justify-end">
                <Button variant="hero" onClick={handleNext}>
                  {currentSection < module.sections.length - 1 ? 'Continue' : 'Start Quiz'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
