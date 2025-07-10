import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Users, Target, Zap, Shield, Compass } from 'lucide-react'

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: '用户至上',
    description:
      '始终以用户体验为中心，创造真正解决问题的产品。每一行代码都应该为用户带来价值。'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: '团队协作',
    description:
      '相信团队的力量，积极沟通，分享知识，共同成长。好的产品来自于优秀的团队合作。'
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: '追求卓越',
    description:
      '对代码质量和工程标准有着严格的要求，持续学习新技术，不断改进和优化。'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: '敏捷高效',
    description: '拥抱变化，快速迭代，通过敏捷开发方法论提供高质量的解决方案。'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '可靠安全',
    description:
      '构建稳定、安全、可扩展的系统，确保产品在各种环境下都能稳定运行。'
  },
  {
    icon: <Compass className="h-8 w-8" />,
    title: '创新驱动',
    description:
      '保持对新技术的好奇心，敢于尝试创新解决方案，推动技术边界的发展。'
  }
]

export default function ValuesSection() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-3 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            My Values
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            价值观与理念
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <blockquote className="mx-auto max-w-3xl text-lg italic text-muted-foreground">
            "技术是工具，但价值观是指引我们如何使用这些工具的北极星。
            只有将技术与正确的价值观结合，才能创造出真正有意义的产品。"
          </blockquote>
        </div>
      </div>
    </section>
  )
}
