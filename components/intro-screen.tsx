"use client"

import { traitInfo } from "@/lib/questions"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {/* Logo/Icon */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <svg 
            viewBox="0 0 100 100" 
            className="w-24 h-24 md:w-32 md:h-32"
          >
            {/* Outer triangle */}
            <polygon 
              points="50,10 90,80 10,80" 
              fill="none" 
              stroke="url(#triangleGradient)" 
              strokeWidth="2"
              className="animate-pulse"
            />
            {/* Inner triangle */}
            <polygon 
              points="50,25 75,70 25,70" 
              fill="url(#innerGradient)" 
              fillOpacity="0.3"
            />
            {/* Center point */}
            <circle cx="50" cy="55" r="4" fill="var(--primary)" />
            
            <defs>
              <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={traitInfo.narcissism.color} />
                <stop offset="50%" stopColor={traitInfo.machiavellianism.color} />
                <stop offset="100%" stopColor={traitInfo.psychopathy.color} />
              </linearGradient>
              <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={traitInfo.narcissism.color} />
                <stop offset="50%" stopColor={traitInfo.machiavellianism.color} />
                <stop offset="100%" stopColor={traitInfo.psychopathy.color} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
        黑暗三角人格测试
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Dark Triad Personality Test
      </p>

      {/* Description */}
      <p className="text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
        探索你内心深处的三种黑暗人格特质：自恋、马基雅维利主义和精神病态。这个测试将帮助你了解自己的人格中可能存在的这些特质。
      </p>

      {/* Trait Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        {Object.entries(traitInfo).map(([key, info]) => (
          <div 
            key={key}
            className="bg-card border border-border rounded-lg p-5 text-left hover:border-primary/50 transition-colors"
          >
            <div 
              className="w-3 h-3 rounded-full mb-3"
              style={{ backgroundColor: info.color }}
            />
            <h3 className="font-semibold text-card-foreground mb-1">{info.name}</h3>
            <p className="text-xs text-muted-foreground">{info.nameEn}</p>
          </div>
        ))}
      </div>

      {/* Start Button */}
      <button
        type="button"
        onClick={onStart}
        className="group relative px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg transition-all hover:opacity-90"
      >
        开始测试
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
      </button>

      {/* Note */}
      <p className="text-xs text-muted-foreground mt-8 max-w-md mx-auto">
        本测试共27道题目,大约需要5分钟完成。你的答案将不会被保存或分享。
      </p>
    </div>
  )
}
