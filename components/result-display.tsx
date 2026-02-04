"use client"

import { Crown, Brain, Lightbulb, AlertTriangle, ChevronDown, ChevronUp, Target } from "lucide-react"
import { useState } from "react"
import { RadarChart } from "./radar-chart"
import { traitInfo, personalityCombinations, type TraitType, type LevelType } from "@/lib/questions"

interface ResultDisplayProps {
  scores: {
    narcissism: number
    machiavellianism: number
    psychopathy: number
  }
  onRestart: () => void
}

function getDetailedLevel(score: number, maxScore: number): LevelType {
  const percentage = (score / maxScore) * 100
  if (percentage <= 20) return 'veryLow'
  if (percentage <= 40) return 'low'
  if (percentage <= 60) return 'moderate'
  if (percentage <= 80) return 'high'
  return 'veryHigh'
}

function getLevelCategory(score: number, maxScore: number): 'low' | 'moderate' | 'high' {
  const percentage = (score / maxScore) * 100
  if (percentage <= 40) return 'low'
  if (percentage <= 60) return 'moderate'
  return 'high'
}

function getTraitIcon(trait: TraitType) {
  switch (trait) {
    case 'narcissism':
      return <Crown className="w-5 h-5" />
    case 'machiavellianism':
      return <Target className="w-5 h-5" />
    case 'psychopathy':
      return <Brain className="w-5 h-5" />
  }
}

