import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { AuraBlob } from '../components/AuraBlob';
import { Sparkles as SparkleEffect } from '../components/LuxuryElements';

const auraTypes = {
  red: { name: 'Red Vitality', color: '#DC2626', description: 'You radiate strength and energy. Your skin craves revitalizing, strengthening formulations.' },
  orange: { name: 'Orange Radiance', color: '#EA580C', description: 'You glow with warmth and creativity. Brightening and energizing products suit you best.' },
  yellow: { name: 'Yellow Balance', color: '#CA8A04', description: 'You shine with optimism and clarity. Balancing and purifying formulations align with your energy.' },
  green: { name: 'Green Calm', color: '#16A34A', description: 'You embody harmony and renewal. Soothing, natural ingredients restore your glow.' },
  blue: { name: 'Blue Hydration', color: '#2563EB', description: 'You flow with tranquility and depth. Hydrating and calming products nurture your skin.' },
  purple: { name: 'Purple Luxe', color: '#9333EA', description: 'You resonate with intuition and luxury. Rich, restorative formulations elevate your ritual.' },
};

const questions = [
  {
    id: 1,
    question: 'What are your primary skin concerns?',
    options: [
      { text: 'Acne & breakouts', auras: ['yellow', 'green'] },
      { text: 'Dullness & uneven tone', auras: ['orange', 'purple'] },
      { text: 'Dryness & dehydration', auras: ['blue', 'green'] },
      { text: 'Aging & fine lines', auras: ['purple', 'red'] },
      { text: 'Sensitivity & redness', auras: ['green', 'blue'] },
    ],
  },
  {
    id: 2,
    question: 'How would you describe your skin type?',
    options: [
      { text: 'Oily', auras: ['yellow', 'green'] },
      { text: 'Dry', auras: ['blue', 'purple'] },
      { text: 'Combination', auras: ['orange', 'yellow'] },
      { text: 'Normal', auras: ['green', 'blue'] },
      { text: 'Sensitive', auras: ['green', 'blue'] },
    ],
  },
  {
    id: 3,
    question: 'What does your ideal skincare ritual look like?',
    options: [
      { text: 'Quick & minimal', auras: ['yellow', 'orange'] },
      { text: 'Luxurious & indulgent', auras: ['purple', 'red'] },
      { text: 'Natural & simple', auras: ['green', 'blue'] },
      { text: 'Targeted & effective', auras: ['red', 'orange'] },
    ],
  },
  {
    id: 4,
    question: 'What hair concerns do you have?',
    options: [
      { text: 'Hair fall & thinning', auras: ['red', 'purple'] },
      { text: 'Dryness & frizz', auras: ['blue', 'green'] },
      { text: 'Oily scalp', auras: ['yellow', 'green'] },
      { text: 'Damage & breakage', auras: ['red', 'orange'] },
      { text: 'Dullness', auras: ['orange', 'purple'] },
    ],
  },
  {
    id: 5,
    question: 'How do you feel most days?',
    options: [
      { text: 'Energetic & driven', auras: ['red', 'orange'] },
      { text: 'Calm & balanced', auras: ['green', 'blue'] },
      { text: 'Creative & expressive', auras: ['orange', 'purple'] },
      { text: 'Reflective & intuitive', auras: ['purple', 'blue'] },
    ],
  },
  {
    id: 6,
    question: 'What draws you to a beauty product?',
    options: [
      { text: 'Visible results', auras: ['red', 'orange'] },
      { text: 'Clean ingredients', auras: ['green', 'yellow'] },
      { text: 'Luxurious experience', auras: ['purple', 'blue'] },
      { text: 'Traditional wisdom', auras: ['green', 'purple'] },
    ],
  },
];

const AuraAnalysisPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnswer = (questionId, selectedOptions) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOptions }));
  };

  const toggleOption = (questionId, option) => {
    const current = answers[questionId] || [];
    const exists = current.find(o => o.text === option.text);
    if (exists) {
      handleAnswer(questionId, current.filter(o => o.text !== option.text));
    } else {
      handleAnswer(questionId, [...current, option]);
    }
  };

  const calculateResults = () => {
    const scores = { red: 0, orange: 0, yellow: 0, green: 0, blue: 0, purple: 0 };
    
    Object.values(answers).forEach(selectedOptions => {
      selectedOptions.forEach(option => {
        option.auras.forEach(aura => {
          scores[aura] += 1;
        });
      });
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0];
    const secondary = sorted[1][0];

    // Get recommended products based on aura
    const recommended = products.filter(p => 
      p.auraTag.toLowerCase().includes(primary) || 
      p.auraTag.toLowerCase().includes(secondary)
    ).slice(0, 3);

    // Fallback if no exact matches
    const finalRecommended = recommended.length >= 3 ? recommended : products.slice(0, 3);

    setResults({
      primary: auraTypes[primary],
      secondary: auraTypes[secondary],
      products: finalRecommended,
    });
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const canProceed = (answers[questions[currentQuestion]?.id] || []).length > 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  if (showResults && results) {
    return (
      <main className="overflow-hidden min-h-screen" data-testid="aura-results">
        <section className="relative pt-32 pb-16 section-padding">
          <SparkleEffect count={20} />
          <AuraBlob color="mixed" size="xl" className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-15" />
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-4">
                Your Aura Profile
              </p>
              
              {/* Primary Aura */}
              <div className="mb-8">
                <h1 
                  className="font-display text-4xl md:text-5xl mb-4"
                  style={{ color: results.primary.color }}
                >
                  {results.primary.name}
                </h1>
                <p className="font-body text-lg text-text-secondary max-w-xl mx-auto">
                  {results.primary.description}
                </p>
              </div>

              {/* Secondary Aura */}
              <div className="mb-12 p-6 bg-warm-surface/50 rounded-2xl">
                <p className="font-body text-sm text-text-muted mb-2">Secondary Aura</p>
                <p className="font-display text-xl" style={{ color: results.secondary.color }}>
                  {results.secondary.name}
                </p>
              </div>

              {/* Recommended Products */}
              <div className="mb-12">
                <h2 className="font-display text-2xl text-charcoal mb-6">
                  Recommended <span className="aura-text">Rituals</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.products.map(product => (
                    <Link key={product.id} to={`/shop/${product.id}`}>
                      <ProductCard product={product} compact />
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/consult" className="btn-primary">
                  Book ₹199 Consult
                </Link>
                <button onClick={resetQuiz} className="btn-secondary flex items-center justify-center gap-2">
                  <RotateCcw size={16} />
                  Retake Analysis
                </button>
              </div>

              {/* Disclaimer */}
              <p className="mt-12 font-body text-xs text-text-muted max-w-lg mx-auto">
                This analysis provides personalized product guidance and does not replace medical advice.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const question = questions[currentQuestion];

  return (
    <main className="overflow-hidden min-h-screen" data-testid="aura-analysis-page">
      <section className="relative pt-32 pb-16 section-padding min-h-screen flex items-center">
        <SparkleEffect count={15} />
        <AuraBlob color="purple" size="lg" className="absolute -right-40 top-20 opacity-10" />
        
        <div className="container-custom relative z-10 w-full">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-body text-sm text-text-muted">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="font-body text-sm text-text-muted">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="h-1 bg-warm-surface rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-aura-purple via-aura-blue to-aura-green transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6">
                <Sparkles size={16} className="text-gold" />
                <span className="font-body text-sm text-charcoal">Aura Analysis</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-charcoal">
                {question.question}
              </h2>
              <p className="font-body text-sm text-text-muted mt-2">Select all that apply</p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, idx) => {
                const isSelected = (answers[question.id] || []).find(o => o.text === option.text);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleOption(question.id, option)}
                    className={`w-full p-4 rounded-xl text-left font-body transition-all duration-300 ${
                      isSelected
                        ? 'bg-charcoal text-white'
                        : 'bg-white/60 hover:bg-white text-charcoal border border-gray-200'
                    }`}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                disabled={currentQuestion === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              
              {isLastQuestion ? (
                <button
                  onClick={calculateResults}
                  disabled={!canProceed}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  See Results
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  disabled={!canProceed}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuraAnalysisPage;
