'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  MapPin,
  Calendar,
  Mail,
  Download
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function AboutSection() {
  const [isWechatPopoverOpen, setIsWechatPopoverOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            About me
          </Badge>
        </div>

        <div className="gap-12 md:grid md:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-center md:col-span-5 lg:col-span-4">
            <div className="relative mb-8">
              <div className="overflow-hidden w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Image
                  src="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250709-160132.jpeg"
                  alt="avatar"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            </div>

            <div className="bg-card rounded-xl border p-6 w-full max-w-md">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">8 年工程经验</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">北京，中国</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    <a href="mailto:jayce.y.443@icloud.com">
                      jayce.y.443@icloud.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:col-span-7 md:mt-0 lg:col-span-8">
            <h2 className="leading-normal text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              你好！我是杨文杰
              <br />
              一名全栈开发工程师
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                我拥有超过 8 年开发经验，2 年团队管理经验，专注于构建健壮、用户友好的系统。
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                我的职业生涯始于 2017 年，在 18 - 25 年一直在中国互联网大厂服务，专注于商业化广告平台和周边业务。开发从面向广告主和用户端的 Applications 到复杂的 BP 系统。
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                我热衷于编写干净的代码、深思熟虑的架构设计和持续学习。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                我热爱和团队的人交朋友，热衷于发现业务或技术中被忽略的的优化点并共同改进，对系统产生积极影响。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MBTI 人格：<Popover>
                  <PopoverTrigger className='cursor-pointer underline'>ENTP-A</PopoverTrigger>
                  <PopoverContent className="w-auto">
                      <Image src="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//my_personality.png" alt="MBTI" width={600} height={600} />
                  </PopoverContent>
                </Popover>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button onClick={() => {
                window.open('https://rbrzxzkxabhaeiljimvy.storage.supabase.co/v1/object/public/portfolio//resume.pdf', '_blank')
              }} className="cursor-pointer flex-1 sm:flex-none">
                <Download className="h-4 w-4" />
                下载我的简历
              </Button>
              <Button onClick={() => window.open('https://www.feishu.cn/invitation/page/add_contact/?token=dbfh3e22-1e7a-4f4a-83f4-416cf8da0e53', '_blank')} variant="outline" className="cursor-pointer flex-1 sm:flex-none">
                <img src="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//lark.png" alt="Feishu" className="h-4" />
                在飞书上联系我
              </Button>
              <Popover open={isWechatPopoverOpen} onOpenChange={setIsWechatPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none cursor-pointer"
                    onMouseEnter={() => setIsWechatPopoverOpen(true)}
                    onMouseLeave={() => setIsWechatPopoverOpen(false)}
                  >
                    添加我的微信
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto"
                  onMouseEnter={() => setIsWechatPopoverOpen(true)}
                  onMouseLeave={() => setIsWechatPopoverOpen(false)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src="https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250710-134107.jpeg"
                      alt="微信二维码"
                      width={isMobile ? 200 : 400}
                      height={isMobile ? 200 : 400}
                      className="rounded-lg"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
