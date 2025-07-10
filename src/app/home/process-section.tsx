import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  Lightbulb,
  Code,
  TestTube,
  Rocket,
  RefreshCw
} from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: <Search className="h-8 w-8" />,
    title: '需求分析',
    description:
      '根据经验，深入了解项目需求，与 PM 和现实情况充分沟通，明确目标和期望，制定详细的项目计划。',
    details: ['用户研究 / User Research', '技术可行性评估 / Technical Feasibility Assessment', '项目范围定义 / Project Scope Definition']
  },
  {
    step: '02',
    icon: <Lightbulb className="h-8 w-8" />,
    title: '设计规划',
    description: '设计系统架构，选择合适的技术栈，制定开发策略和时间计划。',
    details: [
      '技术设计 / Technical Design',
      '技术栈选型（若从零开始项目） / Technology Stack Selection',
      '数据库设计 / Database Design',
      'API 设计 / API Design',
      '文档编写 / Documentation'
    ]
  },
  {
    step: '03',
    icon: <Code className="h-8 w-8" />,
    title: '开发实现',
    description:
      '按照敏捷开发方法论进行迭代开发，保持代码质量和开发进度的平衡。',
    details: ['功能模块开发 / Feature Development', '代码审查 / Code Reviews', '版本控制 / Version Control', '进度追踪 / Progress Tracking']
  },
  {
    step: '04',
    icon: <TestTube className="h-8 w-8" />,
    title: '测试优化',
    description: '进行全面的测试，包括单元测试、集成测试和用户体验测试。',
    details: ['单元测试 / Unit Testing', '集成测试 / Integration Testing', '性能优化 / Performance Optimization', '设计验收 / Design Acceptance']
  },
  {
    step: '05',
    icon: <Rocket className="h-8 w-8" />,
    title: '部署上线',
    description: '配置生产环境，进行部署和监控设置，确保系统稳定运行。',
    details: ['环境配置 / Environment Configuration', 'CI/CD 部署 / CI/CD Deployment', '监控设置 / Monitoring Setup', '性能调优 / Performance Tuning', '上线 / Launch']
  },
  {
    step: '06',
    icon: <RefreshCw className="h-8 w-8" />,
    title: '维护迭代',
    description: '持续监控系统运行状态，收集用户反馈，进行功能优化和迭代。',
    details: ['系统监控 / System Monitoring', '用户反馈收集 / User Feedback Collection', '功能迭代 / Feature Iteration', '技术升级 / Technology Upgrade', '推广市场 / GTM']
  }
]

export default function ProcessSection() {
  return (
    <section className="bg-muted/20">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-3 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            My Workflows
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            开发流程与方法
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300"
            >
              <CardContent>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-bold text-primary/30">
                    {step.step}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="mr-2 h-1 w-1 rounded-full bg-primary"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-4 text-xl font-semibold">敏捷开发理念</h3>
          <blockquote className="mx-auto max-w-3xl text-lg italic text-muted-foreground">
            我坚持敏捷开发方法论，通过短周期迭代、持续交付和客户协作，
            确保项目能够快速响应变化，及时调整方向，最终交付符合用户期望的高质量产品。
            每个环节都注重与客户的沟通反馈，确保项目始终朝着正确的方向前进。
          </blockquote>
        </div>
      </div>
    </section>
  )
}
