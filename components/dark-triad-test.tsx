"use client"

import { useState, useCallback } from "react"
import { IntroScreen } from "./intro-screen"
import { QuestionCard } from "./question-card"
import { ResultDisplay } from "./result-display"
import { questions, type TraitType } from "@/lib/questions"

type TestPhase = 'intro' | 'test' | 'result'

export function DarkTriadTest() {
  const [phase, setPhase] = useState<TestPhase>('intro')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleStart = useCallback(() => {
    setPhase('test')
    setCurrentQuestionIndex(0)
    setAnswers({})
  }, [])

  const handleAnswer = useCallback((value: number) => {
    const questionId = questions[currentQuestionIndex].id
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [currentQuestionIndex])

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setPhase('result')
    }
  }, [currentQuestionIndex])

  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }, [currentQuestionIndex])

  const calculateScores = useCallback(() => {
    const scores = {
      narcissism: 0,
      machiavellianism: 0,
      psychopathy: 0
    }

    questions.forEach(q => {
      const answer = answers[q.id] || 0
      scores[q.trait] += answer
    })

    return scores
  }, [answers])

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = currentQuestion ? (answers[currentQuestion.id] || 0) : 0

  return (
    <main className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {phase === 'intro' && (
          <IntroScreen onStart={handleStart} />
        )}

        {phase === 'test' && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            value={currentAnswer}
            onChange={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === questions.length - 1}
          />
        )}

        {phase === 'result' && (
          <ResultDisplay 
            scores={calculateScores()} 
            onRestart={handleStart}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>仅供娱乐和自我探索 · 非专业心理诊断</p>
      </footer>
    </main>
  )
}
