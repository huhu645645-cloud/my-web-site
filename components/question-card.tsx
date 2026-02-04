"use client"

import { cn } from "@/lib/utils"
import type { Question } from "@/lib/questions"

interface QuestionCardProps {
  question: Question
  currentIndex: number
  totalQuestions: number
  value: number
  onChange: (value: number) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

const ratingLabels = [
  "完全不同意",
  "不同意",
  "中立",
  "同意",
  "完全同意"
]

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  value,
  onChange,
  onNext,
  onPrev,
  isFirst,
  isLast
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>问题 {currentIndex + 1} / {totalQuestions}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card border border-border rounded-lg p-8 mb-6">
        <p className="text-xl md:text-2xl text-card-foreground leading-relaxed text-balance">
          {question.text}
        </p>
      </div>

      {/* Rating Scale */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          <span>完全不同意</span>
          <span>完全同意</span>
        </div>
        <div className="flex gap-2 md:gap-3">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              type="button"
              key={rating}
              onClick={() => onChange(rating)}
              className={cn(
                "flex-1 h-14 md:h-16 rounded-lg border-2 transition-all duration-200 text-lg font-medium",
                value === rating
                  ? "bg-primary border-primary text-primary-foreground scale-105"
                  : "bg-card border-border text-card-foreground hover:border-primary/50 hover:bg-secondary"
              )}
            >
              {rating}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {value > 0 ? ratingLabels[value - 1] : "请选择你的答案"}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className={cn(
            "flex-1 py-4 rounded-lg border border-border text-foreground font-medium transition-all",
            isFirst 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-secondary"
          )}
        >
          上一题
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={value === 0}
          className={cn(
            "flex-1 py-4 rounded-lg font-medium transition-all",
            value === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90"
          )}
        >
          {isLast ? "查看结果" : "下一题"}
        </button>
      </div>
    </div>
  )
}
