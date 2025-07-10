import Navigation from './home/navigation'
import AboutSection from './home/about-section'
import SkillsSection from './home/skills-section'
import ValuesSection from './home/values-section'
import ProcessSection from './home/process-section'
import ExperienceSection from './home/experience-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="py-24 space-y-24">
        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="values">
          <ValuesSection />
        </section>

        <section id="process">
          <ProcessSection />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>
      </main>

      <footer className="bg-background border-t border-border/50 py-12">
        <div className="container mx-auto px-4 2xl:max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">
                © 2025 杨文杰. 保留所有权利.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a
                href="mailto:jayce.y.443@icloud.com"
                className="hover:text-primary transition-colors"
              >
                联系我
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
