'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Goal,
  Brain,
  File
} from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx'
import Image from 'next/image'

const careerTimeline = [
  {
    id: 3,
    year: '2017.06-2018.06',
    type: 'work',
    title: '前端开发工程师',
    company: '新橙科技',
    description: '负责 iCourt 核心模块的开发'
  },
  {
    id: 2,
    year: '2018.04 - 2021.11',
    type: 'work',
    title: '高级前端工程师 P6',
    company: '阿里巴巴 - 阿里妈妈 - 广告中台业务',
    description: '负责阿里巴巴广告生态系统的技术选型和开发'
  },
  {
    id: 1,
    year: '2021.11 - 2025.04',
    type: 'work',
    title: '高级工程师 2-1',
    company: '字节跳动 - TikTok - 商业化 - 创意技术',
    description: '负责 TikTok 商业化系统 CTR 目标业务'
  },
]

const projectCases = [
  {
    id: 0,
    careerId: 1,
    title: '落地页转换器 - Adapter',
    description:
      '一个高效、精准地将三方落地页（third-party landing page）转换成一方落地页（TIP）的工具',
    problem: `广告主在进行广告投放时，需要填写三方落地页（Destination）。然而，广告主在进行全球广告投放时存在诸多限制。对于用户的角度来说，广告主的服务器几乎都不处在用户边缘 (Edge)，这会增加用户对落地页访问的 TTFB，从而降低 FCP；
    其次，平台对于落地页的管理权限不足，需要广告主手动设置转化信号，此举会增加平台反作弊的运营成本；
    对于广告主的角度来说，广告主落地页的设计风格和 TikTok 用户端不一致。而用户实验证明，用户对于体验一致的落地页，存在更高的 convert 偏好。因此诞生了一方落地页 TIP 方案。
    然而此方案的缺陷是，广告主只能手动完成 TIP 的创建，存在一定的门槛。`,
    solution:
      '我们发现，wordpress 的三方落地页文档流相对简单。在此基础上 Shop Ads（尤其是以 Shopify 的单商品页面），和 TIP 的组件存在重合。Adapter 项目通过广告主输入的三方落地页，通过爬虫 + AI / NLP 识别抓取页面结构，自动化完成三方落地页对 TIP 的转换，从而降低广告主的门槛。',
    result:
      'Adapter 项目上线后，广告主采纳率 24%。Advv +1.42%，TIP 的 penetration rate +1.55%。',
    images: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250508-150638.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250508-152158.jpeg'
    ],
    attachments: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//technical_disclosure_document.pdf'
    ],
    technologies: ['Node.js', 'MQ', 'Crawler', 'Redis', 'AI']
  },
  {
    id: 1,
    careerId: 1,
    title: 'Interactive Add-ons - Product Card Converter',
    description:
      '一个高效、精准地将 Shop Ads 单商品页面 Product Card 转换为 Product Card 的工具',
    problem: `Interactive Add-ons 是广告创意中较为重要的一部分，它将传统广告页面的 CTA 改为为可交互组件（如图片按钮、轮播图等）。能有效提升 CTR。然而，广告主只能手动上传图片，存在一定制作门槛。`,
    solution:
      '该 Converter 通过调用广告主在 TikTok 后台登录的 Shopify Catalog 接口或对 Shopify 单商品页面进行 DOM 特征分析提取出标准 json，自动化完成对 Product Card 离线转换。',
    result:
      'Converter 项目上线后，广告主采纳率 86%。Interactive Add-ons 的 Penetration rate +23%。CTR +16%，Advv +2.2%。Shop Ads 综合收入提升 23k$/mo。技术方面，平均抓取耗时在 3s 内（p95），DOM 特征分析的内容准确率相比 NLP 的方案准确率更高，达 90% 左右。',
    images: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250430-173115.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250430-174455.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//170516.jpeg'
    ],
    technologies: ['Node.js', 'MQ', 'Crawler', 'AI']
  },
  {
    id: 2,
    careerId: 1,
    title: 'TikTok 广告投放平台（TTAM）Interactive Add-ons 模块前端 Owner',
    description:
      '负责 Interactive Add-ons 模块广告创意前端的技术选型、架构设计、开发和维护。',
    problem: `Ad Format 广告创意前端存在以下问题：
    1. 前期野蛮生长，有积压技术债；
    2. iFrame 嵌套严重，性能较差，FCP 较慢；
    3. 业务耦合严重，入口众多，并且监控年久失修，导致问题排查和解决效率低；
    4. 业务活跃，数据口径混乱，导致数据分析和决策困难。`,
    solution: '',
    images: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250403154001_rec_.mp4'
    ],
    result:
      '在经历一整年的持续迭代和开发后，建立了业务数据看板，技术债得到了有效控制，工单水位下降 80%。平均 FCP 从 5s 下降至 2s；上线了 10+ 个新功能，包括但不限于 Carousel 广告的 Music Selector、Multi-Product Card、Web Anchor 等功能。',
    attachments: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//doc.pdf'
    ],
    technologies: ['React']
  },
  {
    id: 4,
    careerId: 2,
    title: 'Marquex',
    description: '负责 React B 端设计语言 React 版本的组件库 owner（Marquex）',
    problem: `
      1. 广告业务存在特殊性，导致基于 Antd 的基础组件库难以满足需求。例如，设计上需要实现按钮的渐变色，和其他 Hover 特效，而 Antd 的 Button 组件并不支持；
      2. 广告业务存在通用性，例如和 BFF 交互的图表组件包含统一字段，我们需要支持通用字段包装，以保证开发者能够灵活地做到开箱即用；
      3. 由于有工时要求，无法从零开始搭建组件库；
      4. 广告业务由于长期使用 MVVM 框架缺乏 React 经验。
    `,
    solution:
      `基于 rc-components 基础组件库，分 3 个阶段（基础组件、复杂基础组件、业务组件），在一年内从零到一完成了组件库的研发。并逐步推广增量地替换掉原 React 业务中不规范组件库，实现设计 + 技术的统一输出。
      并且，在 2021 年 H1 组件库扫雷项目中，总结交互和样式问题总计 229 个并完成修复，实现了组件库风险的下降。`,
    images: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250408-180913.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250408-180824.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250408-180859.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-115833.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-115835.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-115838.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-115846.jpeg'
    ],
    result:
      '带领 Marquex 组件库小组（3 人小组），快速实现了 36 个基础组件和 26 个业务组件的开发，包括一个基于 NodeJs 的业务组件脚手架，并成功地集成在了 9 个业务中。',
    technologies: ['React']
  },
  {
    id: 5,
    careerId: 2,
    title: '万堂书院 (shuyuan.taobao.com)',
    description: '万堂书院项目 PoC',
    problem: `
      业务上，由于阿里妈妈的业务众多，导致广告主有较高的学习成本，难以快速的进行投放的决策；并且，广告投放的使用存在一定门槛；
      万堂书院是阿里妈妈为广告主提供的一站式学习平台，旨在帮助广告主快速了解广告投放的原理和技巧，提高广告投放的 ROI。
      技术上：
      1. 内容有视频、直播、图文等多种形式，需要考虑功能的体验一致性；
      2. 在集团 all in wireless 大趋势下，需要支持移动端，并且支持多端适配；
      3. 可做主站 App 也可做模块，需要内嵌于其他平台。
    `,
    solution: '移动端 - PC 端同构渐进升级，m3u8 直播技术，兼容微前端。',
    images: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-112425.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-112432.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-112436.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-112439.jpeg'
    ],
    result: '万堂书院上线后，半年内 DAU 从 0 - 8k，年内总计 UV 18.9 万人，累计听课次数超 300 万次，目前生态仍然繁荣。',
    technologies: ['React', 'Node.js', 'm3u8', '微前端']
  },
  {
    id: 6,
    careerId: 2,
    title: '其他 BP 项目……',
    description: '负责其他多个妈妈产品矩阵的开发 owner',
    images: [
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-120057.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-120100.jpeg',
      'https://rbrzxzkxabhaeiljimvy.supabase.co/storage/v1/object/public/portfolio//20250724-120054.jpeg'
    ]
  }
]

