'use client'
import {
  ArchiveRestoreIcon,
  Atom,
  Cloud,
  Code,
  Database,
  Figma,
  FileCode,
  FlaskConical,
  Github,
  Globe,
  Lightbulb,
  Monitor,
  Palette,
  Server,
  ServerCog,
  Smartphone,
  Terminal,
  TestTube,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/libs/utils'
import { useState } from 'react'

const skills = [
  {
    section: '前端开发',
    id: 'frontend',
    items: [
      {
        name: '前端技术 - TypeScript',
        icon: <i className="text-2xl si si-typescript si--color" />,
        proficiency: 95
      },
      { name: 'React & Next.js', proficiency: 92, icon: <i className="text-2xl si si-react si--color" /> },
      { name: 'Vue.js & Nuxt.js', proficiency: 92, icon: <i className="text-2xl si si-vuedotjs si--color" /> },
      { name: '前端监控 - Monitoring', proficiency: 90, icon: <i className="text-2xl si si-sentry si--color" /> },
      { name: '端技术 - Flutter', proficiency: 70, icon: <i className="text-2xl si si-flutter si--color" /> }
    ]
  },
  {
    section: '后端开发',
    id: 'backend',
    items: [
      { name: '后端技术 - Node.js', proficiency: 80, icon: <i className="text-2xl si si-nodedotjs si--color" /> },
      {
        name: '数据库 - PostgreSQL (Supabase)',
        proficiency: 80,
        icon: <i className="text-2xl si si-postgresql si--color" />
      },
      { name: '中间件 - Redis & MQ', proficiency: 70, icon: <i className="text-2xl si si-redis si--color" /> },
      { name: '后端监控 - Monitoring', proficiency: 70, icon: <i className="text-2xl si si-grafana si--color" /> }
    ]
  },
  {
    section: '技术架构',
    id: 'architecture',
    items: [
      {
        name: '架构设计 - Architecture Design',
        proficiency: 80,
        icon: <i className="text-2xl si si-dotenv si--color" />
      },
      { name: '云服务 - Cloud Service', proficiency: 70, icon: <i className="text-2xl si si-icloud si--color" /> },
      { name: '测试 - Test', proficiency: 70, icon: <i className="text-2xl si si-jest si--color" /> },
      { name: '运维 - DevOps', proficiency: 70, icon: <i className="text-2xl si si-elegoo si--color" /> },
      { name: '敏捷开发 - Scrum', proficiency: 70, icon: <i className="text-2xl si si-spectrum si--color" /> }
    ]
  }
]

export default function SkillsSection() {
  const getSkillLevel = (proficiency: number) => {
    if (proficiency >= 90) return '专家'
    if (proficiency >= 80) return '高级'
    if (proficiency >= 70) return '熟练'
    if (proficiency >= 50) return '中级'
    return '初级'
  }

  const getColorClass = (proficiency: number) => {
    if (proficiency >= 90) return 'text-indigo-500'
    if (proficiency >= 80) return 'text-blue-500'
    if (proficiency >= 70) return 'text-green-500'
    if (proficiency >= 50) return 'text-yellow-500'
    return 'text-gray-500'
  }

  const [tab, setTab] = useState('frontend')

  const skillSection = skills.find((skillSection) => skillSection.id === tab)
  return (
    <section className="bg-muted/20">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            My Stacks
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            技能与技术栈
          </h2>
        </div>

        <Tabs
          defaultValue="frontend"
          value={tab}
          onValueChange={setTab}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid h-fit w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger className="cursor-pointer" value="frontend">前端</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="backend">后端</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="architecture">架构</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-6">
            <div className="bg-card rounded-xl border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                {skillSection?.section}
              </h3>
              <div className="mt-6 grid gap-4">
                {skillSection?.items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {skill.icon}
                        <p className="font-medium">{skill.name}</p>
                      </div>
                      <span
                        className={cn(
                          'text-sm font-semibold',
                          getColorClass(skill.proficiency)
                        )}
                      >
                        {getSkillLevel(skill.proficiency)}
                      </span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
