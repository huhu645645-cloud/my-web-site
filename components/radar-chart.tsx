"use client"

import { traitInfo } from "@/lib/questions"

interface RadarChartProps {
  scores: {
    narcissism: number
    machiavellianism: number
    psychopathy: number
  }
}

export function RadarChart({ scores }: RadarChartProps) {
  const size = 300
  const center = size / 2
  const radius = size * 0.4

  // Convert scores to percentages (0-100)
  const maxScore = 45 // 9 questions * 5 max score
  const narcissismPct = (scores.narcissism / maxScore) * 100
  const machiavellianismPct = (scores.machiavellianism / maxScore) * 100
  const psychopathyPct = (scores.psychopathy / maxScore) * 100

  // Calculate points for the triangle (3 vertices at 120° apart)
  const angles = [-90, 30, 150] // degrees, starting from top
  
  const getPoint = (angle: number, value: number) => {
    const rad = (angle * Math.PI) / 180
    const r = (value / 100) * radius
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    }
  }

  // Background grid circles
  const gridLevels = [20, 40, 60, 80, 100]

  // Data points
  const points = [
    getPoint(angles[0], narcissismPct),
    getPoint(angles[1], psychopathyPct),
    getPoint(angles[2], machiavellianismPct)
  ]

  const pathData = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`

  // Label positions (slightly outside the chart)
  const labelOffset = radius + 40
  const labelPositions = [
    getPoint(angles[0], 115),
    getPoint(angles[1], 130),
    getPoint(angles[2], 130)
  ]

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridLevels.map((level) => {
          const gridPoints = angles.map(angle => getPoint(angle, level))
          const gridPath = `M ${gridPoints[0].x} ${gridPoints[0].y} L ${gridPoints[1].x} ${gridPoints[1].y} L ${gridPoints[2].x} ${gridPoints[2].y} Z`
          return (
            <path
              key={level}
              d={gridPath}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          )
        })}

        {/* Axis lines */}
        {angles.map((angle, i) => {
          const endPoint = getPoint(angle, 100)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="currentColor"
              strokeOpacity={0.2}
              strokeWidth={1}
            />
          )
        })}

        {/* Data area */}
        <path
          d={pathData}
          fill="url(#areaGradient)"
          fillOpacity={0.4}
          stroke="url(#strokeGradient)"
          strokeWidth={2}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={[
              traitInfo.narcissism.color,
              traitInfo.psychopathy.color,
              traitInfo.machiavellianism.color
            ][i]}
            stroke="var(--background)"
            strokeWidth={2}
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={traitInfo.narcissism.color} stopOpacity={0.6} />
            <stop offset="50%" stopColor={traitInfo.machiavellianism.color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={traitInfo.psychopathy.color} stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={traitInfo.narcissism.color} />
            <stop offset="50%" stopColor={traitInfo.machiavellianism.color} />
            <stop offset="100%" stopColor={traitInfo.psychopathy.color} />
          </linearGradient>
        </defs>
      </svg>

      {/* Labels */}
      <div className="relative w-full mt-4">
        <div className="flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: traitInfo.narcissism.color }}
            />
            <span className="text-sm text-muted-foreground">自恋</span>
            <span className="text-sm font-semibold" style={{ color: traitInfo.narcissism.color }}>
              {Math.round(narcissismPct)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: traitInfo.machiavellianism.color }}
            />
            <span className="text-sm text-muted-foreground">马基雅维利</span>
            <span className="text-sm font-semibold" style={{ color: traitInfo.machiavellianism.color }}>
              {Math.round(machiavellianismPct)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: traitInfo.psychopathy.color }}
            />
            <span className="text-sm text-muted-foreground">精神病态</span>
            <span className="text-sm font-semibold" style={{ color: traitInfo.psychopathy.color }}>
              {Math.round(psychopathyPct)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