export default function ExperienceSection() {
  const [carouselRef, carousel] = useEmblaCarousel({
    loop: false,
    watchDrag: true
  })
  const carousels = projectCases.map(() =>
    useEmblaCarousel({ loop: false, watchDrag: false })
  )
  const [isStopAutoplay, setIsStopAutoplay] = useState(false)
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  const [currentMediaUrl, setCurrentMediaUrl] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStopAutoplay) return
      if (!carousel) return
      if (carousel.selectedScrollSnap() === projectCases.length - 1) {
        carousel.scrollTo(0)
      } else {
        carousel.scrollNext()
      }
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [isStopAutoplay, carousel])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMediaModalOpen) {
        closeMediaModal()
      }
    }

    if (isMediaModalOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMediaModalOpen])

  const prevProject = () => {
    if (carousel) {
      carousel.scrollPrev()
      setIsStopAutoplay(true)
    }
  }

  const stopAutoplay = () => {
    setIsStopAutoplay(true)
  }

  const nextProject = () => {
    if (!carousel) {
      return
    }
    carousel.scrollNext()

    setIsStopAutoplay(true)
  }

  const prevImage = () => {
    const i = carousel?.selectedScrollSnap() ?? 0
    const currentCarousel = carousels[i]?.[1]
    if (!currentCarousel) {
      return
    }
    currentCarousel.scrollPrev()
  }

  const nextImage = () => {
    const i = carousel?.selectedScrollSnap() || 0
    const currentCarousel = carousels[i]?.[1]
    if (!currentCarousel) {
      return
    }
    currentCarousel.scrollNext()
  }

  const openMediaModal = (mediaUrl: string) => {
    setCurrentMediaUrl(mediaUrl)
    setIsMediaModalOpen(true)
  }

  const closeMediaModal = () => {
    setIsMediaModalOpen(false)
    setCurrentMediaUrl('')
  }

  const downloadAttachment = (attachmentUrl: string) => {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = attachmentUrl
    a.rel = 'noopener noreferrer'
    a.download = attachmentUrl.split('/').pop() || 'attachment'
    a.click()
  }

  return (
    <section className="bg-background md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-3 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            MY CAREERS
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            我的成长历程与项目案例
          </h2>
        </div>

        <div className="flex flex-col">
          <div>
            <h3 className="text-2xl font-semibold mb-8">职业发展历程</h3>

            <div className="block md:hidden space-y-6">
              {careerTimeline.map((item, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-border">
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white mb-2 text-xs"
                  >
                    {item.year}
                  </Badge>
                  <div className="transition-all duration-300 border-border/50 hover:border-primary/50">
                    <div className="flex items-start gap-3 mb-3">
                      <div>
                        <h4 className="font-semibold text-base">
                          {item.title}
                        </h4>
                        <p className="text-primary font-medium text-sm">
                          {item.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block relative h-48">
              <div className="absolute left-0 right-0 top-0 h-0.5 bg-border"></div>
              {careerTimeline.map((career, index) => (
                <div key={index} className="absolute -translate-y-3 -translate-x-1/2" style={{
                  left: `${25 * (index + 1)}%`
                }}>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white col-span-4 mb-4"
                  >
                    {career.year}
                  </Badge>
                  <div>
                    <div
                      className={clsx(
                        'transition-all',
                        'duration-300',
                        'border-border/50 hover:border-primary/50'
                      )}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {career.title}
                          </h4>
                          <p className="text-primary font-medium">
                            {career.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {career.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">项目案例</h3>
              <div className="flex gap-2">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="icon"
                  onClick={prevProject}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextProject}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className="overflow-hidden select-none"
              ref={carouselRef}
              style={{ touchAction: 'none' }}
            >
              <div className="flex">
                {projectCases.map((project, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 pr-4">
                    <Card className="max-h-[700px] overflow-y-auto h-full border-border/50 hover:border-primary/50 transition-colors">
                      <CardContent className='h-full'>
                        <div onMouseEnter={stopAutoplay} className="h-full grid grid-cols-2 gap-8">
                          {project.images.length > 0 && (
                            <div className="hidden md:block relative col-span-1 h-full">
                              <div
                                className="overflow-hidden h-full select-none"
                                ref={carousels[index]?.[0]}
                              >
                                <div className="flex h-full">
                                  {project.images.map((image, imageIndex) => (
                                    <div
                                      key={`${project.id}-${imageIndex}`}
                                      className="min-w-0 flex-[0_0_100%] relative h-full"
                                    >
                                      {image.endsWith('.mp4') ? (
                                        <video
                                          onClick={() => {
                                            openMediaModal(image)
                                          }}
                                          src={image}
                                          autoPlay
                                          loop
                                          muted
                                          playsInline
                                          className="shadow-lg cursor-pointer w-full h-full object-contain"
                                        />
                                      ) : (
                                        <Image
                                          src={image}
                                          alt={project.title}
                                          objectFit="contain"
                                          fill
                                          objectPosition="center"
                                          className="cursor-pointer"
                                          onClick={() => {
                                            openMediaModal(image)
                                          }}
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {project.images.length > 1 && (
                                <>
                                  <div className="absolute bottom-8 left-[50%] flex gap-2 -translate-x-1/2">
                                    <Button
                                      variant="outline"
                                      className="cursor-pointer"
                                      size="icon"
                                      onClick={prevImage}
                                    >
                                      <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="cursor-pointer"
                                      size="icon"
                                      onClick={nextImage}
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                          <div
                            className={clsx(
                              'col-span-2',
                              project.images.length > 0 && 'lg:col-span-1'
                            )}
                          >
                            <div className="text-center mb-6">
                              <h4 className="text-xl font-semibold mb-2">
                                {project.title}
                              </h4>
                            </div>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                              {project.description}
                            </p>

                            <div className="mb-6 space-y-3">
                              {
                                project.problem && (
                                  <>
                                    <h5 className="flex items-center gap-2 font-semibold mb-3">
                                      <Goal /> 痛点
                                    </h5>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                      {project.problem}
                                    </p>
                                  </>
                                )}
                              {project.solution && (
                                <>
                                  <h5 className="flex items-center gap-2 font-semibold mb-3">
                                    <Brain /> 解决方案
                                  </h5>
                                  <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {project.solution}
                                  </p>
                                </>
                              )}
                              {project.result && (
                                <>
                                  <h5 className="flex items-center gap-2 font-semibold mb-3">
                                    <Award /> 结果
                                  </h5>
                                  <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {project.result}
                                  </p>
                                </>
                              )}
                            </div>
                            {project.attachments && (
                              <div>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    downloadAttachment(project.attachments[0])
                                  }}
                                  className="flex items-center gap-2 font-semibold mb-3"
                                >
                                  <File />{' '}
                                  下载关于本工作的资料以获取更全面的信息
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMediaModalOpen && (
        <div
          className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeMediaModal}
        >
          <div className="relative w-full h-full max-w-8xl max-h-screen p-20">
            {currentMediaUrl.endsWith('.mp4') ? (
              <video
                src={currentMediaUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                onClick={closeMediaModal}
              />
            ) : (
              <img
                src={currentMediaUrl}
                alt="预览"
                className="w-full h-full object-contain cursor-pointer"
                onClick={closeMediaModal}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}