function DetailedTraitCard({ 
  trait, 
  score, 
  maxScore 
}: { 
  trait: TraitType
  score: number
  maxScore: number 
}) {
  const [expanded, setExpanded] = useState(false)
  const info = traitInfo[trait]
  const percentage = Math.round((score / maxScore) * 100)
  const level = getDetailedLevel(score, maxScore)
  const levelInfo = info.levels[level]
  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${info.color}20`, color: info.color }}
            >
              {getTraitIcon(trait)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">{info.name}</h3>
              <p className="text-xs text-muted-foreground">{info.nameEn}</p>
            </div>
          </div>
          <div className="text-right">
            <div 
              className="text-3xl font-bold"
              style={{ color: info.color }}
            >
              {percentage}%
            </div>
            <div 
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${info.color}20`, color: info.color }}
            >
              {levelInfo.label} ({levelInfo.range})
            </div>
          </div>
        </div>
        
        {/* Progress bar with segments */}
        <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4 relative">
          <div className="absolute inset-0 flex">
            {[0, 20, 40, 60, 80].map((threshold) => (
              <div key={threshold} className="flex-1 border-r border-background/20 last:border-r-0" />
            ))}
          </div>
          <div 
            className="h-full transition-all duration-1000 ease-out rounded-full relative z-10"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: info.color
            }}
          />
        </div>
        
        {/* Sub-traits */}
        <div className="flex flex-wrap gap-2 mb-4">
          {info.subTraits.map((subTrait, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
            >
              {subTrait}
            </span>
          ))}
        </div>
        
        {/* Level description */}
        <p className="text-sm text-foreground leading-relaxed">
          {levelInfo.description}
        </p>
      </div>
      
      {/* Expandable section */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 bg-secondary/50 flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>查看详细分析</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {expanded && (
        <div className="px-6 py-4 border-t border-border space-y-4">
          {/* Behaviors */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: info.color }} />
              典型行为表现
            </h4>
            <ul className="space-y-1">
              {levelInfo.behaviors.map((behavior, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">•</span>
                  {behavior}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Suggestion */}
          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" style={{ color: info.color }} />
              成长建议
            </h4>
            <p className="text-sm text-muted-foreground">
              {levelInfo.suggestion}
            </p>
          </div>
          
          {/* Trait description */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">关于{info.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {info.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function PersonalityCombinationCard({ 
  scores,
  maxScore 
}: { 
  scores: ResultDisplayProps['scores']
  maxScore: number
}) {
  const narcLevel = getLevelCategory(scores.narcissism, maxScore)
  const machLevel = getLevelCategory(scores.machiavellianism, maxScore)
  const psychLevel = getLevelCategory(scores.psychopathy, maxScore)
  
  // Determine combination key
  let combinationKey: keyof typeof personalityCombinations
  
  if (narcLevel === 'moderate' && machLevel === 'moderate' && psychLevel === 'moderate') {
    combinationKey = 'moderate'
  } else {
    const n = narcLevel === 'high' ? 'high' : 'low'
    const m = machLevel === 'high' ? 'high' : 'low'
    const p = psychLevel === 'high' ? 'high' : 'low'
    combinationKey = `${n}-${m}-${p}` as keyof typeof personalityCombinations
  }
  
  const combination = personalityCombinations[combinationKey]
  
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Target className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{combination.name}</h3>
          <p className="text-sm text-muted-foreground">你的人格组合类型</p>
        </div>
      </div>
      
      <p className="text-foreground mb-6 leading-relaxed">
        {combination.description}
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            潜在优势
          </h4>
          <ul className="space-y-2">
            {combination.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-accent">+</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Risks */}
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" />
            需注意的方面
          </h4>
          <ul className="space-y-2">
            {combination.risks.map((risk, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-primary">!</span>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ScoreComparisonBar({ scores, maxScore }: { scores: ResultDisplayProps['scores'], maxScore: number }) {
  const traits: TraitType[] = ['narcissism', 'machiavellianism', 'psychopathy']
  
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">特质对比</h3>
      <div className="space-y-4">
        {traits.map((trait) => {
          const info = traitInfo[trait]
          const percentage = Math.round((scores[trait] / maxScore) * 100)
          return (
            <div key={trait} className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">{info.name}</div>
              <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                  style={{ 
                    width: `${Math.max(percentage, 10)}%`,
                    backgroundColor: info.color
                  }}
                >
                  <span className="text-xs font-medium text-card-foreground">{percentage}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ResultDisplay({ scores, onRestart }: ResultDisplayProps) {
  const maxScore = 45 // 9 questions * 5 max score per trait
  
  // Calculate overall dark triad score
  const totalScore = scores.narcissism + scores.machiavellianism + scores.psychopathy
  const maxTotalScore = maxScore * 3
  const overallPercentage = Math.round((totalScore / maxTotalScore) * 100)
  
  // Determine dominant trait
  const traits: TraitType[] = ['narcissism', 'machiavellianism', 'psychopathy']
  const dominantTrait = traits.reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  )
  
  // Get overall level description
  const getOverallDescription = () => {
    if (overallPercentage <= 30) return "你的整体黑暗人格指数较低,表明你是一个善良、真诚、有同理心的人。"
    if (overallPercentage <= 50) return "你的整体黑暗人格指数处于中等偏低水平,具备一定的自我保护意识但仍保持良好品性。"
    if (overallPercentage <= 70) return "你的整体黑暗人格指数处于中等偏高水平,可能在竞争环境中更具优势,但需注意人际关系。"
    return "你的整体黑暗人格指数较高,建议多反思自己的行为模式对他人的影响。"
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          你的黑暗三角测试结果
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
          以下是基于你的回答所分析出的三种黑暗人格特质水平。每项特质都有五个等级:极低、较低、中等、较高、极高。
        </p>
      </div>

      {/* Overall Score Card */}
      <div className="bg-card border border-border rounded-lg p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm text-muted-foreground mb-2">总体黑暗人格指数</p>
            <div className="text-6xl md:text-7xl font-bold text-primary mb-4">
              {overallPercentage}%
            </div>
            <p className="text-foreground mb-4">
              {getOverallDescription()}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
              <span className="text-muted-foreground text-sm">主导特质:</span>
              <span 
                className="font-semibold text-sm"
                style={{ color: traitInfo[dominantTrait].color }}
              >
                {traitInfo[dominantTrait].name}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <RadarChart scores={scores} />
          </div>
        </div>
      </div>

      {/* Score Comparison */}
      <div className="mb-8">
        <ScoreComparisonBar scores={scores} maxScore={maxScore} />
      </div>

      {/* Personality Combination */}
      <div className="mb-8">
        <PersonalityCombinationCard scores={scores} maxScore={maxScore} />
      </div>

      {/* Section Title */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">各特质详细分析</h3>
        <p className="text-sm text-muted-foreground">点击"查看详细分析"了解更多</p>
      </div>

      {/* Individual Traits - Detailed Cards */}
      <div className="grid gap-6 mb-8">
        <DetailedTraitCard trait="narcissism" score={scores.narcissism} maxScore={maxScore} />
        <DetailedTraitCard trait="machiavellianism" score={scores.machiavellianism} maxScore={maxScore} />
        <DetailedTraitCard trait="psychopathy" score={scores.psychopathy} maxScore={maxScore} />
      </div>

      {/* Disclaimer */}
      <div className="bg-secondary/50 border border-border rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">重要声明</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              本测试仅供娱乐和自我探索之用,不应被视为专业的心理评估或诊断工具。黑暗三角特质在一定程度上是正常人格的一部分,高分并不一定意味着你有心理问题。如果你对自己的心理健康有任何担忧,请咨询专业的心理健康专家。测试结果受多种因素影响,包括当前情绪、理解偏差等,请理性看待。
            </p>
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={onRestart}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          重新测试
        </button>
      </div>
    </div>
  )
}
