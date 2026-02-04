export type TraitType = 'narcissism' | 'machiavellianism' | 'psychopathy'

export interface Question {
  id: number
  text: string
  trait: TraitType
}

export const questions: Question[] = [
  // 自恋 (Narcissism) - 9 questions
  { id: 1, text: "我认为自己是一个特别的人", trait: 'narcissism' },
  { id: 2, text: "我喜欢成为众人关注的焦点", trait: 'narcissism' },
  { id: 3, text: "我知道自己很优秀,因为每个人都这么告诉我", trait: 'narcissism' },
  { id: 4, text: "我喜欢照镜子看自己", trait: 'narcissism' },
  { id: 5, text: "我认为我比大多数人更有能力", trait: 'narcissism' },
  { id: 6, text: "我期望从别人那里得到很多", trait: 'narcissism' },
  { id: 7, text: "我喜欢被人称赞", trait: 'narcissism' },
  { id: 8, text: "我倾向于寻求他人的关注和赞美", trait: 'narcissism' },
  { id: 9, text: "我坚持要得到应有的尊重", trait: 'narcissism' },
  
  // 马基雅维利主义 (Machiavellianism) - 9 questions
  { id: 10, text: "对我来说,结果比过程更重要", trait: 'machiavellianism' },
  { id: 11, text: "我愿意为了长远利益而欺骗他人", trait: 'machiavellianism' },
  { id: 12, text: "我善于操纵局势以达到目的", trait: 'machiavellianism' },
  { id: 13, text: "信任他人之前,我需要确保对方不会伤害我", trait: 'machiavellianism' },
  { id: 14, text: "为了成功,有时候需要走捷径", trait: 'machiavellianism' },
  { id: 15, text: "我认为大多数人都是可以被利用的", trait: 'machiavellianism' },
  { id: 16, text: "策略性地隐藏信息是明智的做法", trait: 'machiavellianism' },
  { id: 17, text: "建立关系的重要原因是它们日后可能对我有用", trait: 'machiavellianism' },
  { id: 18, text: "我会根据场合调整自己的行为来获得优势", trait: 'machiavellianism' },
  
  // 精神病态 (Psychopathy) - 9 questions
  { id: 19, text: "我很少为自己的行为感到后悔", trait: 'psychopathy' },
  { id: 20, text: "我喜欢寻求刺激,即使这可能有风险", trait: 'psychopathy' },
  { id: 21, text: "我对别人的问题很少感到同情", trait: 'psychopathy' },
  { id: 22, text: "规则是为普通人制定的", trait: 'psychopathy' },
  { id: 23, text: "我很难控制自己的冲动", trait: 'psychopathy' },
  { id: 24, text: "我的情绪反应通常比较浅淡", trait: 'psychopathy' },
  { id: 25, text: "伤害别人的感情对我来说无所谓", trait: 'psychopathy' },
  { id: 26, text: "我容易感到无聊", trait: 'psychopathy' },
  { id: 27, text: "我倾向于不考虑后果就行动", trait: 'psychopathy' },
]

export type LevelType = 'veryLow' | 'low' | 'moderate' | 'high' | 'veryHigh'

export const traitInfo = {
  narcissism: {
    name: "自恋",
    nameEn: "Narcissism",
    color: "hsl(15, 80%, 55%)",
    icon: "crown",
    description: "自恋人格特征表现为过度自我关注、夸大自我重要性、渴望赞美和缺乏同理心。自恋者通常认为自己是特别的,应该得到特殊对待。",
    subTraits: ["自我膨胀", "寻求关注", "优越感", "特权意识"],
    levels: {
      veryLow: {
        label: "极低",
        range: "0-20%",
        description: "你表现出非常低的自恋特征,可能过于谦虚或自我贬低。",
        behaviors: ["经常低估自己的能力", "难以接受赞美", "可能缺乏自信"],
        suggestion: "适度提升自信心,学会认可自己的成就和价值。"
      },
      low: {
        label: "较低",
        range: "21-40%",
        description: "你的自恋水平健康偏低,为人谦逊但仍保持基本自尊。",
        behaviors: ["通常谦虚待人", "不会主动炫耀", "重视他人意见"],
        suggestion: "保持谦虚的同时,也要学会为自己的成就感到骄傲。"
      },
      moderate: {
        label: "中等",
        range: "41-60%",
        description: "你展现出健康的自恋水平,在自信与谦逊之间取得平衡。",
        behaviors: ["有健康的自尊", "能接受适度赞美", "关注自我但也顾及他人"],
        suggestion: "这是最健康的水平,继续保持自我觉察和平衡。"
      },
      high: {
        label: "较高",
        range: "61-80%",
        description: "你的自恋倾向较高,可能过于关注自我形象和他人认可。",
        behaviors: ["常期望特殊待遇", "喜欢成为焦点", "对批评敏感"],
        suggestion: "尝试更多关注他人需求,培养真诚的同理心。"
      },
      veryHigh: {
        label: "极高",
        range: "81-100%",
        description: "你表现出非常高的自恋特征,可能存在自恋型人格倾向。",
        behaviors: ["强烈的优越感", "难以接受批评", "期望持续被崇拜"],
        suggestion: "建议深入自我反思,考虑寻求专业心理咨询帮助。"
      }
    }
  },
  machiavellianism: {
    name: "马基雅维利主义",
    nameEn: "Machiavellianism",
    color: "hsl(40, 70%, 50%)",
    icon: "chess",
    description: "马基雅维利主义特征包括操纵性、愤世嫉俗、注重个人利益以及愿意不择手段达到目的。这种人格往往善于策略性思考和社交操控。",
    subTraits: ["策略操控", "愤世嫉俗", "利益导向", "情感疏离"],
    levels: {
      veryLow: {
        label: "极低",
        range: "0-20%",
        description: "你几乎不具备操纵倾向,可能过于天真或容易被利用。",
        behaviors: ["非常信任他人", "不善于策略思考", "可能容易被欺骗"],
        suggestion: "培养适度的警觉性,学会保护自己的利益。"
      },
      low: {
        label: "较低",
        range: "21-40%",
        description: "你倾向于坦诚相待,相信人性本善。",
        behaviors: ["待人真诚", "不喜欢玩心机", "重视道德原则"],
        suggestion: "保持真诚的同时,也要学会识别潜在的操纵者。"
      },
      moderate: {
        label: "中等",
        range: "41-60%",
        description: "你在真诚与策略之间保持平衡,能够适应复杂社交环境。",
        behaviors: ["懂得审时度势", "必要时保护自己", "但通常保持诚实"],
        suggestion: "你具备健康的社交智慧,继续保持道德底线。"
      },
      high: {
        label: "较高",
        range: "61-80%",
        description: "你有较强的操纵倾向,善于利用他人达成目标。",
        behaviors: ["善于读懂人心", "会隐藏真实意图", "关系多出于利益"],
        suggestion: "反思这种行为模式对人际关系的长期影响。"
      },
      veryHigh: {
        label: "极高",
        range: "81-100%",
        description: "你展现出极强的操纵性,可能将所有关系都视为工具。",
        behaviors: ["高度策略性", "缺乏真诚连接", "为达目的不择手段"],
        suggestion: "建议审视自己的价值观,考虑建立更真诚的关系。"
      }
    }
  },
  psychopathy: {
    name: "精神病态",
    nameEn: "Psychopathy",
    color: "hsl(200, 60%, 45%)",
    icon: "brain",
    description: "精神病态特征包括缺乏同理心、冲动性、追求刺激、浅薄的情感反应和反社会行为。这种人格类型往往难以形成真正的情感联系。",
    subTraits: ["冷酷无情", "冲动性", "寻求刺激", "情感浅薄"],
    levels: {
      veryLow: {
        label: "极低",
        range: "0-20%",
        description: "你具有极强的同理心和情感敏感度,可能过度共情。",
        behaviors: ["深度感受他人痛苦", "情感反应强烈", "可能容易情绪疲劳"],
        suggestion: "学会设立情感边界,保护自己免受过度共情的影响。"
      },
      low: {
        label: "较低",
        range: "21-40%",
        description: "你有良好的同理心和情感连接能力。",
        behaviors: ["关心他人感受", "能建立深度关系", "行事考虑后果"],
        suggestion: "你的情感智慧是宝贵的品质,继续保持。"
      },
      moderate: {
        label: "中等",
        range: "41-60%",
        description: "你在情感反应和理性思考之间保持平衡。",
        behaviors: ["有同理心但不被情绪主导", "能保持冷静判断", "适度寻求刺激"],
        suggestion: "继续保持情感与理性的平衡,这是健康的状态。"
      },
      high: {
        label: "较高",
        range: "61-80%",
        description: "你可能表现出较少的情感反应和更强的冲动性。",
        behaviors: ["情感表达较为浅淡", "冲动行事", "喜欢冒险刺激"],
        suggestion: "尝试深化情感连接,在行动前多考虑后果。"
      },
      veryHigh: {
        label: "极高",
        range: "81-100%",
        description: "你展现出显著的精神病态特征,可能难以建立深层情感连接。",
        behaviors: ["缺乏悔恨感", "追求极端刺激", "对他人痛苦漠然"],
        suggestion: "强烈建议寻求专业心理评估和帮助。"
      }
    }
  }
}

// 人格组合类型
export const personalityCombinations = {
  "high-high-high": {
    name: "暗黑领袖型",
    description: "你同时具备高水平的三种黑暗特质,这种组合在领导者、企业家和某些成功人士中较为常见。你可能极具魅力但也可能给他人带来伤害。",
    strengths: ["决策果断", "社交影响力强", "危机处理能力"],
    risks: ["人际关系问题", "道德风险", "长期孤独感"]
  },
  "high-high-low": {
    name: "权谋家型",
    description: "高自恋和高马基雅维利主义结合较低的精神病态,表明你善于追求地位和影响力,但仍保留一定的情感能力。",
    strengths: ["领导才能", "社交智慧", "目标导向"],
    risks: ["可能忽视他人感受", "关系多基于利益"]
  },
  "high-low-high": {
    name: "冲动自恋型",
    description: "高自恋和高精神病态但较低的操纵性,表明你可能直接表达自大和冲动,而非通过策略手段。",
    strengths: ["自信直接", "敢于冒险", "行动力强"],
    risks: ["冲动决策", "人际冲突", "难以维持关系"]
  },
  "low-high-high": {
    name: "冷血操纵型",
    description: "低自恋但高马基雅维利主义和精神病态,表明你可能隐藏在幕后操纵,而非寻求关注。",
    strengths: ["冷静分析", "策略思维", "不受情绪影响"],
    risks: ["情感疏离", "信任问题", "道德风险"]
  },
  "high-low-low": {
    name: "表演型自恋",
    description: "主要表现为自恋特质,但缺乏操纵性和冷酷,更多是寻求认可而非伤害他人。",
    strengths: ["自信展示", "社交活跃", "追求卓越"],
    risks: ["过度依赖外界认可", "可能显得自大"]
  },
  "low-high-low": {
    name: "务实策略型",
    description: "主要表现为马基雅维利主义,善于策略思考但保持情感连接和适度谦虚。",
    strengths: ["策略规划", "目标明确", "社交智慧"],
    risks: ["可能过于功利", "信任建立困难"]
  },
  "low-low-high": {
    name: "冲动冒险型",
    description: "主要表现为精神病态特质,寻求刺激和冲动,但不追求地位或操控他人。",
    strengths: ["冒险精神", "压力耐受", "果断行动"],
    risks: ["冲动行为", "情感浅薄", "风险管理差"]
  },
  "low-low-low": {
    name: "光明人格型",
    description: "三种黑暗特质都较低,表明你是一个真诚、有同理心且道德感强的人。",
    strengths: ["真诚待人", "深度情感连接", "值得信赖"],
    risks: ["可能过于天真", "容易被利用"]
  },
  "moderate": {
    name: "平衡型",
    description: "你的三种特质都处于中等水平,表明你能在不同情境中灵活适应。",
    strengths: ["情境适应力", "平衡的人格", "灵活性"],
    risks: ["可能缺乏鲜明个性", "方向感不够明确"]
  }
}
